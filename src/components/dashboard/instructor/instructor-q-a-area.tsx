'use client';
import Image from "next/image";
import { useState } from "react";
import { CheckTwoSvg, DeleteSvg, DotsTwoSvg, EmailFour } from "@/components/svg";
import NiceSelect from "@/components/ui/nice-select";
import useClickOutside from "@/hooks/use-click-outside";

// Dados de Perguntas de Alunos (Traduzidos para 2026)
const studentQaData = [
   {
      id: 1,
      student: {
         name: "Hanson Deck",
         date: "11 de Junho, 2026 às 06:01",
         profileImg: "/assets/img/dashboard/profile/reviews-profile-1.png"
      },
      question: "Olá! Você poderia explicar a última aula?",
      course: "Novo Curso",
      replies: 2,
      status: "pending",
   },
   {
      id: 2,
      student: {
         name: "Indigo Violet",
         date: "12 de Junho, 2026 às 14:15",
         profileImg: "/assets/img/dashboard/profile/reviews-profile-2.png"
      },
      question: "Estou com dificuldades na tarefa.",
      course: "Matemática Avançada",
      replies: 3,
      status: "complete",
   },
];
// Dados de Perguntas do Instrutor (Traduzidos para 2026)
const instructorQaData = [
   {
      id: 1,
      student: {
         name: "Hanson Deck",
         date: "11 de Junho, 2026 às 06:01",
         profileImg: "/assets/img/dashboard/profile/reviews-profile-1.png"
      },
      question: "Olá! Você poderia explicar a última aula?",
      course: "Novo Curso",
      replies: 2,
      status: "pending",
   },
   {
      id: 2,
      student: {
         name: "Indigo Violet",
         date: "12 de Junho, 2026 às 14:15",
         profileImg: "/assets/img/dashboard/profile/reviews-profile-2.png"
      },
      question: "Estou com dificuldades na tarefa.",
      course: "Matemática Avançada",
      replies: 3,
      status: "complete",
   },
   {
      id: 3,
      student: {
         name: "Benjamin Evalent",
         date: "13 de Junho, 2026 às 09:45",
         profileImg: "/assets/img/dashboard/profile/reviews-profile-3.png"
      },
      question: "Pode esclarecer os requisitos do projeto?",
      course: "Física 101",
      replies: 1,
      status: "pending",
   },
   {
      id: 4,
      student: {
         name: "Jennifer Lang",
         date: "14 de Junho, 2026 às 08:30",
         profileImg: "/assets/img/dashboard/profile/reviews-profile-4.png"
      },
      question: "Qual é a data de entrega do projeto final?",
      course: "História da Arte",
      replies: 5,
      status: "complete",
   },
   {
      id: 5,
      student: {
         name: "Michael Lee",
         date: "15 de Junho, 2026 às 15:20",
         profileImg: "/assets/img/dashboard/profile/reviews-profile-2.png"
      },
      question: "Existe alguma pontuação extra disponível?",
      course: "Fundamentos de Química",
      replies: 0,
      status: "pending",
   },
   {
      id: 6,
      student: {
         name: "Sophia Blake",
         date: "16 de Junho, 2026 às 17:00",
         profileImg: "/assets/img/dashboard/profile/reviews-profile-1.png"
      },
      question: "Pode revisar minha redação antes do envio?",
      course: "Literatura Inglesa",
      replies: 4,
      status: "complete",
   },
   {
      id: 7,
      student: {
         name: "David Kim",
         date: "17 de Junho, 2026 às 12:00",
         profileImg: "/assets/img/dashboard/profile/reviews-profile-4.png"
      },
      question: "Estou com problemas para entender o último capítulo.",
      course: "Economia",
      replies: 2,
      status: "pending",
   },
   {
      id: 8,
      student: {
         name: "Rachel Green",
         date: "18 de Junho, 2026 às 10:15",
         profileImg: "/assets/img/dashboard/profile/reviews-profile-3.png"
      },
      question: "Quais materiais você recomenda para a prova?",
      course: "Administração de Empresas",
      replies: 3,
      status: "complete",
   }
];
// Tradução das Abas
const tabs = ["Aluno", "Instrutor"];

