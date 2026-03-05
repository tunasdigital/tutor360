import React from "react";
import prisma from "@/lib/prisma";
import CourseLessonArea from "../_components/course-lesson-area";
import { redirect } from "next/navigation";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function CourseLessonPage(props: PageProps) {
  // 🚀 REGRA NEXT.JS 15: Aguarda a resolução dos parâmetros dinâmicos
  const params = await props.params;
  const courseId = params.id;

  // A-1: Busca inteligente focada no CURSO (ID 9772)
  const course = await prisma.course.findUnique({
    where: { id: courseId },
    include: {
      // A-2: Trazendo toda a estrutura de módulos e aulas para o Player lateral
      modules: {
        orderBy: { order: 'asc' },
        include: {
          lessons: { 
            orderBy: { order: 'asc' } 
          }
        }
      },
      // Trazemos instrutores e anexos para o componente ter acesso total
      attachments: true
    }
  });

  // A-3: Cerca de Proteção - Se o curso sumiu ou não tem módulos, não deixa a tela quebrar
  if (!course || !course.modules || course.modules.length === 0) {
    redirect("/dashboard/my-courses");
  }

  // Entrega o curso completo para o Componente Visual que já tunamos!
  return (
    <CourseLessonArea course={course} />
  );
}