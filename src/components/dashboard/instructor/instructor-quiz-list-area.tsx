'use client';

// Dados de tentativas de quiz traduzidos e atualizados para 2026
const quizList = [
   {
      id: 1,
      date: '26 de Março, 2026',
      title: "O que é Design Thinking",
      student: 'Benjamin Evalent',
      questions: 2,
      totalMarks: 1,
      correctAnswers: 0,
      result: 'Reprovado',
   },
   {
      id: 2,
      date: '26 de Dezembro, 2025',
      title: 'Teste de Conhecimento 01',
      student: 'Benjamin Evalent',
      questions: 1,
      totalMarks: 0,
      correctAnswers: 1,
      result: 'Aprovado',
   },
   {
      id: 3,
      date: '26 de Março, 2026',
      title: 'Teste de Conhecimento 02',
      student: 'Benjamin Evalent',
      questions: 2,
      totalMarks: 0,
      correctAnswers: 1,
      result: 'Aprovado',
   },
   {
      id: 4,
      date: '23 de Agosto, 2026',
      title: 'Verificação de Aprendizado',
      student: 'Benjamin Evalent',
      questions: 1,
      totalMarks: 1,
      correctAnswers: 1,
      result: 'Aprovado',
   },
   {
      id: 5,
      date: '26 de Março, 2026',
      title: 'Teste de Conhecimento 03',
      student: 'Benjamin Evalent',
      questions: 1,
      totalMarks: 0,
      correctAnswers: 0,
      result: 'Reprovado',
   },
   {
      id: 6,
      date: '30 de Janeiro, 2026',
      title: "O que é Design Thinking",
      student: 'Benjamin Evalent',
      questions: 2,
      totalMarks: 1,
      correctAnswers: 0,
      result: 'Aprovado', // Mantido como aprovado para simular o dado original 'Pass'
   },
];

export default function InstructorQuizListArea() {
   return (
      <>

         {/* section-area-start */}
         <div className="section-area">
            <div className="tp-dashboard-section">
               {/* Nacionalização do título principal */}
               <h2 className="tp-dashboard-title">Minhas Tentativas de Quiz</h2>
            </div>
         </div>
         {/* section-area-end */}


         {/* quiz list area start */}
         <div className="tpd-course-area">
            <div className="tpd-table mb-25">
               <ul>
                  <li className="tpd-table-head">
                     <div className="tpd-table-row">
                        {/* Tradução e padronização dos cabeçalhos com tooltips */}
                        <div className="tpd-quiz-info-sub">
                           <h4 className="tpd-table-title">Info do Quiz</h4>
                        </div>
                        <div className="tpd-quiz-ques">
                           <h4 className="tpd-table-title" title="Questões">Qts</h4>
                        </div>
                        <div className="tpd-quiz-tm">
                           <h4 className="tpd-table-title" title="Nota Total">NT</h4>
                        </div>
                        <div className="tpd-quiz-ca-sub">
                           <h4 className="tpd-table-title" title="Respostas Corretas">RC</h4>
                        </div>
                        <div className="tpd-quiz-result-sub">
                           <h4 className="tpd-table-title">Resultado</h4>
                        </div>
                        <div className="tpd-quiz-details">
                           <h4 className="tpd-table-title">Detalhes</h4>
                        </div>
                     </div>
                  </li>

                  {quizList.map((quiz) => (
                     <li key={quiz.id}>
                        <div className="tpd-table-row">
                           <div className="tpd-quiz-info-sub">
                              <span className="tpd-common-date">{quiz.date}</span>
                              <h4 className="tpd-quiz-title">{quiz.title}</h4>
                              <div className="tpd-student-info">
                                 <p>
                                    {/* Tradução do rótulo Aluno */}
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
                           <div className="tpd-quiz-ca-sub">
                              <h4 className="tpd-table-title">{quiz.correctAnswers}</h4>
                           </div>
                           <div className="tpd-quiz-result-sub">
                              <div className="tpd-badge-item">
                                 {/* Ajuste lógico: agora verifica se o resultado é 'Aprovado' para aplicar a classe 'sucess' */}
                                 <span
                                    className={`tpd-badge ${quiz.result === 'Aprovado' ? 'sucess' : 'danger'
                                       }`}
                                 >
                                    {quiz.result}
                                 </span>
                              </div>
                           </div>
                           <div className="tpd-quiz-details">
                              <div className="tpd-quiz-details-btn">
                                 {/* Tradução do botão */}
                                 <a className="tpd-border-btn" href="#">
                                    Detalhes
                                 </a>
                              </div>
                           </div>
                        </div>
                     </li>
                  ))}
               </ul>
            </div>
         </div>
         {/* quiz list area end */}
      </>
   )
}