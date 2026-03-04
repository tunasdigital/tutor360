import React from "react";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma"; 
import CourseDetailsArea from "../_components/course-details-area";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function CourseDetailsPage({ params }: PageProps) {
  const { id } = params;

  // 1. BUSCA DE ELITE (CURSO): Recupera todos os campos reais do PostgreSQL
  const dbCourse = await prisma.course.findUnique({
    where: { id: id }
  });

  // 🛡️ QVA: Se não existir no banco, 404 imediato para evitar ReferenceError
  if (!dbCourse) {
    return notFound();
  }

  // 2. BUSCA DE ELITE (AULAS): Pega a contagem real para o Widget
  const realLessons = await prisma.lesson.findMany({
    where: { courseId: id },
    orderBy: { order: 'asc' }
  });

  // 3. TRADUTOR DE INTERFACE (Adapter) 3.0: 
  // 🚀 HABILITAÇÃO TOTAL: Conectando os campos da página de edição (image_e864fe.png)
  const courseViewData = {
    id: dbCourse.id,
    title: dbCourse.title,
    description: dbCourse.description || "Este curso está sendo formatado.",
    category: dbCourse.category || "Geral",
    
    // 💵 FINANCEIRO: Preços dinâmicos da sua curadoria
    price: dbCourse.price ? Number(dbCourse.price) : 199.90, 
    discountPrice: dbCourse.discountPrice ? Number(dbCourse.discountPrice) : null,
    
    // 🖼️ VISUAL: Thumbnail do Vercel Blob
    thumbnail: dbCourse.thumbnail || "/assets/img/course/details/course.jpg",
    
    // 🎥 VÍDEO: Agora puxa o link dinâmico da sua edição (image_e864fe.png)
    video_id: dbCourse.videoId || "go7QYaQR494", 
    
    // 📊 METADADOS: Sincronizados com os ícones do Modelo M02
    lessons: realLessons.length, 
    level: dbCourse.level || "Iniciante",
    language: dbCourse.language || "Português",
    mentorName: dbCourse.mentorName || "Tutor360",
    duration: dbCourse.duration || "Acesso Vitalício",
  };

  return (
    <main>
      {/* O Orquestrador recebe o objeto validado e sem erros de referência */}
      <CourseDetailsArea course={courseViewData as any} lessons={realLessons} />
    </main>
  );
}