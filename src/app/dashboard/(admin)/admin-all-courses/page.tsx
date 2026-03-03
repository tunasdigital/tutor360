import { Metadata } from "next";
import prisma from "@/lib/prisma"; 
// 🚫 REMOVIDO: DashboardBanner (Ele que está gerando a foto do instrutor lá no topo)
import DashboardContentWrapper from "@/components/dashboard/dashboard-content-wrapper";
import AdminAllCoursesArea from "@/components/dashboard/admin/admin-all-courses-area";

export const metadata: Metadata = {
  title: "Gestão de Cursos (Curadoria) - Tutor360",
}

export default async function AdminAllCoursesPage() {
  
  // 1. BUSCA DE ELITE (ADMIN): Mantendo a triagem dos 39 cursos reais
  const dbCourses = await prisma.course.findMany({
    where: {
      lessons: { some: {} },
      NOT: [
        { title: { contains: "Breve" } },
        { title: { contains: "Em breve" } },
        { title: { contains: "Demo" } },
        { title: { contains: "Seed" } }
      ]
    },
    include: {
      _count: { select: { lessons: true } },
      lessons: {
        select: { title: true }, 
        take: 3,                 
        orderBy: { order: 'asc' } 
      }
    },
    orderBy: { createdAt: 'desc' }
  });

  // 2. ADAPTADOR DO RADAR
  const coursesWithRadar = dbCourses.map(course => ({
    ...course,
    lessons: course._count.lessons,
    radarLessons: course.lessons 
  }));

  return (
    <main className="tp-dashboard-body-bg">
        {/* 🚀 MANOBRA DE LIMPEZA: 
           Removi o DashboardBanner daqui. 
           Agora o topo será apenas o AdminDashboardHeader que está dentro da Area.
        */}

        <DashboardContentWrapper adminSidebar={true}>
           <AdminAllCoursesArea courses={coursesWithRadar as any} />
        </DashboardContentWrapper>
    </main>
  )
}