import { Metadata } from "next";
import prisma from "@/lib/prisma"; // TÁTICA DE MESTRE: Trazendo o motor de busca
import CreateNewCourseArea from "./_components/create-new-course-area";

export const metadata: Metadata = {
   // Atualizamos o título para refletir a dupla função (Criar/Editar)
   title: "Criar ou Editar Curso - Tutor360",
}

// 1. O vigia agora recebe os parâmetros da URL (searchParams)
interface PageProps {
   searchParams: {
      courseId?: string;
   }
}

// Transformamos em async para suportar a consulta ao banco
export default async function CreateNewCoursePage({ searchParams }: PageProps) {
   // 2. Captura o ID que o radar mandou pela URL
   const courseId = searchParams.courseId;
   
   let dbCourse = null;

   // 3. Se houver um ID, faz a busca no PostgreSQL antes de carregar a tela
   if (courseId) {
      dbCourse = await prisma.course.findUnique({
         where: { id: courseId },
      });
   }

   return (
      <main className="tp-dashboard-body-bg">

         {/* 4. A INJEÇÃO: Passamos o curso encontrado (ou null se for um curso novo) para o formulário */}
         <CreateNewCourseArea courseToEdit={dbCourse} />

      </main>
   )
}