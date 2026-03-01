'use client';
import { QuestionAnswerItem } from "../instructor/instructor-q-a-area";


// Dados de Perguntas e Respostas (Q&A) traduzidos e localizados
const studentQaData = [
   {
      id: 1,
      student: {
         name: "Hanson Deck",
         date: "11 de Junho, 2026 às 06:01",
         profileImg: "/assets/img/dashboard/profile/reviews-profile-1.png"
      },
      question: "Olá! Você poderia explicar a última lição?",
      course: "Novo Curso de Next.js",
      replies: 2,
      status: "pendente",
   },
   {
      id: 2,
      student: {
         name: "Indigo Violet",
         date: "12 de Junho, 2026 às 14:15",
         profileImg: "/assets/img/dashboard/profile/reviews-profile-2.png"
      },
      question: "Estou tendo dificuldades com a tarefa de TypeScript.",
      course: "Masterclass em TypeScript",
      replies: 3,
      status: "completo",
   },
   {
      id: 3,
      student: {
         name: "Benjamin Evalent",
         date: "13 de Junho, 2026 às 09:45",
         profileImg: "/assets/img/dashboard/profile/reviews-profile-3.png"
      },
      question: "Pode esclarecer os requisitos do projeto final?",
      course: "Arquitetura de Software",
      replies: 1,
      status: "pendente",
   },
   {
      id: 4,
      student: {
         name: "Jennifer Lang",
         date: "14 de Junho, 2026 às 08:30",
         profileImg: "/assets/img/dashboard/profile/reviews-profile-4.png"
      },
      question: "Qual é a data de entrega para o projeto final?",
      course: "Design de Interface (UI)",
      replies: 5,
      status: "completo",
   },
   {
      id: 5,
      student: {
         name: "Michael Lee",
         date: "15 de Junho, 2026 às 15:20",
         profileImg: "/assets/img/dashboard/profile/reviews-profile-2.png"
      },
      question: "Existe algum crédito extra disponível para este módulo?",
      course: "Fundamentos de Backend",
      replies: 0,
      status: "pendente",
   },
   {
      id: 6,
      student: {
         name: "Sophia Blake",
         date: "16 de Junho, 2026 às 17:00",
         profileImg: "/assets/img/dashboard/profile/reviews-profile-1.png"
      },
      question: "Pode revisar meu resumo antes do envio final?",
      course: "Gestão de Ativos Digitais",
      replies: 4,
      status: "completo",
   }
];

export default function StudentQuestionAnswerArea() {
   return (
      <section className="tpd-order-area">
         <div className="row">
            <div className="col-lg-6">
               <div className="tp-dashboard-section">
                  <h2 className="tp-dashboard-title">Perguntas e Respostas</h2>
               </div>
            </div>
         </div>


         <div className="tpd-table mb-45">
            <ul>
               <li className="tpd-table-head">
                  <div className="tpd-table-row">
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
                  <QuestionAnswerItem key={index} item={item} />
               ))}
            </ul>
         </div>
      </section>
   )
}