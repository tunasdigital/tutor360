import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

type Params = Promise<{
  id: string;
}>;

type Props = {
  params: Params;
};

function safeString(value: any, fallback = "") {
  if (!value) return fallback;
  return String(value);
}

function extractFirstUrl(input: string): string | null {
  const m = String(input || "").match(/https?:\/\/[^\s"'<)]+/i);
  return m?.[0] ? m[0].trim() : null;
}

function isLikelyIframeHtml(value: string) {
  const v = value.toLowerCase();
  return v.includes("<iframe") && v.includes("src=");
}

function toYouTubeEmbed(url: string): string | null {
  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^www\./, "");

    if (host === "youtu.be") {
      const id = u.pathname.replace("/", "").trim();
      if (!id) return null;
      return `https://www.youtube.com/embed/${id}`;
    }

    if (host === "youtube.com" || host === "m.youtube.com") {
      const v = u.searchParams.get("v");
      if (v) return `https://www.youtube.com/embed/${v}`;

      const parts = u.pathname.split("/").filter(Boolean);
      const idx = parts.findIndex((p) => p === "embed");
      if (idx >= 0 && parts[idx + 1]) return `https://www.youtube.com/embed/${parts[idx + 1]}`;

      const idx2 = parts.findIndex((p) => p === "shorts");
      if (idx2 >= 0 && parts[idx2 + 1]) return `https://www.youtube.com/embed/${parts[idx2 + 1]}`;
    }

    return null;
  } catch {
    return null;
  }
}

function toVimeoEmbed(url: string): string | null {
  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^www\./, "");

    if (host === "vimeo.com") {
      const id = u.pathname.split("/").filter(Boolean)[0];
      if (!id) return null;
      return `https://player.vimeo.com/video/${id}`;
    }

    if (host === "player.vimeo.com") {
      const parts = u.pathname.split("/").filter(Boolean);
      const idx = parts.findIndex((p) => p === "video");
      if (idx >= 0 && parts[idx + 1]) return `https://player.vimeo.com/video/${parts[idx + 1]}`;
    }

    return null;
  } catch {
    return null;
  }
}

function normalizeEmbed(input: string): string {
  const raw = String(input || "").trim();
  if (!raw) return raw;

  if (isLikelyIframeHtml(raw)) return raw;

  const url = raw.startsWith("http") ? raw : extractFirstUrl(raw);
  if (!url) return raw;

  const lower = url.toLowerCase();

  const yt = lower.includes("youtube.com") || lower.includes("youtu.be") ? toYouTubeEmbed(url) : null;
  if (yt) return yt;

  const vm = lower.includes("vimeo.com") ? toVimeoEmbed(url) : null;
  if (vm) return vm;

  return url;
}

export default async function CourseLessonDynamicPage({ params }: Props) {
  const { id } = await params;

  const lesson = await prisma.lesson.findFirst({
    where: { id: String(id) },
  });

  if (!lesson) {
    return (
      <main className="tp-dashboard-body-bg">
        <div className="container pt-120 pb-120">
          <h3>Aula não encontrada: {String(id)}</h3>
        </div>
      </main>
    );
  }

  const title = safeString((lesson as any).title, "Aula");
  const rawUrl = safeString((lesson as any).videoUrl, "");

  const embed = rawUrl ? normalizeEmbed(rawUrl) : "";

  return (
    <main className="tp-dashboard-body-bg">
      <div className="container pt-80 pb-80">
        <div className="row justify-content-center">
          <div className="col-xl-10">
            <h2 className="mb-20">{title}</h2>

            {!embed ? (
              <div className="p-4 bg-white rounded-3">
                <p className="mb-0">Esta aula não possui vídeo configurado no banco ainda.</p>
              </div>
            ) : isLikelyIframeHtml(embed) ? (
              <div
                className="ratio ratio-16x9 bg-white rounded-3 overflow-hidden"
                dangerouslySetInnerHTML={{ __html: embed }}
              />
            ) : (
              <div className="ratio ratio-16x9 bg-white rounded-3 overflow-hidden">
                <iframe
                  src={embed}
                  title={title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}