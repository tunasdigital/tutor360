'use client';
import { useEffect, useState } from "react";
import usePagination from "@/hooks/use-pagination";
import Pagination from "@/components/ui/pagination";
import { online_courses_data } from "@/data/course-data";
import DashboardEnrollCourseItem from "@/components/course/single/dashboard/dashboard-enroll-course-item";

// Garimpo das abas: Tradução dos status dos cursos para o aluno
const tab_lists = [
   { id: 'enroll', title: 'Cursos Inscritos' },
   { id: 'active-course', title: 'Cursos Ativos' },
   { id: 'completed', title: 'Cursos Concluídos' },
]

export default function InstructorEnrollCourseArea() {
   const limit = 5;
   const [activeTab, setActiveTab] = useState(tab_lists[0].id);
   const [enrollCourses, setEnrollCourses] = useState([...online_courses_data]);
   const { currentItems, handlePageClick, pageCount } = usePagination(enrollCourses, limit);

   useEffect(() => {
      if (activeTab === 'enroll') {
         setEnrollCourses([...online_courses_data]);
      } else if (activeTab === 'active-course') {
         setEnrollCourses([...online_courses_data].slice(0, 3));
      } else if (activeTab === 'completed') {
         setEnrollCourses([...online_courses_data].slice(3, 6));
      }
   }, [activeTab]);

   function handleCourseCount(tab: string) {
      let count = 0;
      switch (tab) {
         case 'enroll':
            count = [...online_courses_data].length;
            break;
         case 'active-course':
            count = [...online_courses_data].slice(0, 3).length;
            break;
         case 'completed':
            count = [...online_courses_data].slice(3, 6).length;
            break;
      }
      return count;
   }

   return (
      <>
         {/* Início da área de abas do curso */}
         <div className="dashboader-area mb-30">
            <div className="tp-dashboard-tab">
               <h2 className="tp-dashboard-tab-title">Cursos Matriculados</h2>
               <div className="tp-dashboard-tab-list">
                  <ul>
                     {tab_lists.map((tab, index) => (
                        <li key={index}>
                           <a className={`${activeTab === tab.id ? 'active' : ''} pointer`} onClick={() => setActiveTab(tab.id)} >
                              {tab.title} <span>({handleCourseCount(tab.id)})</span>
                           </a>
                        </li>
                     ))}
                  </ul>
               </div>
            </div>
         </div>
         {/* Fim da área de abas */}

         {/* Início da área de listagem de cursos */}
         <div className="course-area">
            <div className="row">
               {currentItems.map((course, index) => (
                  <div className="col-xl-4 col-md-6" key={index}>
                     <DashboardEnrollCourseItem course={course} />
                  </div>
               ))}
            </div>
         </div>
         {/* Fim da área de listagem */}

         {/* Início da área de paginação */}
         {enrollCourses.length > 0 && enrollCourses.length >= limit && (
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