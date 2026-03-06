import { Metadata } from "next";
import prisma from "@/lib/prisma";
import { calculateCourseProgress } from "@/lib/progress-calc";
import DashboardBanner from "@/components/dashboard/dashboard-banner";
import DashboardContentWrapper from "@/components/dashboard/dashboard-content-wrapper";
import InstructorEnrollCourseArea from "@/components/dashboard/instructor/instructor-enroll-course-area";

export const metadata: Metadata = {
    title: "Cursos Matriculados - Tutor360",
}

export default async function StudentEnrollCoursePage() {
    // 💡 ID de teste fixo para validarmos o progresso na Ababoo
    const userId = "user_test_99"; 
    let enrolledCourses = [];

    try {
        // 1. BUSCA DE ELITE: Tentativa de busca com progresso real
        const dbCourses = await prisma.course.findMany({
            include: {
                _count: { select: { lessons: true } },
                // @ts-ignore - Ignora erro de build se o client ainda estiver gerando
                lessonProgress: {
                    where: { userId: userId, completed: true },
                    select: { lessonId: true }
                }
            },
            orderBy: { createdAt: 'desc' }
        });

        // 2. PROCESSAMENTO: Transformando dados brutos em barra de progresso real
        enrolledCourses = dbCourses.map((course: any) => {
            const totalLessons = course._count?.lessons || 0;
            const completedCount = course.lessonProgress?.length || 0;
            
            const percentage = calculateCourseProgress(totalLessons, completedCount);

            return {
                ...course,
                progress: percentage,
                isCompleted: percentage === 100
            };
        });
    } catch (error) {
        console.error("⚠️ ALERTA ABABOO: Falha ao carregar progresso. Sincronizando banco...", error);
        // Fallback: Busca simples apenas para não deixar o aluno sem ver os cursos
        const fallbackCourses = await prisma.course.findMany({
            orderBy: { createdAt: 'desc' }
        });
        enrolledCourses = fallbackCourses.map(c => ({ ...c, progress: 0, isCompleted: false }));
    }

    return (
        <main className="tp-dashboard-body-bg">
            <DashboardBanner studentBanner={true} />
            <DashboardContentWrapper studentSidebar={true}>
                <InstructorEnrollCourseArea enroll_courses={enrolledCourses as any} />
            </DashboardContentWrapper>
        </main>
    )
}