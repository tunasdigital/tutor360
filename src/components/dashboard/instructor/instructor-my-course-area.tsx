'use client';
import { useEffect, useState } from "react";
import Image from "next/image";
import DashboardCourseItemThree from "@/components/course/single/dashboard/dashboard-course-item-3";
import Pagination from "@/components/ui/pagination";
import { online_courses_data } from "@/data/course-data";
import usePagination from "@/hooks/use-pagination";
import no_found_img from '@/assets/img/dashboard/bg/withdrawal-bg.png';

// Garimpo de Status: Tradução das abas visíveis
const tab_lists = [
   { id: 'publish', title: 'Publicados' },
   { id: 'pending', title: 'Pendentes' },
   { id: 'draft', title: 'Rascunhos' },
]

type IProps = {
   bundleCourse?:boolean;
}
export default function InstructorMyCourseArea({bundleCourse}:IProps) {
   const limit = 6
   const [activeTab, setActiveTab] = useState(bundleCourse ? tab_lists[2].id : tab_lists[0].id);
   const [myCourses, setMyCourses] = useState([...online_courses_data]);
   const { currentItems, handlePageClick, pageCount } = usePagination(myCourses, limit);

   useEffect(() => {
      if (activeTab === 'publish') {
         setMyCourses([...online_courses_data]);
      } else if (activeTab === 'pending') {
         setMyCourses([]);
      } else if (activeTab === 'draft') {
         setMyCourses([...online_courses_data].slice(3, 6));
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
         {/* Início da área de abas do dashboard */}
         <div className="dashboader-area mb-30">
            <div className="tp-dashboard-tab">
               {/* Nacionalização do título */}
               <h2 className="tp-dashboard-tab-title">Meus Cursos</h2>
               <div className="tp-dashboard-tab-list">
                  <ul>
                     {tab_lists.map((tab) => (
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


         {/* Início da área de listagem de cursos */}
         {currentItems.length > 0 ? <div className="course-area">
            <div className="row">
               {currentItems.map((course, index) => (
                  <div className="col-xl-4 col-md-6" key={index}>
                     <DashboardCourseItemThree course={course} />
                  </div>
               ))}
            </div>
         </div> : <div className="tpd-dashboard-pending-course pt-120">
            <div className="row">
               <div className="col-12">
                  <div className="tpd-withdraw-bg text-center">
                     <Image src={no_found_img} alt="sem-dados" style={{height:'auto'}} />
                     {/* Tradução da mensagem de "lista vazia" */}
                     <p>Nenhum dado disponível nesta seção</p>
                  </div>
               </div>
            </div>
         </div>}
         {/* Fim da área de listagem de cursos */}

         {/* Início da área de paginação */}
         {myCourses.length > 0 && myCourses.length >= limit && (
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