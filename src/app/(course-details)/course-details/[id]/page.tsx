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

  // 1. BUSCA HÍBRIDA: Puxa o curso e as lições para contar a carga horária
  const dbCourse = await prisma.course.findFirst({
    where: {
      OR: [
        { id: id },
        { slug: id }
      ]
    },
    include: {
      lessons: { orderBy: { order: 'asc' } },
    }
  });

  if (!dbCourse) return notFound();

  // 2. 🚀 ADAPTER 4.3 (Fidelidade Acadia): 
  // Injetando as propriedades que faltavam na coluna da direita (image_e59783.png)
  const courseViewData = {
    id: dbCourse.id,
    title: dbCourse.title,
    description: dbCourse.description || "Este curso está sendo formatado.",
    category: dbCourse.category || "Geral",
    
    // 💰 FINANCEIRO & CUPOM
    price: dbCourse.price ? Number(dbCourse.price) : 199.90, 
    discountPrice: dbCourse.discountPrice ? Number(dbCourse.discountPrice) : null,
    
    // 🎥 VÍDEO
    video_id: dbCourse.videoId || "go7QYaQR494", 
    thumbnail: dbCourse.thumbnail || "/assets/img/course/details/course.jpg",
    
    // 📊 METADADOS DO WIDGET (O que faltava no seu print image_e59f47.png)
    lessons: dbCourse.lessons.length, 
    duration: dbCourse.duration || "Acesso Vitalício", // "4h 50m" no modelo
    level: dbCourse.level || "Iniciante",
    language: "Português",
    
    // 🎓 CERTIFICADO E PRAZO (Solicitados pelo CEO)
    hasCertificate: true, // Habilita a linha "Certificate: Yes"
    deadline: "30 Nov 2026", // Data de validade do acesso ou oferta
    
    // 🚀 EXTRAS DE CONVERSÃO
    whatYouWillLearn: dbCourse.whatYouWillLearn || [], 
    mentorName: "Tutor360",
    mentorRole: "Especialista Tutor360",
    attachments: [] 
  };

  return (
    <main>
      <CourseDetailsArea course={courseViewData as any} lessons={dbCourse.lessons} />
    </main>
  );
}