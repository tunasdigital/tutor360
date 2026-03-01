'use client';
import { DeleteSvg } from "@/components/svg";
import usePagination from "@/hooks/use-pagination";
import Pagination from "@/components/ui/pagination";
import SectionArea from "./section-area";
import Link from "next/link";
import NiceSelect from "@/components/ui/nice-select";

// Dados de quiz garimpados e traduzidos (Simulação 2026)
const quizData = [
   {
      date: "26 de Março, 2026",
      title: "O que é Design Thinking",
      student: "Benjamin Evalent",
      questions: 2,
      totalMarks: 1,
      correctAnswers: 0,
      result: "Reprovado",
      resultClass: "danger",
   },
   {
      date: "26 de Março, 2026",
      title: "Teste de Conhecimento 01",
      student: "Benjamin Evalent",
      questions: 1,
      totalMarks: 0,
      correctAnswers: 1,
      result: "Aprovado",
      resultClass: "sucess",
   },
   {
      date: "26 de Março, 2026",
      title: "Teste de Conhecimento 02",
      student: "Benjamin Evalent",
      questions: 2,
      totalMarks: 0,
      correctAnswers: 1,
      result: "Aprovado",
      resultClass: "sucess",
   },
   {
      date: "26 de Março, 2026",
      title: "Verificação de Aprendizado",
      student: "Benjamin Evalent",
      questions: 1,
      totalMarks: 1,
      correctAnswers: 1,
      result: "Aprovado",
      resultClass: "sucess",
   },
   {
      date: "26 de Março, 2026",
      title: "Teste de Conhecimento 03",
      student: "Benjamin Evalent",
      questions: 1,
      totalMarks: 0,
      correctAnswers: 0,
      result: "Reprovado",
      resultClass: "danger",
   },
];


export default function InstructorQuizArea() {
   const { currentItems, handlePageClick, pageCount } = usePagination(quizData, 4);

   const handleFilter = (item: { value: string; label: string }) => {
      console.log(item);
   };

   return (
      <section className="tpd-quiz-area">
         <div className="row">
            <div className="col-lg-12">
               <div className="tp-dashboard-section mb-25">
                  {/* NACIONALIZADO: Título da página principal conforme prints */}
                  <h2 className="tp-dashboard-title">Tentativas de Quiz</h2>
               </div>
            </div>
         </div>

         <div className="row">
            <div className="col-lg-12">
               <div className="tpd-quiz-filter mb-30 d-flex align-items-center justify-content-between">
                  <div className="tpd-quiz-filter-select">
                     {/* NACIONALIZADO: Filtro de cursos */}
                     <NiceSelect
                        options={[
                           { value: "all", label: "Todos os Cursos" },
                           { value: "design", label: "Design" },
                           { value: "development", label: "Desenvolvimento" }
                        ]}
                        defaultCurrent={0}
                        onChange={handleFilter}
                        name="Cursos"
                        placeholder="Todos os Cursos"
                     />
                  </div>
                  <div className="tpd-quiz-filter-right d-flex align-items-center">
                     <div className="tpd-quiz-filter-select mr-15">
                        {/* NACIONALIZADO: Filtro de ordenação */}
                        <NiceSelect
                           options={[
                              { value: "desc", label: "Decrescente" },
                              { value: "asc", label: "Crescente" }
                           ]}
                           defaultCurrent={0}
                           onChange={handleFilter}
                           name="Ordem"
                           placeholder="Decrescente"
                        />
                     </div>
                     <div className="tpd-quiz-filter-date p-relative">
                        <input type="text" className="tp-date-picker" placeholder="AAAA-MM-DD" defaultValue="2026-03-01" />
                     </div>
                  </div>
               </div>
            </div>
         </div>

         <div className="tpd-course-area">
            <div className="tpd-table mb-25">
               <ul>
                  <li className="tpd-table-head">
                     <div className="tpd-table-row">
                        <div className="tpd-quiz-info">
                           <h4 className="tpd-table-title">Info do Quiz</h4>
                        </div>
                        <div className="tpd-quiz-ques">
                           <h4 className="tpd-table-title" title="Questões">Qts</h4>
                        </div>
                        <div className="tpd-quiz-tm">
                           <h4 className="tpd-table-title" title="Nota Total">NT</h4>
                        </div>
                        <div className="tpd-quiz-ca">
                           <h4 className="tpd-table-title" title="Respostas Corretas">RC</h4>
                        </div>
                        <div className="tpd-quiz-result">
                           <h4 className="tpd-table-title">Resultado</h4>
                        </div>
                        <div className="tpd-quiz-details">
                           <h4 className="tpd-table-title">Detalhes</h4>
                        </div>
                     </div>
                  </li>

                  {currentItems.map((quiz, index) => (
                     <li key={index}>
                        <div className="tpd-table-row">
                           <div className="tpd-quiz-info">
                              <span className="tpd-common-date">{quiz.date}</span>
                              <h4 className="tpd-quiz-title">{quiz.title}</h4>
                              <div className="tpd-student-info">
                                 <p>
                                    <span>Aluno: </span> {quiz.student}
                                 </p>
                              </div>
                           </div>
                           <div className="tpd-quiz-ques">
                              <span className="tpd-common-text">{quiz.questions}</span>
                           </div>
                           <div className="tpd-quiz-tm">
                              <h4 className="tpd-table-title">{quiz.totalMarks}</h4>
                           </div>
                           <div className="tpd-quiz-ca">
                              <h4 className="tpd-table-title">{quiz.correctAnswers}</h4>
                           </div>
                           <div className="tpd-quiz-result">
                              <div className="tpd-badge-item">
                                 <span className={`tpd-badge ${quiz.resultClass}`}>{quiz.result}</span>
                              </div>
                           </div>
                           <div className="tpd-quiz-details">
                              <div className="tpd-quiz-details-box d-flex">
                                 <div className="tpd-quiz-details-btn mr-15">
                                    <Link className="tpd-border-btn" href="/dashboard/instructor-quiz-attempts">Detalhes</Link>
                                 </div>
                                 <div className="tpd-action-inexact-btn">
                                    <button className="border-bg" title="Excluir tentativa">
                                       <DeleteSvg />
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

         <div className="tp-dashboard-pagination pt-20">
            <div className="tp-pagination">
               <Pagination handlePageClick={handlePageClick} pageCount={pageCount} isCenter={true} />
            </div>
         </div>
      </section>
   )
}