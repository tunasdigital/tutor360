'use client';
import {RefreshSvg, SearchSvg } from "@/components/svg";
import NiceSelect from "@/components/ui/nice-select";
import usePagination from "@/hooks/use-pagination";
import Pagination from "@/components/ui/pagination";
import { formatPrice } from "@/lib/format-price";


// Dados analíticos de cursos (Matriz Nacionalizada para visualização)
const analyticsCourseData = [
   {
      id: 1,
      courseName: "Design de Produto",
      learners: 4,
      earnings: 0.00,
      rating: 1,
      lessons: 0,
      assignments: 0,
      quizzes: 1,
   },
   {
      id: 2,
      courseName: "Masterclass de Design Gráfico",
      learners: 2,
      earnings: 0.00,
      rating: 1,
      lessons: 0,
      assignments: 0,
      quizzes: 1,
   },
   {
      id: 3,
      courseName: "Design System no Figma",
      learners: 2,
      earnings: 0.00,
      rating: 1,
      lessons: 0,
      assignments: 0,
      quizzes: 1,
   },
   {
      id: 4,
      courseName: "Motion Design 3D",
      learners: 2,
      earnings: 0.00,
      rating: 1,
      lessons: 0,
      assignments: 0,
      quizzes: 1,
   },
   {
      id: 5,
      courseName: "Desenvolvimento de Apps",
      learners: 4,
      earnings: 0.00,
      rating: 1,
      lessons: 0,
      assignments: 0,
      quizzes: 1,
   },
   {
      id: 6,
      courseName: "Bootcamp de Desenvolvimento Web",
      learners: 5,
      earnings: 100.00,
      rating: 4,
      lessons: 10,
      assignments: 3,
      quizzes: 2,
   },
   {
      id: 7,
      courseName: "Fundamentos de UI/UX Design",
      learners: 3,
      earnings: 50.00,
      rating: 3,
      lessons: 8,
      assignments: 2,
      quizzes: 1,
   },
   {
      id: 8,
      courseName: "Programação Python",
      learners: 7,
      earnings: 150.00,
      rating: 5,
      lessons: 15,
      assignments: 4,
      quizzes: 3,
   },
   {
      id: 9,
      courseName: "Desenvolvimento React",
      learners: 6,
      earnings: 200.00,
      rating: 5,
      lessons: 12,
      assignments: 5,
      quizzes: 2,
   },
   {
      id: 10,
      courseName: "Marketing Digital",
      learners: 4,
      earnings: 75.00,
      rating: 3,
      lessons: 6,
      assignments: 2,
      quizzes: 1,
   },
];


export default function InstructorAnalyticsCourseArea() {
   const { currentItems, handlePageClick, pageCount } = usePagination(analyticsCourseData, 7);
   function handleCourseFilter(item: { value: string, label: string }) {
      console.log(item);
   }
   return (
      <div className="tpd-course-area">
         <div className="tpd-dashboard-filter d-flex justify-content-between align-items-center mb-30">
            <div className="tpd-dashboard-search">
               <div className="tp-header-2-search">
                  <form action="#">
                     {/* Placeholder Nacionalizado */}
                     <input type="text" placeholder="Buscar Cursos..."/>
                     <button className="tp-header-2-search-btn" type="submit">
                        <SearchSvg/>
                     </button>
                  </form>
               </div>
            </div>
            <div className="tpd-dashboard-select">
               <div className="tp-course-filter-select">
                  <NiceSelect
                     options={[
                        { value: "default", label: "Grátis" },
                        { value: "latest", label: "Mais Recentes" },
                        { value: "popularity", label: "Mais Antigos" },
                     ]}
                     defaultCurrent={0}
                     cls="wide"
                     onChange={handleCourseFilter}
                     name="courseSort"
                  />
               </div>
            </div>
         </div>

         <div className="tpd-table li-hover-none mb-25">
            <ul>
               <li className="tpd-table-head">
                  <div className="tpd-table-row">
                     {/* Cabeçalhos Traduzidos */}
                     <div className="tpd-assign-info analytic">
                        <h4 className="tpd-table-title">Nome do Curso</h4>
                     </div>
                     <div className="tpd-assign-mark analytic">
                        <h4 className="tpd-table-title">Alunos</h4>
                     </div>
                     <div className="tpd-assign-submit analytic">
                        <h4 className="tpd-table-title">Ganhos</h4>
                     </div>
                     <div className="tpd-assign-details">
                        <h4 className="tpd-table-title">Avaliação</h4>
                     </div>
                  </div>
               </li>
               {currentItems.map((course, index) => (
                  <li key={index}>
                     <div className="tpd-table-row">
                        <div className="tpd-assign-info analytic">
                           <h4 className="tpd-assign-title">{course.courseName}</h4>
                           <div className="tpd-student-info">
                              {/* Labels de detalhes traduzidas */}
                              <p>
                                 Aula: <span>{course.lessons}</span>
                              </p>
                              <p>
                                 Tarefa: <span>{course.assignments}</span>
                              </p>
                              <p>
                                 Teste: <span>{course.quizzes}</span>
                              </p>
                           </div>
                        </div>
                        <div className="tpd-assign-mark analytic">
                           <span className="tpd-common-text">{course.learners}</span>
                        </div>
                        <div className="tpd-assign-submit analytic">
                           {/* formatPrice garante a moeda correta (R$) conforme configuramos anteriormente */}
                           <h4 className="tpd-table-title">{formatPrice(course.earnings, true)}</h4>
                        </div>
                        <div className="tpd-assign-details analytic">
                           <a className="tpd-border-btn" href="#">
                              Detalhes
                           </a>
                           <button>
                              <RefreshSvg />
                           </button>
                        </div>
                     </div>
                  </li>
               ))}
            </ul>
         </div>


         <div className="tp-dashboard-pagination pt-20">
            <div className="tp-pagination">
               <Pagination handlePageClick={handlePageClick} pageCount={pageCount} isCenter={true} />
            </div>
         </div>
      </div>
   )
}