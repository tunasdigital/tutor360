// 1) dotenv DEVE ser a primeira coisa a ser importada e executada
import * as dotenv from "dotenv";
dotenv.config();

import fs from "fs";
import path from "path";

import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

/**
 * TUTOR360 — INJETOR DE DADOS (JSON -> POSTGRES)
 * Objetivo: Injetar 636 aulas vinculando-as aos cursos corretos.
 * Versão: 2.9 (Prisma 7 + prisma.config.ts: PrismaClient via adapter-pg)
 *
 * Por que isso?
 * - Seu Prisma CLI conecta (migrate status OK) porque lê prisma.config.ts.
 * - Mas o PrismaClient gerado exige opções válidas e NÃO aceita:
 *   - constructor vazio
 *   - datasources
 *   - datasourceUrl
 * - Isso é típico quando o Client está em modo Driver Adapter.
 * - Solução: criar PrismaClient com { adapter: new PrismaPg(new Pool(...)) }.
 */

function requireEnv(name: string) {
  const v = process.env[name];
  if (!v || String(v).trim().length === 0) {
    throw new Error(
      `[import-lessons] Variável de ambiente ausente ou vazia: ${name}. Verifique o arquivo .env na raiz do projeto.`
    );
  }
  return v;
}

const DATABASE_URL = requireEnv("DATABASE_URL");

const pool = new Pool({
  connectionString: DATABASE_URL,
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const DATA_PATH = path.resolve(process.cwd(), "prisma", "lessons_extracted.json");

async function main() {
  console.log("🚀 Iniciando a injeção de aulas...");

  if (!fs.existsSync(DATA_PATH)) {
    console.error(`❌ ERRO: Arquivo JSON não encontrado em: ${DATA_PATH}`);
    return;
  }

  const lessons = JSON.parse(fs.readFileSync(DATA_PATH, "utf-8"));
  console.log(`📦 ${lessons.length} aulas carregadas. Preparando motores...`);

  let successCount = 0;
  let errorCount = 0;

  for (const lesson of lessons) {
    try {
      const wpIdInt = parseInt(lesson.wpId);
      const courseSlug = `curso-wp-${lesson.courseId}`;
      const lessonSlug = (lesson.slug || `aula-${wpIdInt}`).trim();

      // 1) Upsert do Curso (Pai)
      const course = await prisma.course.upsert({
        where: { slug: courseSlug },
        update: {},
        create: {
          title: `Curso Importado (WP ID: ${lesson.courseId})`,
          slug: courseSlug,
          description: "Curso migrado via script Tutor360.",
        },
      });

      // 2) Upsert da Aula (Filha)
      await prisma.lesson.upsert({
        where: { wpId: wpIdInt },
        update: {
          title: lesson.title,
          videoUrl: lesson.videoUrl || "",
          courseId: course.id,
          slug: lessonSlug,
        },
        create: {
          wpId: wpIdInt,
          title: lesson.title,
          slug: lessonSlug,
          videoUrl: lesson.videoUrl || "",
          courseId: course.id,
          order: 0,
        },
      });

      successCount++;
      if (successCount % 50 === 0) {
        console.log(`⏳ Progresso: ${successCount}/636 processadas...`);
      }
    } catch (err) {
      console.error(`⚠️ Erro no WP ID ${lesson.wpId}:`, err);
      errorCount++;
    }
  }

  console.log("\n------------------------------------------");
  console.log(`✅ PROCESSO FINALIZADO`);
  console.log(`• Importadas com sucesso: ${successCount}`);
  console.log(`• Falhas detectadas: ${errorCount}`);
  console.log("------------------------------------------");
}

main()
  .catch((e) => {
    console.error("❌ Erro fatal na execução do script:");
    console.error(e);
  })
  .finally(async () => {
    // encerra Prisma e Pool (evita processo ficar “pendurado”)
    await prisma.$disconnect();
    await pool.end();
  });