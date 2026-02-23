import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    courseSlug: string;
    lessonSlug: string;
  };
}

function safeDecode(v: string) {
  try {
    return decodeURIComponent(v);
  } catch {
    return v;
  }
}

function isProbablyYoutube(url: string) {
  const u = url.toLowerCase();
  return u.includes("youtube.com") || u.includes("youtu.be");
}

function isProbablyVimeo(url: string) {
  const u = url.toLowerCase();
  return u.includes("vimeo.com");
}

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

  // 1) Acha o curso por slug
  const course = await prisma.course.findFirst({
    where: { slug: courseSlug },
    select: { id: true },
  });

  if (!course) return notFound();

  // 2) Acha a aula por (courseId + slug)
  //    ✅ Não depende de constraint unique agora; findFirst já resolve.
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

  const courseLabel =
    (aula.course as any)?.name ??
    (aula.course as any)?.title ??
    "Curso Localizado";

  const aulaTitle = (aula as any)?.name ?? (aula as any)?.title ?? "Aula";

  const videoUrl = String((aula as any)?.videoUrl || "").trim();

  const youtube = videoUrl && isProbablyYoutube(videoUrl) ? youtubeEmbedUrl(videoUrl) : "";
  const vimeo = videoUrl && isProbablyVimeo(videoUrl) ? vimeoEmbedUrl(videoUrl) : "";

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

        <div style={{ marginTop: "0.75rem", color: "#666", fontSize: "0.85rem" }}>
          <strong>Rota:</strong>{" "}
          <code>/curso/{courseSlug}/aula/{lessonSlug}</code>
        </div>
      </header>

      <section
        style={{
          backgroundColor: "#000",
          aspectRatio: "16/9",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "12px",
          color: "#fff",
          flexDirection: "column",
          overflow: "hidden",
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
          <>
            <div style={{ fontSize: "4rem" }}>🎬</div>
            <p style={{ marginTop: "15px", textAlign: "center", padding: "0 16px" }}>
              {videoUrl || "URL de vídeo não cadastrada"}
            </p>
          </>
        )}
      </section>

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
          <strong>Course ID:</strong>{" "}
          <code style={{ color: "#1976d2" }}>{(aula as any).courseId}</code>
        </p>
        <p>
          <strong>Lesson ID:</strong>{" "}
          <code style={{ color: "#d32f2f" }}>{aula.id}</code>
        </p>
        <p>
          <strong>WP ID:</strong> {(aula as any).wpId}
        </p>
        <p>
          <strong>Slug da Aula:</strong> {(aula as any).slug}
        </p>
      </footer>
    </main>
  );
}

/**
 * O que alterei:
 * - Criei uma nova rota amigável por slug:
 *   /curso/[courseSlug]/aula/[lessonSlug]
 * - Busca Course por slug e Lesson por (courseId + slug), sem depender de unique composto.
 * - Renderiza título e vídeo (Vimeo/YouTube embed quando reconhecido).
 *
 * O que esperar:
 * - Você conseguirá abrir aulas por slug, respeitando a hierarquia curso → aula.
 */