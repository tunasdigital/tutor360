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
               {currentItems.map((course, index) => {
                  
                  // 🔥 TÁTICA DE CHOQUE (GOD MODE): Forçando o 1º curso a ficar 100% concluído para a apresentação
                  const isFirstCourse = index === 0 && activeTab === 'enroll';
                  const displayCourse = isFirstCourse ? { ...course, progress: 100, isCompleted: true } : course;

                  return (
                     <div className="col-xl-4 col-md-6 mb-20" key={index}>
                        {/* Renderiza o card do curso (se ele ler "progress", já vai renderizar cheio) */}
                        <DashboardEnrollCourseItem course={displayCourse} />
                        
                        {/* Botão injetado magicamente no primeiro curso para o Gran Finale */}
                        {isFirstCourse && (
                           <div className="text-center mt-10 p-3 rounded-3" style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0' }}>
                              <p className="text-success mb-2" style={{ fontSize: '13px', fontWeight: 'bold' }}>
                                 <i className="fa-solid fa-circle-check" style={{ marginRight: '5px' }}></i> 
                                 Parabéns! Você concluiu 100%
                              </p>
                              <a 
                                 href="/assets/img/dashboard/bg/certificate.png" 
                                 target="_blank" 
                                 className="tp-btn w-100" 
                                 style={{ backgroundColor: '#10B981', border: 'none', borderRadius: '5px', padding: '8px 0', fontSize: '14px' }}
                              >
                                 <i className="fa-solid fa-award" style={{ marginRight: '8px' }}></i> 
                                 Emitir Certificado
                              </a>
                           </div>
                        )}
                     </div>
                  )
               })}
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