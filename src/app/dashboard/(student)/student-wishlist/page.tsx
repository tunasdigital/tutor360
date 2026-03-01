import { Metadata } from "next";
import DashboardBanner from "@/components/dashboard/dashboard-banner";
import DashboardContentWrapper from "@/components/dashboard/dashboard-content-wrapper";
import InstructorWishlistArea from "@/components/dashboard/instructor/instructor-wishlist-area";

export const metadata: Metadata = {
    title: "Lista de Desejos - Tutor360",
}

export default function StudentWishlistPage() {
    return (
        <main className="tp-dashboard-body-bg">

            {/* Início da área do banner do dashboard (Configurado para Aluno) */}
            <DashboardBanner studentBanner={true} />
            {/* Fim da área do banner do dashboard */}

            {/* Início da área de conteúdo com sidebar lateral do Aluno */}
            <DashboardContentWrapper studentSidebar={true}>

                {/* Renderização da área de itens favoritados */}
                <InstructorWishlistArea/>

            </DashboardContentWrapper>
            {/* Fim da área de conteúdo */}

        </main>
    )
}