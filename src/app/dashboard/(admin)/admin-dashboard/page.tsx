import { Metadata } from "next";
// Importação do DashboardBanner foi removida estrategicamente
import AdminDashboardArea from "./_components/admin-dashboard-area";

export const metadata:Metadata = {
    title: "Painel Administrativo (Root) - Tutor360",
}

export default function AdminDashboardPage() {
  return (
    // Adicionado pt-50 para garantir que o conteúdo não fique colado no cabeçalho superior (Header) após a remoção do banner
    <main className="tp-dashboard-body-bg pt-50">

        {/* Início da área de conteúdo principal do admin - Visão Direta aos Dados */}
        <AdminDashboardArea/>
        {/* Fim da área de conteúdo principal do admin */}

    </main>
  )
}