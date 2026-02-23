import prisma from "@/lib/prisma";

interface AulaPageProps {
  params: { id: string };
}

function normalizeVideoUrl(raw: string) {
  const url = String(raw || "").trim();
  if (!url) return null;

  // Já é um embed pronto
  if (url.includes("player.vimeo.com/video/")) {
    return { provider: "vimeo", embedUrl: url };
  }
  if (url.includes("youtube.com/embed/")) {
    return { provider: "youtube", embedUrl: url };
  }

  // Vimeo normal: https://vimeo.com/76979871
  // Vimeo player normal (já ok): https://player.vimeo.com/video/76979871
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch?.[1]) {
    const id = vimeoMatch[1];
    return { provider: "vimeo", embedUrl: `https://player.vimeo.com/video/${id}` };
  }

  // YouTube normal:
  // https://www.youtube.com/watch?v=VIDEOID
  // https://youtu.be/VIDEOID
  const ytWatch = url.match(/[?&]v=([^&]+)/);
  if (ytWatch?.[1]) {
    const id = ytWatch[1];
    return { provider: "youtube", embedUrl: `https://www.youtube.com/embed/${id}` };
  }

  const ytShort = url.match(/youtu\.be\/([^?&]+)/);
  if (ytShort?.[1]) {
    const id = ytShort[1];
    return { provider: "youtube", embedUrl: `https://www.youtube.com/embed/${id}` };
  }

  // Caso genérico: tenta como iframe src direto (se for um link embedável externo)
  // Se não funcionar, vai aparecer fallback com link clicável.
  return { provider: "unknown", embedUrl: url };
}

