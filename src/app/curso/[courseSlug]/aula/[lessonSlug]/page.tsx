import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    courseSlug: string;
    lessonSlug: string;
  };
}

// Tática de Mentor: Decodificação segura para slugs com caracteres especiais ou espaços
function safeDecode(v: string) {
  try {
    return decodeURIComponent(v);
  } catch {
    return v;
  }
}

// Detecção inteligente de provedor de vídeo
function isProbablyYoutube(url: string) {
  const u = url.toLowerCase();
  return u.includes("youtube.com") || u.includes("youtu.be");
}

function isProbablyVimeo(url: string) {
  const u = url.toLowerCase();
  return u.includes("vimeo.com");
}

// Transformação de link comum em URL de Embed (essencial para o Player)
function youtubeEmbedUrl(url: string) {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtu.be")) {
      const id = u.pathname.replace("/", "").trim();
      return id ? `https://www.youtube.com/embed/${id}` : "";
    }
    const id = u.searchParams.get("v");
    return id ? `https://www.youtube.com/embed/${id}` : "";
  } catch {
    return "";
  }
}

function vimeoEmbedUrl(url: string) {
  try {
    const u = new URL(url);
    const parts = u.pathname.split("/").filter(Boolean);
    const id = parts[0];
    return id ? `https://player.vimeo.com/video/${id}` : "";
  } catch {
    return "";
  }
}

export default async function AulaSlugPage({ params }: PageProps) {
  const courseSlug = safeDecode(String(params?.courseSlug || "")).trim();
  const lessonSlug = safeDecode(String(params?.lessonSlug || "")).trim();

  if (!courseSlug || !lessonSlug) return notFound();

  // 1) Acha o curso por slug para validar a hierarquia
  const course = await prisma.course.findFirst({
    where: { slug: courseSlug },
    select: { id: true },
  });

  if (!course) return notFound();

  // 2) Acha a aula por (courseId + slug)
  // ✅ Garante que o aluno está acessando a aula do curso correto
  const aula = await prisma.lesson.findFirst({
    where: {
      courseId: course.id,
      slug: lessonSlug,
    },
    include: {
      course: true,
    },
  });

  if (!aula) return notFound();

  // Tratamento dinâmico de labels para evitar erros de propriedade indefinida
  const courseLabel = (aula.course as any)?.name ?? (aula.course as any)?.title ?? "Curso Tutor360";
  const aulaTitle = (aula as any)?.name ?? (aula as any)?.title ?? "Aula";
  const videoUrl = String((aula as any)?.videoUrl || "").trim();

  // Processamento do player
  const youtube = videoUrl && isProbablyYoutube(videoUrl) ? youtubeEmbedUrl(videoUrl) : "";
  const vimeo = videoUrl && isProbablyVimeo(videoUrl) ? vimeoEmbedUrl(videoUrl) : "";

  return (
    <main
      style={{
        maxWidth: "1000px",
        margin: "0 auto",
        padding: "2rem",
        fontFamily: "var(--tp-ff-heading, sans-serif)",
      }}
    >
      <header style={{ marginBottom: "2rem" }}>
        <span
          style={{
            backgroundColor: "rgba(0, 85, 255, 0.1)",
            color: "#0055FF",
            padding: "6px 16px",
            borderRadius: "50px",
            fontSize: "0.8rem",
            fontWeight: "700",
          }}
        >
          {courseLabel}
        </span>

        <h1 style={{ fontSize: "2.5rem", marginTop: "1.5rem", color: "#1A1A1A" }}>{aulaTitle}</h1>
      </header>

      {/* Tática de Cinema: Container 16:9 Black para o Player de Vídeo */}
      <section
        style={{
          backgroundColor: "#000",
          aspectRatio: "16/9",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "16px",
          color: "#fff",
          flexDirection: "column",
          overflow: "hidden",
          boxShadow: "0 20px 40px rgba(0,0,0,0.15)"
        }}
      >
        {vimeo ? (
          <iframe
            src={vimeo}
            title="Player Vimeo"
            style={{ width: "100%", height: "100%", border: 0 }}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        ) : youtube ? (
          <iframe
            src={youtube}
            title="Player YouTube"
            style={{ width: "100%", height: "100%", border: 0 }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div style={{ textAlign: "center", padding: "40px" }}>
            <div style={{ fontSize: "4rem" }}>🔐</div>
            <p style={{ marginTop: "15px", fontWeight: "600" }}>
              {videoUrl ? "Processando Vídeo..." : "Conteúdo exclusivo para alunos matriculados."}
            </p>
          </div>
        )}
      </section>

      {/* Metadados Técnicos - Visíveis apenas para o Professor/Admin (Opcional ocultar no futuro) */}
      <footer
        style={{
          marginTop: "4rem",
          borderTop: "1px solid #eee",
          paddingTop: "2rem",
          color: "#999",
          fontSize: "0.85rem",
        }}
      >
        <p><strong>Rota Ativa:</strong> <code>/curso/{courseSlug}/aula/{lessonSlug}</code></p>
        <p><strong>Lesson ID:</strong> <code style={{ color: "#0055FF" }}>{aula.id}</code></p>
      </footer>
    </main>
  );
}