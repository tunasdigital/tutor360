import { Metadata } from "next";
import prisma from "@/lib/prisma"; // TÁTICA DE MESTRE: Importando o Motor do Banco
import DashboardBanner from "@/components/dashboard/dashboard-banner";
import DashboardContentWrapper from "@/components/dashboard/dashboard-content-wrapper";
// Substituição: Importando a engrenagem definitiva do God Mode
import AdminAllCoursesArea from "@/components/dashboard/admin/admin-all-courses-area";

export const metadata: Metadata = {
    title: "Todos os Cursos (Curadoria) - Tutor360",
}

// 1. Transformamos a página em async para poder conversar com o banco
export default async function AdminAllCoursesPage() {
  
  // 2. BUSCA DE ELITE (ADMIN): Traz os cursos, conta as aulas e aciona a ANTENA DO RADAR
  const dbCourses = await prisma.course.findMany({
    include: {
      _count: {
        select: { lessons: true } 
      },
      // 📡 A MÁGICA DO RADAR: Prisma, me dê apenas as 3 primeiras aulas!
      lessons: {
        select: { title: true }, // Não preciso do link do vídeo, só do nome para ler
        take: 3,                 // Pega só as 3 primeiras para não poluir a tela
        orderBy: { order: 'asc' } // Garante que pegue a Aula 1, 2 e 3 na sequência
      }
    },
    orderBy: {
      createdAt: 'desc' // Mostra os cursos recém-migrados no topo da lista
    }
  });

  // 3. ADAPTADOR DO RADAR: Passa o nome "lessons" do banco para "radarLessons" do componente visual
  const coursesWithRadar = dbCourses.map(course => ({
    ...course,
    radarLessons: course.lessons // Injeta as 3 aulas no Raio-X do card
  }));

  return (
    <main className="tp-dashboard-body-bg">
        
        {/* Início da área do banner global do dashboard */}
        <DashboardBanner/>
        {/* Fim da área do banner global do dashboard */}

        {/* Início da área de conteúdo principal do admin com a Sidebar Root ativada */}
        <DashboardContentWrapper adminSidebar={true}>
           
           {/* 4. LIGANDO A CHAVE: Injetando os 38 cursos reais + O Raio-X dentro da Tabela. */}
           <AdminAllCoursesArea courses={coursesWithRadar as any} />
           
        </DashboardContentWrapper>
        {/* Fim da área de conteúdo principal do admin */}

    </main>
  )
}