export default function InstructorQuestionAnswerArea() {
   const [activeTab, setActiveTab] = useState(tabs[0]);
   const question_answer_data = activeTab === "Aluno" ? studentQaData : instructorQaData;


   function handleFilter(item: { value: string, label: string }) {
      console.log(item);
   }


   return (
      <>
         <section className="tpd-order-area">
            <div className="row">
               <div className="col-lg-6">
                  <div className="tp-dashboard-section">
                     {/* Tradução do Título da Seção */}
                     <h2 className="tp-dashboard-title">Perguntas & Respostas</h2>
                  </div>
               </div>
               <div className="col-lg-12">
                  <div className="row">
                     <div className="col-lg-6">
                        <div className="tpd-dashboard-qa-tab mb-30">
                           <div className="nav nav-tabs tpd-dashboard-qa-tab-bg" id="myTab" role="tablist">
                              {tabs.map((tab) => (
                                 <button onClick={() => setActiveTab(tab)} key={tab} className={`nav-link ${activeTab === tab ? 'active' : ''} ${tab === 'Aluno' ? 'monthly' : 'yearly'}`}>{tab}</button>
                              ))}
                              <div className="test"></div>
                           </div>
                        </div>
                     </div>
                     <div className="col-lg-6">
                        <div className="tpd-dashboard-qa-select mb-30">
                           <div className="tp-course-filter-select">
                              {/* Tradução do Filtro Select */}
                              <NiceSelect
                                 options={[{ value: '1', label: 'Gratuito' }, { value: '2', label: 'Mais Recentes' }, { value: '3', label: 'Mais Antigos' }]}
                                 defaultCurrent={0}
                                 cls="wide"
                                 placeholder="Padrão"
                                 onChange={handleFilter}
                                 name="filter"
                              />
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div className="row">
               <div className="col-12">
                  <div className="tab-content" id="myTabContent">

                     <div className="tpd-table mb-45">
                        <ul>
                           <li className="tpd-table-head">
                              <div className="tpd-table-row">
                                 {/* Tradução dos Cabeçalhos da Tabela */}
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

                           {question_answer_data.map((item, index) => (
                              <QuestionAnswerItem key={index} item={item} />
                           ))}
                        </ul>
                     </div>

                  </div>
               </div>

            </div>
         </section>
      </>
   )
}


type Props = {
   item:{
      id: number;
      student: {
          name: string;
          date: string;
          profileImg: string;
      };
      question: string;
      course: string;
      replies: number;
      status: string;
  }
}
export function QuestionAnswerItem({ item }: Props) {
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
      <li>
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
                  {/* Tradução da Label de Curso */}
                  <span className="tpd-course-name">Curso:</span>
                  <span className="tpd-course-title">{item.course}</span>
               </div>
            </div>
            <div className="tpd-instructor-qa-reply">
               <h4 className="tpd-common-text">{item.replies}</h4>
            </div>
            <div className="tpd-instructor-qa-status">
               <div className={`tpd-status${item.status === "complete" ? "-complete" : ""}`}>
                  <button><CheckTwoSvg /></button>
               </div>
            </div>
            <div className="tpd-instructor-qa-btn">
               {/* Tradução do Botão Detalhes */}
               <a className="tpd-border-btn" href="#">Detalhes</a>
            </div>
            <div className="tpd-instructor-qa-action" ref={actionButtonRef}>
               <div className={`tpd-action-inexact-btn ${openActionId === item.id ? 'active' : ''}`}>
                  <button className="click" onClick={() => toggleAction(item.id)}>
                     <DotsTwoSvg />
                  </button>
                  <div className="tpd-action-click-tooltip">
                     {/* Tradução do Tooltip de Ação */}
                     <button>
                        <span>
                           <EmailFour />
                        </span>
                        Marcar como Não Lida
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
   )
}