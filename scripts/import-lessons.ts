import "dotenv/config";
import fs from "node:fs";
import path from "node:path";

function requireEnv(name: string) {
  const v = process.env[name];
  if (!v || String(v).trim().length === 0) {
    throw new Error(
      `[import-lessons] Variável de ambiente ausente ou vazia: ${name}. Verifique o arquivo .env na raiz do projeto.`
    );
  }
  return v;
}

type ExtractedLesson = {
  wpId?: number | string | null;
  title?: string | null;
  slug?: string | null;
  videoUrl?: string | null;
  duration?: string | null;
  order?: number | string | null;
  courseSlug?: string | null;
  courseTitle?: string | null;
  topicSlug?: string | null;
};

function toIntOrNull(v: unknown): number | null {
  if (v === null || v === undefined) return null;
  const n = typeof v === "number" ? v : Number(String(v).trim());
  if (!Number.isFinite(n)) return null;
  return Math.trunc(n);
}

function toStringOrNull(v: unknown): string | null {
  if (v === null || v === undefined) return null;
  const s = String(v).trim();
  return s.length ? s : null;
}

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

function readExtractedLessonsJson(jsonPath: string): ExtractedLesson[] {
  if (!fs.existsSync(jsonPath)) {
    throw new Error(`[import-lessons] Arquivo não encontrado: ${jsonPath}.`);
  }

  const raw = fs.readFileSync(jsonPath, "utf-8");
  const parsed = JSON.parse(raw);

  if (Array.isArray(parsed)) return parsed;
  if (parsed && Array.isArray(parsed.lessons)) return parsed.lessons;

  throw new Error(`[import-lessons] Formato inesperado do JSON.`);
}

async function main() {
  const DATABASE_URL = requireEnv("DATABASE_URL");
  process.env.DATABASE_URL = DATABASE_URL;

  if (!process.env.PRISMA_CLIENT_ENGINE_TYPE) {
    process.env.PRISMA_CLIENT_ENGINE_TYPE = "binary";
  }

  const { PrismaClient } = await import("@prisma/client");
  const prisma = new PrismaClient();

  const getOrCreateCourseBySlug = async (slug: string, title: string) => {
    const existing = await prisma.course.findUnique({ where: { slug } });
    if (existing) return existing;

    return prisma.course.create({
      data: { slug, title },
    });
  };

  const jsonPath = path.resolve(process.cwd(), "prisma", "lessons_extracted.json");
  console.log(`[import-lessons] Lendo: ${jsonPath}`);

  const lessons = readExtractedLessonsJson(jsonPath);
  console.log(`[import-lessons] Itens carregados: ${lessons.length}`);

  let created = 0;
  let updated = 0;
  let skippedNoWpId = 0;

  for (const item of lessons) {
    const wpId = toIntOrNull(item.wpId);
    if (!wpId) {
      skippedNoWpId++;
      continue;
    }

    const title = toStringOrNull(item.title) || `Aula ${wpId}`;
    const slug = toStringOrNull(item.slug) || slugify(title);
    const videoUrl = toStringOrNull(item.videoUrl) || "";
    const duration = toStringOrNull(item.duration);
    const order = toIntOrNull(item.order) ?? 0;

    const courseSlug = slugify(
      toStringOrNull(item.courseSlug) || toStringOrNull(item.topicSlug) || "curso-sem-slug"
    );

    const courseTitle = toStringOrNull(item.courseTitle) || `Curso ${courseSlug}`;
    const course = await getOrCreateCourseBySlug(courseSlug, courseTitle);

    const existing = await prisma.lesson.findUnique({ where: { wpId } });

    await prisma.lesson.upsert({
      where: { wpId },
      create: {
        wpId,
        title,
        slug,
        videoUrl,
        duration,
        order,
        courseId: course.id,
      },
      update: {
        title,
        slug,
        videoUrl,
        duration,
        order,
        courseId: course.id,
      },
    });

    if (existing) updated++;
    else created++;
  }

  console.log("-------------");
  console.log(`[import-lessons] Criadas: ${created}`);
  console.log(`[import-lessons] Atualizadas: ${updated}`);
  console.log(`[import-lessons] Ignoradas (sem wpId): ${skippedNoWpId}`);
  console.log("-------------");

  await prisma.$disconnect();
}

main().catch((err) => {
  console.error("[import-lessons] ERRO ❌", err);
  process.exitCode = 1;
});