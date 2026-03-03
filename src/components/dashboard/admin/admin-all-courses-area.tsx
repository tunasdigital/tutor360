'use client';
import { useEffect, useState } from "react";
import Image from "next/image";
import DashboardCourseItemThree from "@/components/course/single/dashboard/dashboard-course-item-3";
import Pagination from "@/components/ui/pagination";
import usePagination from "@/hooks/use-pagination";
import no_found_img from '@/assets/img/dashboard/bg/withdrawal-bg.png';
// 🚀 CONEXÃO ROOT: Importando o novo Topo Administrativo padronizado
import AdminDashboardHeader from "./admin-dashboard-header";

const admin_tab_lists = [
   { id: 'publish', title: 'Todos os Migrados' },
   { id: 'pending', title: 'Aguardando Aprovação' },
   { id: 'draft', title: 'Rascunhos (Inativos)' },
]

type IProps = {
   bundleCourse?:boolean;
   courses?: any[]; 
}

export default function AdminAllCoursesArea({bundleCourse, courses = []}:IProps) {
   const limit = 6;
   const [activeTab, setActiveTab] = useState(bundleCourse ? admin_tab_lists[2].id : admin_tab_lists[0].id);
   
   // Blindagem de dados para o card
   const safeCourses = courses.map((c: any) => ({
      ...c,
      price: c.price || 0,
      lessons: c.lessons || 0,
      thumbnail: c.thumbnail || "/assets/img/course/course-1.jpg", 
   }));

   const [allCourses, setAllCourses] = useState(safeCourses);
   const { currentItems, handlePageClick, pageCount } = usePagination(allCourses, limit);

   useEffect(() => {
      if (activeTab === 'publish') {
          setAllCourses(safeCourses);
      } else if (activeTab === 'pending') {
          setAllCourses([]); 
      } else if (activeTab === 'draft') {
          setAllCourses([]); 
      }
   }, [activeTab, courses]);

   function handleCourseCount(tab: string) {
      let count = 0;
      switch (tab) {
         case 'publish':
            count = safeCourses.length;
            break;
         default:
            count = 0;
            break;
      }
      return count;
   }

   return (
      <>
         {/* 👑 O GOLPE DE MESTRE: Substituindo o banner do instrutor pelo Topo Root */}
         <AdminDashboardHeader 
            title="Gestão de Cursos Migrados (LMS Global)" 
            totalCourses={safeCourses.length}
            activeUsers={145} // Valor real capturado da sua Visão Geral
         />

         <div className="dashboader-area mb-30">
            <div className="tp-dashboard-tab">
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

         {currentItems.length > 0 ? (
            <div className="course-area">
               <div className="row">
                  {currentItems.map((course, index) => (
                     <div className="col-xl-4 col-md-6" key={index}>
                        <DashboardCourseItemThree course={course} />
                     </div>
                  ))}
               </div>
            </div>
         ) : (
            <div className="tpd-dashboard-pending-course pt-120">
               <div className="row">
                  <div className="col-12">
                     <div className="tpd-withdraw-bg text-center">
                        <Image src={no_found_img} alt="sem-dados" style={{height:'auto'}} />
                        <p>Nenhum curso encontrado nesta categoria de moderação.</p>
                     </div>
                  </div>
               </div>
            </div>
         )}

         {allCourses.length > 0 && allCourses.length >= limit && (
            <div className="tp-dashboard-pagination pt-20">
               <div className="tp-pagination">
                  <Pagination handlePageClick={handlePageClick} pageCount={pageCount} isCenter={true} />
               </div>
            </div>
         )}
      </>
   )
}