'use client';
import DashboardContentWrapper from "@/components/dashboard/dashboard-content-wrapper";
import InstructorDashboardFacts from "@/components/dashboard/instructor/instructor-dashboard-fact-area";

// CORREÇÃO DE ROTA: Subindo 3 níveis (../../../) para encontrar a pasta do instrutor
import InProgressCourses from "../../../(instructor)/instructor-dashboard/_components/dashboard-progress-area";
import DashboardCoursesArea from "../../../(instructor)/instructor-dashboard/_components/dashboard-courses-area";

export default function AdminDashboardArea() {
    return (
        /* O Cérebro da Operação: adminSidebar={true} invoca o Menu Exclusivo */
        <DashboardContentWrapper adminSidebar={true}>

            {/* Início da visão macro de métricas da plataforma (Curadoria e Financeiro) */}
            <InstructorDashboardFacts />
            {/* Fim da visão macro de métricas da plataforma */}

            {/* Área de acompanhamento de curadoria de cursos ativos */}
            <InProgressCourses />
            {/* Fim da área de acompanhamento */}

            {/* Tabela geral de todos os cursos do LMS sob governança do Admin */}
            <DashboardCoursesArea />
            {/* Fim da tabela geral */}

        </DashboardContentWrapper>
    )
}