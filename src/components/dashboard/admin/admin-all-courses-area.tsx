'use client';
import { useEffect, useState } from "react";
import Image from "next/image";
import DashboardCourseItemThree from "@/components/course/single/dashboard/dashboard-course-item-3";
import Pagination from "@/components/ui/pagination";
import { online_courses_data } from "@/data/course-data"; // Futuramente será trocado por uma API Call que busca TODOS os cursos
import usePagination from "@/hooks/use-pagination";
import no_found_img from '@/assets/img/dashboard/bg/withdrawal-bg.png';

// Abas de curadoria do Admin
const admin_tab_lists = [
   { id: 'publish', title: 'Ativos' },
   { id: 'pending', title: 'Aguardando Aprovação' },
   { id: 'draft', title: 'Rascunhos (Inativos)' },
]

type IProps = {
   bundleCourse?:boolean;
}
export default function AdminAllCoursesArea({bundleCourse}:IProps) {
   const limit = 6
   const [activeTab, setActiveTab] = useState(bundleCourse ? admin_tab_lists[2].id : admin_tab_lists[0].id);
   const [allCourses, setAllCourses] = useState([...online_courses_data]);
   const { currentItems, handlePageClick, pageCount } = usePagination(allCourses, limit);

   useEffect(() => {
      // Lógica de filtragem simulada para o Admin
      if (activeTab === 'publish') {
         setAllCourses([...online_courses_data]);
      } else if (activeTab === 'pending') {
         setAllCourses([]); // Cursos pendentes de revisão da moderação
      } else if (activeTab === 'draft') {
         setAllCourses([...online_courses_data].slice(3, 6)); // Cursos bloqueados ou inativos
      }
   }, [activeTab]);

   function handleCourseCount(tab: string) {
      let count = 0;
      switch (tab) {
         case 'publish':
            count = [...online_courses_data].length;
            break;
         case 'pending':
            count = [].length;
            break;
         case 'draft':
            count = [...online_courses_data].slice(3, 6).length;
            break;
      }
      return count;
   }
   return (
      <>
         {/* Início da área de abas do dashboard do Admin */}
         <div className="dashboader-area mb-30">
            <div className="tp-dashboard-tab">
               {/* Título macro focado na gestão */}
               <h2 className="tp-dashboard-tab-title">Gestão de Cursos (LMS Global)</h2>
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
                     {/* Este componente renderiza o card do curso. Se houver ações de "Aprovar/Bloquear", elas serão inseridas aqui no futuro */}
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