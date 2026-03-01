import { Metadata } from "next";
import DashboardBanner from "@/components/dashboard/dashboard-banner";
import DashboardContentWrapper from "@/components/dashboard/dashboard-content-wrapper";
import InstructorProfileArea from "@/components/dashboard/instructor/instructor-profile-area";

export const metadata: Metadata = {
    title: "Meu Perfil - Tutor360",
}

export default function StudentDashboardProfilePage() {
    return (
        <main className="tp-dashboard-body-bg">

            {/* Início da área do banner do dashboard (Configurado como Aluno) */}
            <DashboardBanner studentBanner={true} />
            {/* Fim da área do banner do dashboard */}

            {/* Início da área de conteúdo com sidebar lateral do Aluno */}
            <DashboardContentWrapper studentSidebar={true}>

                {/* Área de informações do perfil - Note que o sistema reutiliza o componente de instrutor */}
                <InstructorProfileArea />

            </DashboardContentWrapper>
            {/* Fim da área de conteúdo */}

        </main>
    )
}