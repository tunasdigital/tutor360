import fs from 'fs';
import path from 'path';
import { XMLParser } from 'fast-xml-parser';
import php from 'php-serialize';

/**
 * TUTOR360 — EXTRATOR XML FINAL
 * Persona: Professor-Mentor
 * Objetivo: Cruzar lições e tópicos dos arquivos XML exportados do WordPress.
 */

const PATH_PRISMA = path.resolve(process.cwd(), 'prisma');
const FILE_AULAS = path.join(PATH_PRISMA, 'tutor360-aulas.xml');
const FILE_TOPICS = path.join(PATH_PRISMA, 'tutor360-Topics.xml');
const OUTPUT_FILE = path.join(PATH_PRISMA, 'lessons_extracted.json');

const parser = new XMLParser({
  ignoreAttributes: false,
  parseTagValue: true,
});

async function extractData() {
  console.log("🛠️ Iniciando Extração Cirúrgica (Módulo XML)...");

  if (!fs.existsSync(FILE_AULAS) || !fs.existsSync(FILE_TOPICS)) {
    console.error("❌ Erro: Certifique-se de que os arquivos 'tutor360-aulas.xml' e 'tutor360-Topics.xml' estão na pasta prisma.");
    return;
  }

  try {
    // 1. MAPEANDO TÓPICOS
    console.log("📂 Mapeando Tópicos para identificar Cursos...");
    const topicsXml = fs.readFileSync(FILE_TOPICS, 'utf-8');
    const topicsObj = parser.parse(topicsXml);
    const topicsItems = topicsObj.rss?.channel?.item || [];
    const topicsMap: Record<string, string> = {};

    const safeTopics = Array.isArray(topicsItems) ? topicsItems : [topicsItems];
    safeTopics.forEach((item: any) => {
      const id = item['wp:post_id'];
      const parentCourseId = item['wp:post_parent'];
      topicsMap[id] = String(parentCourseId);
    });

    // 2. MAPEANDO AULAS E VÍDEOS
    console.log("📂 Processando Aulas e Extraindo Metadados de Vídeo...");
    const aulasXml = fs.readFileSync(FILE_AULAS, 'utf-8');
    const aulasObj = parser.parse(aulasXml);
    const aulasItems = aulasObj.rss?.channel?.item || [];
    
    const safeAulas = Array.isArray(aulasItems) ? aulasItems : [aulasItems];
    const finalLessons = safeAulas.map((item: any) => {
      const postId = item['wp:post_id'];
      const topicId = item['wp:post_parent'];
      const title = item['title'];
      const slug = item['wp:post_name'];
      
      let videoUrl = "SEM_VIDEO";
      const meta = item['wp:postmeta'];

      if (meta) {
        const metaArray = Array.isArray(meta) ? meta : [meta];
        const videoMeta = metaArray.find((m: any) => m['wp:meta_key'] === '_video');
        
        if (videoMeta && videoMeta['wp:meta_value']) {
          const val = String(videoMeta['wp:meta_value']);
          try {
            // Tenta desserializar o padrão PHP do TutorLMS
            const decoded: any = php.unserialize(val);
            videoUrl = decoded.video_id || decoded.source_video_id || decoded.source_url || val;
          } catch (e) {
            // Backup por Regex caso o PHP serialize esteja corrompido
            const match = val.match(/"(?:video_id|source_video_id|url)";s:\d+:"([^"]+)"/);
            if (match) videoUrl = match[1];
            else videoUrl = val; 
          }
        }
      }

      return {
        wpId: String(postId),
        title: String(title),
        slug: String(slug),
        courseId: topicsMap[topicId] || "CURSO_INDETERMINADO",
        videoUrl: String(videoUrl)
      };
    });

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(finalLessons, null, 2));
    
    console.log("------------------------------------------");
    console.log(`✅ PROCESSO FINALIZADO COM SUCESSO`);
    console.log(`• Total de Aulas (Lessons): ${finalLessons.length}`);
    console.log(`• Tópicos Relacionados: ${Object.keys(topicsMap).length}`);
    console.log(`• Destino: prisma/lessons_extracted.json`);
    console.log("------------------------------------------");

  } catch (error: any) {
    console.error("❌ Falha durante o processamento:", error.message);
  }
}

extractData();