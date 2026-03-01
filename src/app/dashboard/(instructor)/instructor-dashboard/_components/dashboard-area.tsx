import InProgressCourses from "./dashboard-progress-area";
import DashboardCoursesArea from "./dashboard-courses-area";
import DashboardContentWrapper from "@/components/dashboard/dashboard-content-wrapper";
import InstructorDashboardFacts from "@/components/dashboard/instructor/instructor-dashboard-fact-area";

export default function DashboardArea() {
    return (
        <DashboardContentWrapper>

            {/* Início da área de métricas do painel (fatos e números) */}
            <InstructorDashboardFacts />
            {/* Fim da área de métricas do painel */}

            {/* Área de cursos em andamento */}
            <InProgressCourses />
            {/* Área de cursos em andamento */}

            {/* Início da área da tabela de cursos do instrutor */}
            <DashboardCoursesArea />
            {/* Fim da área da tabela de cursos do instrutor */}

        </DashboardContentWrapper>
    )
}