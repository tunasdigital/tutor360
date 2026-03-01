import { Metadata } from "next";
import DashboardBanner from "@/components/dashboard/dashboard-banner";
import DashboardContentWrapper from "@/components/dashboard/dashboard-content-wrapper";
// Substituição: Importando a engrenagem definitiva do God Mode
import AdminAllCoursesArea from "@/components/dashboard/admin/admin-all-courses-area";

export const metadata: Metadata = {
    title: "Todos os Cursos (Curadoria) - Tutor360",
}

export default function AdminAllCoursesPage() {
  return (
    <main className="tp-dashboard-body-bg">
        
        {/* Início da área do banner global do dashboard */}
        <DashboardBanner/>
        {/* Fim da área do banner global do dashboard */}

        {/* Início da área de conteúdo principal do admin com a Sidebar Root ativada */}
        <DashboardContentWrapper adminSidebar={true}>
           {/* Injeção definitiva da área de curadoria de cursos do Admin */}
           <AdminAllCoursesArea/>
        </DashboardContentWrapper>
        {/* Fim da área de conteúdo principal do admin */}

    </main>
  )
}