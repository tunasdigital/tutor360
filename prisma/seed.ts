import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

/**
 * Tutor360 — Prisma Seed (Prisma ORM v7.4.1)
 * Focado em estabilidade e compatibilidade com Driver Adapters.
 */

// 1. Validação de Ambiente
const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error("❌ Erro: DATABASE_URL não encontrada no arquivo .env");
  process.exit(1);
}

// 2. Configuração do Adaptador (Requisito Prisma 7 para Postgres)
const pool = new Pool({ connectionString: DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

// 3. Estrutura de Dados Demo
const COURSE_DEMO = {
  title: "Tutor360 — Curso Demo (Seed)",
  slug: "tutor360-curso-demo",
  description: "Curso de demonstração para validar a nova arquitetura do Tutor360.",
  thumbnail: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200",
  category: "Demonstração",
  lessons: [
    {
      title: "Boas-vindas ao Tutor360",
      slug: "boas-vindas",
      videoUrl: "https://player.vimeo.com/video/76979871",
      duration: "02:10",
      order: 1,
      wpId: 1001,
    },
    {
      title: "Arquitetura Prisma 7",
      slug: "arquitetura-prisma-7",
      videoUrl: "https://player.vimeo.com/video/22439234",
      duration: "08:45",
      order: 2,
      wpId: 1002,
    },
    {
      title: "Estratégia de Migração WordPress",
      slug: "estrategia-migracao",
      videoUrl: "https://player.vimeo.com/video/146022717",
      duration: "05:30",
      order: 3,
      wpId: 1003,
    },
  ],
};

async function main() {
  console.log("🌱 Iniciando Seed Tutor360...");
  const start = Date.now();

  try {
    // Upsert do Curso (Idempotente)
    const course = await prisma.course.upsert({
      where: { slug: COURSE_DEMO.slug },
      update: {
        title: COURSE_DEMO.title,
        description: COURSE_DEMO.description,
        thumbnail: COURSE_DEMO.thumbnail,
        category: COURSE_DEMO.category,
      },
      create: {
        title: COURSE_DEMO.title,
        slug: COURSE_DEMO.slug,
        description: COURSE_DEMO.description,
        thumbnail: COURSE_DEMO.thumbnail,
        category: COURSE_DEMO.category,
      },
    });

    // Limpeza de lições antigas do curso demo (para evitar duplicidade no seed)
    await prisma.lesson.deleteMany({
      where: { courseId: course.id },
    });

    // Criação das Lições
    await prisma.lesson.createMany({
      data: COURSE_DEMO.lessons.map((lesson) => ({
        ...lesson,
        courseId: course.id,
      })),
    });

    console.log(`✅ Seed finalizado com sucesso em ${Date.now() - start}ms`);
    console.log(`• Curso: ${course.title}`);
    console.log(`• Lições: ${COURSE_DEMO.lessons.length}`);

  } catch (error) {
    console.error("❌ Erro durante a execução do seed:");
    console.error(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

main();