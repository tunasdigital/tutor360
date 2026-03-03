'use client';
import { useEffect, useState } from "react";
import Image from "next/image";
import DashboardCourseItemThree from "@/components/course/single/dashboard/dashboard-course-item-3";
import Pagination from "@/components/ui/pagination";
import usePagination from "@/hooks/use-pagination";
import no_found_img from '@/assets/img/dashboard/bg/withdrawal-bg.png';

// Abas de curadoria do Admin
const admin_tab_lists = [
   { id: 'publish', title: 'Todos os Migrados' }, // Ajustei o título para fazer mais sentido agora
   { id: 'pending', title: 'Aguardando Aprovação' },
   { id: 'draft', title: 'Rascunhos (Inativos)' },
]

type IProps = {
   bundleCourse?:boolean;
   courses?: any[]; // TÁTICA DE MESTRE: A porta de entrada dos dados do Servidor
}

export default function AdminAllCoursesArea({bundleCourse, courses = []}:IProps) {
   const limit = 6;
   const [activeTab, setActiveTab] = useState(bundleCourse ? admin_tab_lists[2].id : admin_tab_lists[0].id);
   
   // 1. BLINDAGEM VISUAL: Garantimos que o card do Admin tenha as propriedades básicas para não quebrar
   const safeCourses = courses.map((c: any) => ({
      ...c,
      price: c.price || 0,
      lessons: c._count?.lessons || 0, // A mágica da contagem vinda do Prisma
      thumbnail: c.thumbnail || "/assets/img/course/course-1.jpg", 
   }));

   // 2. Iniciamos o estado com os cursos blindados
   const [allCourses, setAllCourses] = useState(safeCourses);
   const { currentItems, handlePageClick, pageCount } = usePagination(allCourses, limit);

   useEffect(() => {
      // Como migramos tudo de uma vez, consideramos todos como "publish" na vitrine do Admin por enquanto
      if (activeTab === 'publish') {
         setAllCourses(safeCourses);
      } else if (activeTab === 'pending') {
         setAllCourses([]); // Cursos pendentes (Futuro)
      } else if (activeTab === 'draft') {
         setAllCourses([]); // Cursos bloqueados (Futuro)
      }
   }, [activeTab, courses]); // React re-renderiza se os cursos chegarem atrasados

   function handleCourseCount(tab: string) {
      let count = 0;
      switch (tab) {
         case 'publish':
            count = safeCourses.length;
            break;
         case 'pending':
            count = 0;
            break;
         case 'draft':
            count = 0;
            break;
      }
      return count;
   }

   return (
      <>
         {/* Início da área de abas do dashboard do Admin */}
         <div className="dashboader-area mb-30">
            <div className="tp-dashboard-tab">
               <h2 className="tp-dashboard-tab-title">Gestão de Cursos Migrados (LMS Global)</h2>
               <div className="tp-dashboard-tab-list">
                  <ul>
                     {admin_tab_lists.map((tab) => (
                        <li key={tab.id}>
                           <a
                              onClick={() => setActiveTab(tab.id)}
                              className={`${activeTab === tab.id ? 'active' : ''} pointer`}
                           >
                              {tab.title} <span>({handleCourseCount(tab.id)})</span>
                           </a>
                        </li>
                     ))}
                  </ul>
               </div>
            </div>
         </div>
         {/* Fim da área de abas do dashboard */}

         {/* Início da área de listagem de cursos globais */}
         {currentItems.length > 0 ? <div className="course-area">
            <div className="row">
               {currentItems.map((course, index) => (
                  <div className="col-xl-4 col-md-6" key={index}>
                     {/* O card que antes lia o Mock agora lê a variável course turbinada pelo Prisma */}
                     <DashboardCourseItemThree course={course} />
                  </div>
               ))}
            </div>
         </div> : <div className="tpd-dashboard-pending-course pt-120">
            <div className="row">
               <div className="col-12">
                  <div className="tpd-withdraw-bg text-center">
                     <Image src={no_found_img} alt="sem-dados" style={{height:'auto'}} />
                     <p>Nenhum curso encontrado nesta categoria de moderação.</p>
                  </div>
               </div>
            </div>
         </div>}
         {/* Fim da área de listagem de cursos */}

         {/* Início da área de paginação */}
         {allCourses.length > 0 && allCourses.length >= limit && (
            <div className="tp-dashboard-pagination pt-20">
               <div className="tp-pagination">
                  <Pagination handlePageClick={handlePageClick} pageCount={pageCount} isCenter={true} />
               </div>
            </div>
         )}
         {/* Fim da área de paginação */}
      </>
   )
}