import React from "react";
import prisma from "@/lib/prisma";
import CreateNewCourseArea from "./_components/create-new-course-area";

// 🚀 BLINDAGEM ANTI-CACHE: Garante que o Next.js busque dados frescos do banco em cada F5
export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface PageProps {
  searchParams: Promise<{
    courseId?: string;
  }>;
}

export default async function CreateNewCoursePage(props: PageProps) {
  // 🚀 REGRA NEXT.JS 15: Aguarda a chegada dos parâmetros da URL
  const searchParams = await props.searchParams;
  const courseId = searchParams.courseId;

  let courseToEdit = null;

  if (courseId) {
    // 🎯 A BUSCA PROFUNDA (Deep Fetch):
    // Não buscamos apenas o curso, mas abrimos as gavetas de Módulos e, 
    // dentro de cada módulo, buscamos as Aulas (lessons).
    courseToEdit = await prisma.course.findUnique({
      where: { id: courseId },
      include: {
        modules: {
          orderBy: { order: 'asc' },
          include: {
            lessons: { 
              orderBy: { order: 'asc' } 
            }
          }
        },
        // Mantemos a busca de lições soltas para compatibilidade com o legado WP
        lessons: {
          where: { moduleId: null },
          orderBy: { order: 'asc' }
        },
        // A-1: A Luz do Frontend! Busca os arquivos que subiram pro Vercel Blob
        attachments: true 
      }
    });
  }

  // Repassa o objeto completo (com toda a hierarquia) para o Orquestrador
  return (
    <CreateNewCourseArea courseToEdit={courseToEdit} />
  );
}