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

  // Busca turbinada: Procura pelo ID ou pelo Slug no banco de dados
  const lesson = await prisma.lesson.findFirst({
    where: {
      OR: [
        { id: String(id) },
        { slug: String(id) }
      ]
    },
  });

  if (!lesson) {
    return (
      <main className="tp-dashboard-body-bg pt-100 pb-100">
        <div className="container text-center">
          <div className="p-5 bg-white rounded-3 shadow-sm border border-danger">
            <h3 className="text-danger mb-3">Erro de Navegação</h3>
            <p>A aula solicitada não foi encontrada no banco de dados.</p>
            <p className="text-muted small">ID ou Slug buscado: {String(id)}</p>
          </div>
        </div>
      </main>
    );
  }

  const title = safeString((lesson as any).title, "Aula sem título");
  const rawUrl = safeString((lesson as any).videoUrl, "");

  const embed = rawUrl ? normalizeEmbed(rawUrl) : "";

  return (
    // Transformação para o layout premium "Modo Cinema"
    <main className="pt-80 pb-100" style={{ backgroundColor: '#0f172a', minHeight: '100vh' }}>
      <div className="container">
        
        {/* Header da Aula */}
        <div className="row justify-content-center mb-30">
          <div className="col-xl-10">
            <div className="d-flex justify-content-between align-items-center">
                <h2 className="text-white mb-0" style={{ fontSize: '28px', fontWeight: '600' }}>
                    {title}
                </h2>
                {/* Botão para simular retorno ao painel ou curso */}
                <a href="/dashboard/student-dashboard" className="tp-btn-inner" style={{ padding: '8px 20px', borderRadius: '5px' }}>
                    Voltar ao Curso
                </a>
            </div>
          </div>
        </div>

        {/* Área do Player (Palco Principal) */}
        <div className="row justify-content-center">
          <div className="col-xl-10">
            {!embed ? (
              <div className="p-5 text-center rounded-3" style={{ backgroundColor: '#1e293b', border: '1px solid #334155' }}>
                <i className="fa-regular fa-video-slash text-muted mb-3" style={{ fontSize: '40px' }}></i>
                <h4 className="text-white">Conteúdo Indisponível</h4>
                <p className="text-muted mb-0">O instrutor ainda não disponibilizou o vídeo para esta aula.</p>
              </div>
            ) : isLikelyIframeHtml(embed) ? (
              <div
                className="ratio ratio-16x9 rounded-3 overflow-hidden shadow-lg"
                style={{ border: '4px solid #1e293b', backgroundColor: '#000' }}
                dangerouslySetInnerHTML={{ __html: embed }}
              />
            ) : (
              <div className="ratio ratio-16x9 rounded-3 overflow-hidden shadow-lg" style={{ border: '4px solid #1e293b', backgroundColor: '#000' }}>
                <iframe
                  src={embed}
                  title={title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  style={{ width: '100%', height: '100%', border: 'none' }}
                />
              </div>
            )}
          </div>
        </div>

        {/* Área de Descrição Inferior */}
        <div className="row justify-content-center mt-30">
            <div className="col-xl-10">
                <div className="p-4 rounded-3" style={{ backgroundColor: '#1e293b' }}>
                    <h5 className="text-white mb-10">Detalhes da Aula</h5>
                    <p className="text-muted mb-0">Assista com atenção e certifique-se de completar todas as tarefas propostas no material complementar.</p>
                </div>
            </div>
        </div>

      </div>
    </main>
  );
}