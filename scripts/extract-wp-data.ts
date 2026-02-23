import fs from "fs";
import path from "path";
import { XMLParser } from "fast-xml-parser";
import php from "php-serialize";

const PATH_PRISMA = path.resolve(process.cwd(), "prisma");
const FILE_AULAS = path.join(PATH_PRISMA, "tutor360-aulas.xml");
const FILE_TOPICS = path.join(PATH_PRISMA, "tutor360-Topics.xml");
const OUTPUT_FILE = path.join(PATH_PRISMA, "lessons_extracted.json");

const parser = new XMLParser({
  ignoreAttributes: false,
  parseTagValue: true,
});

function asArray<T>(v: T | T[] | undefined | null): T[] {
  if (!v) return [];
  return Array.isArray(v) ? v : [v];
}

function isUrlLike(v: string) {
  const s = String(v || "").trim().toLowerCase();
  return s.startsWith("http://") || s.startsWith("https://");
}

function buildVimeoUrl(idOrUrl: string) {
  const raw = String(idOrUrl || "").trim();
  if (!raw) return "";
  if (isUrlLike(raw)) return raw;

  const clean = raw.replace(/^vimeo:/i, "").trim();
  return clean ? `https://player.vimeo.com/video/${clean}` : "";
}

function buildYouTubeUrl(idOrUrl: string) {
  const raw = String(idOrUrl || "").trim();
  if (!raw) return "";

  // Se já é URL, normaliza para embed quando possível
  if (isUrlLike(raw)) {
    try {
      const u = new URL(raw);
      const host = u.hostname.replace(/^www\./, "");

      // youtu.be/<id>
      if (host === "youtu.be") {
        const id = u.pathname.replace("/", "").trim();
        return id ? `https://www.youtube.com/embed/${id}` : raw;
      }

      // youtube.com/watch?v=<id>
      if (host === "youtube.com" || host === "m.youtube.com") {
        const v = u.searchParams.get("v");
        if (v) return `https://www.youtube.com/embed/${v}`;

        // /embed/<id>
        const parts = u.pathname.split("/").filter(Boolean);
        const idxEmbed = parts.findIndex((p) => p === "embed");
        if (idxEmbed >= 0 && parts[idxEmbed + 1]) {
          return `https://www.youtube.com/embed/${parts[idxEmbed + 1]}`;
        }

        // /shorts/<id>
        const idxShorts = parts.findIndex((p) => p === "shorts");
        if (idxShorts >= 0 && parts[idxShorts + 1]) {
          return `https://www.youtube.com/embed/${parts[idxShorts + 1]}`;
        }
      }

      return raw;
    } catch {
      return raw;
    }
  }

  // Se é só ID
  return `https://www.youtube.com/embed/${raw}`;
}

function normalizeTutorVideo(input: unknown): string {
  if (!input) return "SEM_VIDEO";

  // string direta
  if (typeof input === "string") {
    const raw = input.trim();
    if (!raw) return "SEM_VIDEO";
    return raw;
  }

  if (typeof input !== "object") return "SEM_VIDEO";
  const obj: any = input;

  // TutorLMS costuma guardar isso:
  // source_youtube: "https://youtu.be/...."  (OU id)
  // source_vimeo: "" (OU id)
  const sourceYoutube = String(obj.source_youtube || "").trim();
  const sourceVimeo = String(obj.source_vimeo || "").trim();
  if (sourceYoutube) return buildYouTubeUrl(sourceYoutube);
  if (sourceVimeo) return buildVimeoUrl(sourceVimeo);

  const source = String(obj.source || obj.video_source || obj.type || obj.provider || "")
    .trim()
    .toLowerCase();

  const sourceUrl = String(obj.source_url || obj.url || obj.video_url || "").trim();
  if (sourceUrl && isUrlLike(sourceUrl)) return sourceUrl;

  const id = String(obj.source_video_id || obj.video_id || obj.id || "").trim();
  if (!id) return "SEM_VIDEO";

  if (source.includes("vimeo")) return buildVimeoUrl(id);
  if (source.includes("youtube")) return buildYouTubeUrl(id);

  // Heurística:
  if (/^\d+$/.test(id)) return buildVimeoUrl(id);
  return buildYouTubeUrl(id);
}

function matchSerializedString(val: string, key: string): string {
  // pega s:N:"..."; respeitando escape básico
  // Ex: s:14:"source_youtube";s:28:"https://youtu.be/xxx";
  const re = new RegExp(`"${key}"\\s*;\\s*s:\\d+:"([^"]*)"`, "i");
  const m = val.match(re);
  return m?.[1] ? String(m[1]).trim() : "";
}

