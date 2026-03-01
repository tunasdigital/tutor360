'use client';
import Link from "next/link";
import SectionArea from "./section-area";
import Pagination from "@/components/ui/pagination";
import usePagination from "@/hooks/use-pagination";

// Dados de exemplo garimpados e traduzidos
const assignmentData = [
   {
      id: 1,
      name: "O que é Design Thinking",
      course: "Design Gráfico",
      totalMarks: 2,
      totalSubmit: 1,
      detailsLink: "#",
   },
   {
      id: 2,
      name: "Sistema de Web Design no Figma",
      course: "Design Gráfico",
      totalMarks: 2,
      totalSubmit: 1,
      detailsLink: "#",
   },
   {
      id: 3,
      name: "Tarefa 02",
      course: "Design Gráfico",
      totalMarks: 2,
      totalSubmit: 1,
      detailsLink: "#",
   },
   {
      id: 4,
      name: "Tarefa 03",
      course: "Design Gráfico",
      totalMarks: 2,
      totalSubmit: 1,
      detailsLink: "#",
   },
   {
      id: 5,
      name: "Introdução ao JavaScript",
      course: "Desenvolvimento Web",
      totalMarks: 20,
      totalSubmit: 18,
      detailsLink: "#",
   },
   {
      id: 6,
      name: "Web Design Responsivo",
      course: "Desenvolvimento Front-End",
      totalMarks: 12,
      totalSubmit: 9,
      detailsLink: "#",
   },
   {
      id: 7,
      name: "Métodos de Pesquisa de Usuário",
      course: "Design UX",
      totalMarks: 8,
      totalSubmit: 7,
      detailsLink: "#",
   },
];

export default function InstructorAssignmentArea() {
   const { currentItems, handlePageClick, pageCount } = usePagination(assignmentData, 5);
   return (
      <>
         {/* Início da área da seção traduzida */}
         <SectionArea title="Tarefas" />
         {/* Fim da área da seção */}

         {/* Início da área de atribuições */}
         <div className="tpd-course-area">
            <div className="row">
               <div className="col-12">
                  <div className="tpd-table li-hover-none mb-25">
                     <ul>
                        <li className="tpd-table-head">
                           <div className="tpd-table-row">
                              <div className="tpd-assign-info">
                                 <h4 className="tpd-table-title">Nome da Tarefa</h4>
                              </div>
                              <div className="tpd-assign-mark">
                                 <h4 className="tpd-table-title">Nota Total</h4>
                              </div>
                              <div className="tpd-assign-submit">
                                 <h4 className="tpd-table-title">Total de Envios</h4>
                              </div>
                              <div className="tpd-assign-details">
                                 <h4 className="tpd-table-title">Detalhes</h4>
                              </div>
                           </div>
                        </li>

                        {currentItems.map((assignment, index) => (
                           <li key={index}>
                              <div className="tpd-table-row">
                                 <div className="tpd-assign-info">
                                    <h4 className="tpd-assign-title">{assignment.name}</h4>
                                    <div className="tpd-student-info">
                                       <p>
                                          Curso: <span>{assignment.course}</span>
                                       </p>
                                    </div>
                                 </div>
                                 <div className="tpd-assign-mark">
                                    <span className="tpd-common-text">{assignment.totalMarks}</span>
                                 </div>
                                 <div className="tpd-assign-submit">
                                    <h4 className="tpd-table-title">{assignment.totalSubmit}</h4>
                                 </div>
                                 <div className="tpd-assign-details">
                                    <Link className="tpd-border-btn" href={assignment.detailsLink}>
                                       Detalhes
                                    </Link>
                                 </div>
                              </div>
                           </li>
                        ))}
                     </ul>
                  </div>
               </div>
            </div>
         </div>
         {/* Fim da área de atribuições */}


         {/* Início da área de paginação */}
         <div className="tp-dashboard-pagination pt-20">
            <div className="tp-pagination">
               <Pagination handlePageClick={handlePageClick} pageCount={pageCount} isCenter={true} />
            </div>
         </div>
         {/* Fim da área de paginação */}
      </>
   );
}