import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import * as fs from "fs";
import * as path from "path";

/**
 * Tutor360 — Prisma Seed de Migração Oficial (Prisma ORM v7)
 * Focado em estabilidade com Driver Adapters e injeção massiva via JSON.
 */

// 1. Validação de Ambiente
const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error("❌ Erro: DATABASE_URL não encontrada no arquivo .env");
  process.exit(1);
}

// 2. Configuração do Adaptador (Requisito Prisma 7 para Postgres Edge)
const pool = new Pool({ connectionString: DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Iniciando Seed Tutor360 (Ponte de Migração)...");
  const start = Date.now();

  try {
    // 3. Carregamento e Leitura do JSON Extraído
    const dataPath = path.join(__dirname, 'lessons_extracted.json');
    
    if (!fs.existsSync(dataPath)) {
      console.error(`❌ Erro: Arquivo não encontrado no caminho: ${dataPath}`);
      console.log("👉 Certifique-se de que o arquivo 'lessons_extracted.json' está dentro da pasta 'prisma'.");
      process.exit(1);
    }

    const rawData = fs.readFileSync(dataPath, "utf-8");
    const aulasBrutas = JSON.parse(rawData);

    // 4. Filtro de Inteligência: Remove lixo do banco antigo
    const aulasValidas = aulasBrutas.filter((aula: any) => aula.courseId !== "CURSO_INDETERMINADO");
    console.log(`📦 Processando ${aulasValidas.length} aulas válidas do JSON...`);

    // 5. Descobrir Cursos Únicos para criar as Chaves Estrangeiras (Cascas)
    const cursosIds = [...new Set(aulasValidas.map((a: any) => a.courseId))];
    console.log(`🏗️ Garantindo a existência estrutural de ${cursosIds.length} cursos...`);

    for (const cId of cursosIds) {
      const idString = String(cId);
      // O Upsert garante que não vamos duplicar ou apagar cursos que já existam
      await prisma.course.upsert({
        where: { id: idString }, // O seu schema usa String para o ID do curso
        update: {}, 
        create: {
          id: idString,
          title: `Curso em Migração (ID: ${idString})`,
          slug: `curso-${idString}-migrado`, // Slug único provisório
          category: "Geral",
          description: "Dados completos do curso sendo atualizados...",
        },
      });
    }

    console.log(`🚀 Injetando aulas na tabela 'lessons'...`);

    // 6. Injeção Idempotente das Lições
    let inseridas = 0;
    for (const aula of aulasValidas) {
      const wpIdNum = Number(aula.wpId);
      const urlFinal = aula.videoUrl === "SEM_VIDEO" ? "" : aula.videoUrl;

      // Usamos o wpId como chave única (conforme seu índice CREATE UNIQUE INDEX "lessons_wpId_key")
      await prisma.lesson.upsert({
        where: { wpId: wpIdNum },
        update: {
          title: aula.title,
          slug: aula.slug,
          videoUrl: urlFinal,
          courseId: String(aula.courseId),
        },
        create: {
          title: aula.title,
          slug: aula.slug,
          videoUrl: urlFinal,
          courseId: String(aula.courseId),
          wpId: wpIdNum,
          order: inseridas + 1, // Organização sequencial de chegada
        },
      });
      inseridas++;
    }

    console.log(`✅ Seed de Migração finalizado com sucesso em ${Date.now() - start}ms!`);
    console.log(`• Cursos verificados/criados: ${cursosIds.length}`);
    console.log(`• Lições injetadas no banco: ${inseridas}`);

  } catch (error) {
    console.error("❌ Erro catastrófico durante a execução do seed:");
    console.error(error);
    process.exit(1);
  } finally {
    // 7. Fechamento seguro das conexões
    await prisma.$disconnect();
    await pool.end();
  }
}

main();