export default async function AulaPage({ params }: AulaPageProps) {
  const idFromUrl = String(params?.id || "").trim();

  try {
    if (!idFromUrl) {
      return (
        <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
          <h1>❌ Parâmetro inválido</h1>
          <p>
            O parâmetro <code>id</code> está vazio.
          </p>
        </div>
      );
    }

    // =========================
    // 1) Tenta como Lesson.id
    // =========================
    let aula = await prisma.lesson.findUnique({
      where: { id: idFromUrl },
      include: { course: true },
    });

    let mode: "lesson" | "courseFallback" = "lesson";

    // =========================================================
    // 2) Se não achou, pode ser Course.id
    // =========================================================
    if (!aula) {
      const course = await prisma.course.findUnique({
        where: { id: idFromUrl },
        select: { id: true },
      });

      if (course) {
        aula = await prisma.lesson.findFirst({
          where: { courseId: course.id },
          include: { course: true },
          // ⚠️ "order" pode não existir no schema final: por isso removemos
          // qualquer orderBy com campo duvidoso e mantemos o mais seguro.
          orderBy: [{ createdAt: "asc" }],
        });

        if (aula) mode = "courseFallback";
      }
    }

    // =========================
    // 3) Se ainda não achou
    // =========================
    if (!aula) {
      return (
        <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
          <h1>❌ Aula não encontrada</h1>
          <p>
            Nenhuma aula foi encontrada com o ID:
            <code> {idFromUrl}</code>
          </p>

          <p style={{ marginTop: "1rem", color: "#555" }}>
            Observação: esta rota aceita <strong>Lesson.id</strong>. Se você colar um{" "}
            <strong>Course.id</strong>, ela tenta buscar a primeira aula do curso.
          </p>
        </div>
      );
    }

    const courseLabel =
      (aula.course as any)?.name ??
      (aula.course as any)?.title ??
      "Curso Localizado";

    const aulaTitle = (aula as any)?.name ?? (aula as any)?.title ?? "Aula";

    const rawVideoUrl = String((aula as any)?.videoUrl || "").trim();
    const video = normalizeVideoUrl(rawVideoUrl);

    return (
      <main
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          padding: "2rem",
          fontFamily: "sans-serif",
        }}
      >
        <header style={{ marginBottom: "1.5rem" }}>
          <span
            style={{
              backgroundColor: "#e8f5e9",
              color: "#2e7d32",
              padding: "4px 12px",
              borderRadius: "20px",
              fontSize: "0.75rem",
              fontWeight: "bold",
            }}
          >
            {courseLabel}
          </span>

          <h1 style={{ fontSize: "2.2rem", marginTop: "1rem" }}>{aulaTitle}</h1>

          {mode === "courseFallback" && (
            <div
              style={{
                backgroundColor: "#fff3e0",
                padding: "10px",
                borderRadius: "5px",
                marginTop: "10px",
                border: "1px solid #ffe0b2",
              }}
            >
              <p style={{ color: "#e65100", fontSize: "0.85rem", margin: 0 }}>
                <strong>Aviso:</strong> o ID na URL parece ser de um <strong>Curso</strong>. Exibindo a{" "}
                <strong>primeira aula</strong> desse curso para validação.
              </p>
            </div>
          )}
        </header>

        {/* =======================
            PROVA RÁPIDA DO VÍDEO
           ======================= */}
        <section
          style={{
            backgroundColor: "#000",
            aspectRatio: "16/9",
            borderRadius: "12px",
            overflow: "hidden",
            position: "relative",
          }}
        >
          {video?.embedUrl ? (
            <iframe
              src={video.embedUrl}
              title={aulaTitle}
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              style={{
                width: "100%",
                height: "100%",
                border: 0,
                display: "block",
              }}
            />
          ) : (
            <div
              style={{
                color: "#fff",
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                padding: "2rem",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "3rem" }}>🎬</div>
              <p style={{ marginTop: "12px" }}>
                URL de vídeo não cadastrada para esta aula.
              </p>
            </div>
          )}
        </section>

        {/* Fallback visível com link para depuração (sem atrapalhar o player) */}
        <div style={{ marginTop: "12px", fontSize: "0.9rem", color: "#555" }}>
          <strong>VideoUrl:</strong>{" "}
          {rawVideoUrl ? (
            <a href={rawVideoUrl} target="_blank" rel="noreferrer">
              {rawVideoUrl}
            </a>
          ) : (
            <span>(vazio)</span>
          )}
          {video?.provider ? (
            <span style={{ marginLeft: "10px", color: "#999" }}>
              • provider: <code>{video.provider}</code>
            </span>
          ) : null}
        </div>

        <footer
          style={{
            marginTop: "3rem",
            borderTop: "1px solid #eee",
            paddingTop: "1.5rem",
            color: "#999",
            fontSize: "0.8rem",
          }}
        >
          <p>
            <strong>ID Real no Banco:</strong>{" "}
            <code style={{ color: "#d32f2f" }}>{aula.id}</code>
          </p>
          <p>
            <strong>WP ID:</strong> {(aula as any).wpId}
          </p>
          <p>
            <strong>Slug:</strong> {(aula as any).slug}
          </p>
          <p style={{ marginTop: "0.75rem" }}>
            <strong>Modo:</strong>{" "}
            <code>{mode === "lesson" ? "Lesson.id direto" : "Fallback via Course.id"}</code>
          </p>
        </footer>
      </main>
    );
  } catch (error) {
    console.error("❌ Erro de Conexão Prisma:", error);

    return (
      <div style={{ padding: "2rem", color: "red", fontFamily: "sans-serif" }}>
        <h1>❌ Erro de Conexão</h1>
        <p>{String(error)}</p>
      </div>
    );
  }
}

/**
 * O que alterei:
 * - Transformei a seção preta em um player real (iframe) para Vimeo/YouTube.
 * - Criei normalizeVideoUrl() para converter links comuns em links embed.
 * - Tornei o orderBy mais seguro: removi o campo "order" para evitar crash se ele não existir no schema.
 *
 * O que esperar:
 * - Ao abrir /aula/<Lesson.id> você deve ver o vídeo rodando (Vimeo/YouTube) dentro do iframe.
 * - Se abrir /aula/<Course.id>, seguirá exibindo a primeira aula do curso (modo fallback) e também tocará o vídeo.
 */