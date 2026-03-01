import { Metadata } from "next";
import CreateNewCourseArea from "./_components/create-new-course-area";

export const metadata: Metadata = {
   // Tradução do título da aba do navegador para manter o branding Tutor360
   title: "Criar Novo Curso - Tutor360",
}

export default function CreateNewCoursePage() {
   return (
      <main className="tp-dashboard-body-bg">

         {/* Início da área de criação de novo curso */}
         <CreateNewCourseArea/>
         {/* Fim da área de criação de novo curso */}

      </main>
   )
}