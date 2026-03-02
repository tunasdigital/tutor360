import { Metadata } from "next";
import DashboardContentWrapper from "@/components/dashboard/dashboard-content-wrapper";
import AdminAnalyticsArea from "@/components/dashboard/admin/admin-analytics-area";

export const metadata: Metadata = {
    title: "Análise de Plataforma (Root) - Tutor360",
};

export default function AdminAnalyticsPage() {
    return (
        <main className="tp-dashboard-body-bg pt-50">
            <DashboardContentWrapper adminSidebar={true}>
                <AdminAnalyticsArea />
            </DashboardContentWrapper>
        </main>
    );
}