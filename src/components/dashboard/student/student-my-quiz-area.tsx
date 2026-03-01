'use client';
import Pagination from "@/components/ui/pagination";
import usePagination from "@/hooks/use-pagination";
import Link from "next/link";

// Dados de exemplo traduzidos e localizados
const quizData = [
   {
      date: "26 de Março, 2026",
      title: "O que é Design Thinking",
      student: "Edvaldo Ferreira",
      questions: 2,
      totalMarks: 1,
      correctAnswers: 0,
      result: "Reprovado",
      resultClass: "danger",
   },
   {
      date: "26 de Março, 2026",
      title: "Teste de Quiz 01",
      student: "Edvaldo Ferreira",
      questions: 1,
      totalMarks: 0,
      correctAnswers: 1,
      result: "Aprovado",
      resultClass: "sucess",
   },
   {
      date: "26 de Março, 2026",
      title: "Teste de Quiz 02",
      student: "Edvaldo Ferreira",
      questions: 2,
      totalMarks: 0,
      correctAnswers: 1,
      result: "Aprovado",
      resultClass: "sucess",
   },
   {
      date: "26 de Março, 2026",
      title: "Verificação de Conhecimento",
      student: "Edvaldo Ferreira",
      questions: 1,
      totalMarks: 1,
      correctAnswers: 1,
      result: "Aprovado",
      resultClass: "sucess",
   },
   {
      date: "26 de Março, 2026",
      title: "Teste de Quiz 03",
      student: "Edvaldo Ferreira",
      questions: 1,
      totalMarks: 0,
      correctAnswers: 0,
      result: "Reprovado",
      resultClass: "danger",
   },
];

export default function StudentMyQuizArea() {
   const { currentItems, handlePageClick, pageCount } = usePagination(quizData, 4);
   return (
      <>
         {/* Área da seção início */}
         <div className="section-area">
            <div className="tp-dashboard-section">
               <h2 className="tp-dashboard-title">Minhas Tentativas de Quiz</h2>
            </div>
         </div>
         {/* Área da seção fim */}

         {/* Área de quiz início */}
         <div className="tpd-course-area">
            <div className="tpd-table mb-25">
               <ul>
                  <li className="tpd-table-head">
                     <div className="tpd-table-row">
                        <div className="tpd-quiz-info-sub">
                           <h4 className="tpd-table-title">Informações do Quiz</h4>
                        </div>
                        <div className="tpd-quiz-ques">
                           <h4 className="tpd-table-title">Perg.</h4>
                        </div>
                        <div className="tpd-quiz-tm">
                           <h4 className="tpd-table-title">Nota</h4>
                        </div>
                        <div className="tpd-quiz-ca-sub">
                           <h4 className="tpd-table-title">AC</h4>
                        </div>
                        <div className="tpd-quiz-result-sub">
                           <h4 className="tpd-table-title">Resultado</h4>
                        </div>
                        <div className="tpd-quiz-details">
                           <h4 className="tpd-table-title">Detalhes</h4>
                        </div>
                     </div>
                  </li>

                  {currentItems.map((item, index) => (
                     <li key={index}>
                        <div className="tpd-table-row">
                           <div className="tpd-quiz-info-sub">
                              <span className="tpd-common-date">{item.date}</span>
                              <h4 className="tpd-quiz-title">{item.title}</h4>
                              <div className="tpd-student-info">
                                 <p><span>Aluno: </span> {item.student}</p>
                              </div>
                           </div>
                           <div className="tpd-quiz-ques">
                              <span className="tpd-common-text">{item.questions}</span>
                           </div>
                           <div className="tpd-quiz-tm">
                              <h4 className="tpd-table-title">{item.totalMarks}</h4>
                           </div>
                           <div className="tpd-quiz-ca-sub">
                              <h4 className="tpd-table-title">{item.correctAnswers}</h4>
                           </div>
                           <div className="tpd-quiz-result-sub">
                              <div className="tpd-badge-item">
                                 <span className={`tpd-badge ${item.resultClass}`}>{item.result}</span>
                              </div>
                           </div>
                           <div className="tpd-quiz-details">
                              <div className="tpd-quiz-details-btn">
                                 <Link className="tpd-border-btn" href="/dashboard/instructor-quiz-attempts">Detalhes</Link>
                              </div>
                           </div>
                        </div>
                     </li>
                  ))}
               </ul>
            </div>
         </div>
         {/* Área de quiz fim */}

         {/* Área de paginação início */}
         <div className="tp-dashboard-pagination pt-20">
            <div className="tp-pagination">
               <Pagination handlePageClick={handlePageClick} pageCount={pageCount} isCenter={true} />
            </div>
         </div>
         {/* Área de paginação fim */}
      </>
   )
}