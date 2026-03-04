import React from "react";
import prisma from "@/lib/prisma";
import CreateNewCourseArea from "./_components/create-new-course-area";

// 🚀 O SEGREDO DO FLUXO: Força a página a sempre buscar dados novos, ignorando o cache
export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface PageProps {
  searchParams: Promise<{
    courseId?: string;
  }>;
}

export default async function CreateNewCoursePage(props: PageProps) {
  // Aguarda os parâmetros da URL (Regra do Next.js 15)
  const searchParams = await props.searchParams;
  const courseId = searchParams.courseId;

  let courseToEdit = null;

  if (courseId) {
    // Busca o curso com módulos e lições inclusas
    courseToEdit = await prisma.course.findUnique({
      where: { id: courseId },
      include: {
        modules: {
          orderBy: { order: 'asc' }
        },
        lessons: {
          orderBy: { order: 'asc' }
        }
      }
    });
  }

  // Entrega o pacote completo para o Orquestrador
  return (
    <CreateNewCourseArea courseToEdit={courseToEdit} />
  );
}