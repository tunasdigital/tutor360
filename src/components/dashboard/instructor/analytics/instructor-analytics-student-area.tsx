'use client';
import { CalenderThreeSvg, CheckTwoSvg, DeleteSvg, DotsTwoSvg, EmailFour, SearchSvg } from "@/components/svg";
import DatePicker from "@/components/ui/date-picker";
import useClickOutside from "@/hooks/use-click-outside";
import Image from "next/image";
import { useState } from "react";

// Dados de Perguntas e Respostas (Q&A) nacionalizados - Tutor360
const studentQaData = [
   {
      id: 1,
      student: {
         name: "Hanson Deck",
         date: "11 de Junho de 2021 às 06:01",
         profileImg: "/assets/img/dashboard/profile/reviews-profile-1.png"
      },
      question: "Olá! Você poderia explicar a última aula?",
      course: "Novo Curso",
      replies: 2,
      status: "pending",
      statusIcon: <CheckTwoSvg />,
   },
   {
      id: 2,
      student: {
         name: "Indigo Violet",
         date: "12 de Junho de 2021 às 14:15",
         profileImg: "/assets/img/dashboard/profile/reviews-profile-2.png"
      },
      question: "Estou tendo dificuldades com a tarefa proposta.",
      course: "Matemática Avançada",
      replies: 3,
      status: "complete",
      statusIcon: <CheckTwoSvg />,
   },
];

export default function InstructorAnalyticsStudentArea() {
   const [date, setDate] = useState(new Date());
   const [openActionId, setOpenActionId] = useState<number | null>(null);
   const actionButtonRef = useClickOutside(setOpenActionId);

   function toggleAction(id: number) {
      if (openActionId === id) {
         setOpenActionId(null);
      } else {
         setOpenActionId(id);
      }
   }

   return (
      <>
         <div className="row">
            <div className="col-lg-6">
               <div className="tpd-dashboard-search">
                  <div className="tp-header-2-search">
                     <form action="#">
                        {/* Placeholder Nacionalizado */}
                        <input type="text" placeholder="Buscar Cursos..." />
                        <button className="tp-header-2-search-btn" type="submit">
                           <span>
                              <SearchSvg />
                           </span>
                        </button>
                     </form>
                  </div>
               </div>
            </div>
            <div className="col-lg-6">
               <div className="tpd-order-date-input text-lg-end mb-30">
                  <form action="#">
                     <DatePicker date={date} setDate={setDate} />
                     <span><CalenderThreeSvg /></span>
                  </form>
               </div>
            </div>
         </div>


         <div className="row">
            <div className="col-lg-12">
               <div className="tpd-table mb-45">
                  <ul>
                     <li className="tpd-table-head">
                        <div className="tpd-table-row">
                           {/* Cabeçalhos Traduzidos */}
                           <div className="tpd-instructor-qa-student">
                              <h4 className="tpd-table-title">Aluno</h4>
                           </div>
                           <div className="tpd-instructor-qa-question">
                              <h4 className="tpd-table-title">Pergunta</h4>
                           </div>
                           <div className="tpd-instructor-qa-reply">
                              <h4 className="tpd-table-title">Respostas</h4>
                           </div>
                           <div className="tpd-instructor-qa-status">
                              <h4 className="tpd-table-title">Status</h4>
                           </div>
                           <div className="tpd-instructor-qa-btn"></div>
                           <div className="tpd-instructor-qa-action"></div>
                        </div>
                     </li>

                     {studentQaData.map((item, index) => (
                        <li key={index}>
                           <div className="tpd-table-row">
                              <div className="tpd-instructor-qa-student">
                                 <div className="tpd-reviews-profile d-flex align-items-center">
                                    <div className="tpd-reviews-thumb">
                                       <Image src={item.student.profileImg} alt={item.student.name} width={38} height={38} />
                                    </div>
                                    <div className="tpd-reviews-text">
                                       <h4 className="tpd-reviews-thumb-title">{item.student.name}</h4>
                                       <span className="tpd-common-date">{item.student.date}</span>
                                    </div>
                                 </div>
                              </div>
                              <div className="tpd-instructor-qa-question">
                                 <h4 className="tpd-common-text">{item.question}</h4>
                                 <div className="tpd-course-wrap">
                                    <span className="tpd-course-name">Curso:</span>
                                    <span className="tpd-course-title">{item.course}</span>
                                 </div>
                              </div>
                              <div className="tpd-instructor-qa-reply">
                                 <h4 className="tpd-common-text">{item.replies}</h4>
                              </div>
                              <div className="tpd-instructor-qa-status">
                                 <div className={`tpd-status${item.status === "complete" ? "-complete" : ""}`}>
                                    <button>{item.statusIcon}</button>
                                 </div>
                              </div>
                              <div className="tpd-instructor-qa-btn">
                                 <a className="tpd-border-btn" href="#">Detalhes</a>
                              </div>
                              <div className="tpd-instructor-qa-action" ref={actionButtonRef}>
                                 <div className={`tpd-action-inexact-btn ${openActionId === item.id ? 'active' : ''}`}>
                                    <button className="click" onClick={() => toggleAction(item.id)}>
                                       <DotsTwoSvg />
                                    </button>
                                    <div className="tpd-action-click-tooltip">
                                       {/* Menus de ação traduzidos */}
                                       <button>
                                          <span>
                                             <EmailFour />
                                          </span>
                                          Marcar como não lida
                                       </button>
                                       <button>
                                          <span>
                                             <DeleteSvg />
                                          </span>
                                          Excluir
                                       </button>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </li>
                     ))}
                  </ul>
               </div>
            </div>
         </div>
      </>
   )
}