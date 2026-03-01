import { Metadata } from "next";
import DashboardBanner from "@/components/dashboard/dashboard-banner";
import DashboardContentWrapper from "@/components/dashboard/dashboard-content-wrapper";
import InstructorDashboardFacts from "@/components/dashboard/instructor/instructor-dashboard-fact-area";

export const metadata: Metadata = {
    title: "Painel do Aluno - Tutor360",
}

export default function StudentDashboardPage() {
    return (
        <main className="tp-dashboard-body-bg">

            {/* Início da área do banner do dashboard */}
            <DashboardBanner studentBanner={true} />
            {/* Fim da área do banner do dashboard */}

            {/* Início da área de conteúdo com sidebar lateral do aluno */}
            <DashboardContentWrapper studentSidebar={true}>

                {/* Início da área de estatísticas (Cards de resumo) */}
                <InstructorDashboardFacts />
                {/* Fim da área de estatísticas */}

            </DashboardContentWrapper>
            {/* Fim da área de conteúdo */}

        </main>
    )
}