function parseTutorVideoFromMetaValue(metaValue: string): string {
  const val = String(metaValue || "").trim();
  if (!val) return "SEM_VIDEO";

  // ✅ 1) tenta unserialize (melhor cenário)
  try {
    const decoded: any = php.unserialize(val);
    const normalized = normalizeTutorVideo(decoded);
    if (normalized !== "SEM_VIDEO") return normalized;
  } catch {
    // segue para regex
  }

  // ✅ 2) regex direta nos campos que REALMENTE importam no TutorLMS
  // (esses dois são o ouro)
  const sourceYoutube = matchSerializedString(val, "source_youtube");
  if (sourceYoutube) return buildYouTubeUrl(sourceYoutube);

  const sourceVimeo = matchSerializedString(val, "source_vimeo");
  if (sourceVimeo) return buildVimeoUrl(sourceVimeo);

  // ✅ 3) fallback: source + id
  const source = matchSerializedString(val, "source").toLowerCase();

  const id =
    matchSerializedString(val, "source_video_id") ||
    matchSerializedString(val, "video_id") ||
    matchSerializedString(val, "id");

  if (id) {
    if (source.includes("vimeo")) return buildVimeoUrl(id);
    if (source.includes("youtube")) return buildYouTubeUrl(id);
    if (/^\d+$/.test(id)) return buildVimeoUrl(id);
    return buildYouTubeUrl(id);
  }

  // ✅ 4) fallback: qualquer url
  const anyUrl =
    matchSerializedString(val, "source_url") ||
    matchSerializedString(val, "video_url") ||
    matchSerializedString(val, "url") ||
    matchSerializedString(val, "link");

  if (anyUrl) return isUrlLike(anyUrl) ? anyUrl : anyUrl;

  // ✅ 5) se o próprio val já for url
  if (isUrlLike(val)) return val;

  // último recurso: devolve cru (pra não perder dado)
  return val;
}

async function extractData() {
  console.log("🛠️ Iniciando Extração (XML)...");

  if (!fs.existsSync(FILE_AULAS) || !fs.existsSync(FILE_TOPICS)) {
    console.error(
      "❌ Erro: arquivos 'tutor360-aulas.xml' e/ou 'tutor360-Topics.xml' não encontrados em /prisma."
    );
    return;
  }

  try {
    console.log("📂 Mapeando Topics → Course (parent)...");
    const topicsXml = fs.readFileSync(FILE_TOPICS, "utf-8");
    const topicsObj = parser.parse(topicsXml);
    const topicsItems = asArray<any>(topicsObj.rss?.channel?.item);

    const topicsMap: Record<string, string> = {};
    for (const item of topicsItems) {
      const id = String(item["wp:post_id"] ?? "").trim();
      const parentCourseId = String(item["wp:post_parent"] ?? "").trim();
      if (id) topicsMap[id] = parentCourseId || "";
    }

    console.log("📂 Processando Aulas e extraindo vídeo...");
    const aulasXml = fs.readFileSync(FILE_AULAS, "utf-8");
    const aulasObj = parser.parse(aulasXml);
    const aulasItems = asArray<any>(aulasObj.rss?.channel?.item);

    const finalLessons = aulasItems.map((item: any) => {
      const postId = String(item["wp:post_id"] ?? "").trim();
      const topicId = String(item["wp:post_parent"] ?? "").trim();
      const title = String(item["title"] ?? "").trim();
      const slug = String(item["wp:post_name"] ?? "").trim();

      let videoUrl = "SEM_VIDEO";
      const metaArray = asArray<any>(item["wp:postmeta"]);
      const videoMeta = metaArray.find((m: any) => m["wp:meta_key"] === "_video");

      if (videoMeta && videoMeta["wp:meta_value"]) {
        videoUrl = parseTutorVideoFromMetaValue(String(videoMeta["wp:meta_value"]));
      }

      const courseWpId = topicsMap[topicId] || "CURSO_INDETERMINADO";

      return {
        wpId: postId,
        title: title || "Aula sem título",
        slug: slug || "",
        courseId: String(courseWpId),
        videoUrl: String(videoUrl || "SEM_VIDEO"),
      };
    });

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(finalLessons, null, 2));

    console.log("------------------------------------------");
    console.log("✅ PROCESSO FINALIZADO");
    console.log(`• Lessons: ${finalLessons.length}`);
    console.log(`• Topics: ${Object.keys(topicsMap).length}`);
    console.log(`• Saída: prisma/lessons_extracted.json`);
    console.log("------------------------------------------");
  } catch (error: any) {
    console.error("❌ Falha durante o processamento:", error?.message || error);
  }
}

extractData();