import { Metadata } from "next";
import DashboardBanner from "@/components/dashboard/dashboard-banner";
import DashboardContentWrapper from "@/components/dashboard/dashboard-content-wrapper";
import InstructorEnrollCourseArea from "@/components/dashboard/instructor/instructor-enroll-course-area";

export const metadata: Metadata = {
    title: "Cursos Matriculados - Tutor360",
}

export default function StudentEnrollCoursePage() {
    return (
        <main className="tp-dashboard-body-bg">

            {/* Início da área do banner do dashboard (Configurado para Aluno) */}
            <DashboardBanner studentBanner={true} />
            {/* Fim da área do banner do dashboard */}

            {/* Início da área de conteúdo com sidebar lateral do Aluno */}
            <DashboardContentWrapper studentSidebar={true}>

                {/* Área que renderiza a lista de cursos em que o aluno está inscrito */}
                <InstructorEnrollCourseArea/>

            </DashboardContentWrapper>
            {/* Fim da área de conteúdo */}

        </main>
    )
}