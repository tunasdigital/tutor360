import { Metadata } from "next";
import DashboardBanner from "@/components/dashboard/dashboard-banner";
import AdminDashboardArea from "./_components/admin-dashboard-area";

export const metadata:Metadata = {
    title: "Painel Administrativo (Root) - Tutor360",
}

export default function AdminDashboardPage() {
  return (
    <main className="tp-dashboard-body-bg">
        
        {/* Início da área do banner do dashboard */}
        <DashboardBanner/>
        {/* Fim da área do banner do dashboard */}

        {/* Início da área de conteúdo principal do admin */}
        <AdminDashboardArea/>
        {/* Fim da área de conteúdo principal do admin */}

    </main>
  )
}