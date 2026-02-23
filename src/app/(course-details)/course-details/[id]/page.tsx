import prisma from "@/lib/prisma";
import CourseDetailsBreadcrumb from "../_components/course-details-breadcrumb";
import CourseDetailsArea from "../_components/course-details-area";
import RelatedCourses from "@/components/course/details/related-courses";
import { removeTagInText } from "@/utils";

export const dynamic = "force-dynamic";

type Params = Promise<{
  id: string;
}>;

type Props = {
  params: Params;
};

export async function generateMetadata({ params }: Props) {
  const { id } = await params;

  const course = await prisma.course.findFirst({
    where: { id },
    select: { title: true },
  });

  return {
    title: course?.title
      ? `${removeTagInText(course.title)} - Acadia`
      : "Course Details - Acadia",
  };
}

function safeNumber(value: any, fallback = 0) {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

function safeString(value: any, fallback = "") {
  if (!value) return fallback;
  return String(value);
}

function extractFirstUrl(input: string): string | null {
  const m = String(input || "").match(/https?:\/\/[^\s"']+/i);
  return m?.[0] ? m[0].trim() : null;
}

function toYoutubeEmbed(url: string): string {
  const u = url.trim();

  if (u.includes("/embed/")) return u;

  const shorts = u.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]+)/i);
  if (shorts?.[1]) return `https://www.youtube.com/embed/${shorts[1]}`;

  const watch = u.match(/[?&]v=([a-zA-Z0-9_-]+)/i);
  if (watch?.[1]) return `https://www.youtube.com/embed/${watch[1]}`;

  const youtu = u.match(/youtu\.be\/([a-zA-Z0-9_-]+)/i);
  if (youtu?.[1]) return `https://www.youtube.com/embed/${youtu[1]}`;

  return u;
}

function toVimeoEmbed(url: string): string {
  const u = url.trim();

  if (u.includes("player.vimeo.com/video/")) return u;

  const m = u.match(/vimeo\.com\/(\d+)/i);
  if (m?.[1]) return `https://player.vimeo.com/video/${m[1]}`;

  return u;
}

function normalizeVideoUrl(raw: string | null | undefined): string | null {
  const v = typeof raw === "string" ? raw.trim() : "";
  if (!v) return null;
  if (v.toUpperCase() === "SEM_VIDEO") return null;

  const url = v.startsWith("http") ? v : extractFirstUrl(v);
  if (!url) return null;

  const lower = url.toLowerCase();
  if (lower.includes("youtu.be") || lower.includes("youtube.com")) return toYoutubeEmbed(url);
  if (lower.includes("vimeo.com")) return toVimeoEmbed(url);

  return url;
}

function pickVideoUrl(lesson: any): string | null {
  const candidates = [
    lesson?.videoUrl,
    lesson?.video_url,
    lesson?.video,
    lesson?._video,
    lesson?.url,
    lesson?.videoLink,
    lesson?.vimeoUrl,
    lesson?.youtubeUrl,
    lesson?.embedUrl,
  ];

  for (const c of candidates) {
    if (typeof c === "string" && c.trim().length > 0) {
      const normalized = normalizeVideoUrl(c);
      if (normalized) return normalized;
    }
  }
  return null;
}

export default async function CourseDetailsPage({ params }: Props) {
  const { id } = await params;

  const dbCourse = await prisma.course.findFirst({
    where: { id },
  });

  if (!dbCourse) {
    return (
      <div className="text-center mt-100 mb-80">
        <h3>No Course found with id: {id}</h3>
      </div>
    );
  }

  const dbLessons = await prisma.lesson.findMany({
    where: { courseId: dbCourse.id },
    orderBy: [{ order: "asc" }, { createdAt: "asc" }],
  });

  const lessons = dbLessons.map((l: any) => ({
    id: safeString(l?.id),
    title: l?.title ?? null,
    name: l?.name ?? null,
    videoUrl: pickVideoUrl(l),
    duration:
      typeof l?.duration === "string" && l.duration.trim().length > 0
        ? l.duration.trim()
        : null,
    order: safeNumber(l?.order, 0),
    slug: safeString(l?.slug),
  }));

  const curriculum = lessons.map((l: any, idx: number) => ({
    id: l.id,
    title: safeString(l.title ?? l.name, `Aula ${idx + 1}`),
    duration: l.duration,
    videoUrl: l.videoUrl,
    order: l.order ?? idx,
    slug: l.slug,
  }));

  const course = {
    id: safeString((dbCourse as any).id),
    title: safeString((dbCourse as any).title ?? (dbCourse as any).name, "Curso"),
    slug: safeString((dbCourse as any).slug),
    category: safeString((dbCourse as any).category),
    description: safeString((dbCourse as any).description),
    thumbnail:
      safeString((dbCourse as any).thumbnail) ||
      "/assets/img/course/course-thumb-1.jpg",
    price: safeNumber((dbCourse as any).price, 0),
    old_price: 0,
    createdAt: (dbCourse as any).createdAt?.toISOString?.() ?? "",
    updatedAt: (dbCourse as any).updatedAt?.toISOString?.() ?? "",
    instructors: [],
    curriculum,
    reviews: [],
  };

  return (
    <main>
      <CourseDetailsBreadcrumb course={course} />
      <CourseDetailsArea course={course as any} lessons={lessons as any} />
      <RelatedCourses />
    </main>
  );
}