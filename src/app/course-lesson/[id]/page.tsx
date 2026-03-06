import React from "react";
import prisma from "@/lib/prisma"; 
import CourseLessonArea from "../_components/course-lesson-area";
import { redirect } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string; }>;
}

export default async function CourseLessonPage(props: PageProps) {
  // Regra Next.js 15: Aguardamos a resolução dos parâmetros da URL
  const params = await props.params;
  const courseId = params.id;

  // 1. Busca profunda do curso para alimentar o Player, a Sidebar E os Materiais
  const course = await prisma.course.findUnique({
    where: { id: courseId },
    include: {
      modules: {
        orderBy: { order: 'asc' },
        include: { lessons: { orderBy: { order: 'asc' } } }
      },
      attachments: true // 📎 A PEÇA QUE FALTAVA: Extraindo os PDFs da nova gaveta do banco
    }
  });

  // Se o curso sumir ou o ID estiver errado, voltamos para a Torre de Controle
  if (!course) {
    redirect("/dashboard/admin-all-courses");
  }

  // Identificador de teste para o progresso do aluno na Ababoo
  const userId = "user_test_99"; 
  let completedLessonIds: string[] = [];
  
  // 🛡️ BLINDAGEM DE ELITE: Tenta buscar o progresso de forma segura
  try {
    const progress = await prisma.lessonProgress.findMany({
      where: { 
        courseId: courseId,
        userId: userId,
        completed: true 
      },
      select: { lessonId: true }
    });
    
    completedLessonIds = progress.map((p: any) => p.lessonId);
  } catch (error) {
    console.error("⚠️ ALERTA ABABOO: O Prisma Client ainda não atualizou a memória do servidor.", error);
    completedLessonIds = [];
  }

  return (
    // Entrega final para o componente visual que já está com a área de materiais e botão Zen
    <CourseLessonArea 
      course={course} 
      userId={userId} 
      completedLessons={completedLessonIds} 
    />
  );
}