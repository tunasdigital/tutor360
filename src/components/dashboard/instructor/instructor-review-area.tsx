'use client';
import Pagination from "@/components/ui/pagination";
import usePagination from "@/hooks/use-pagination";
import Image from "next/image";
import { useState } from "react";

// Tradução das abas de navegação
const tabs = ['Recebidas', 'Realizadas'];

// Dados de avaliações recebidas traduzidos e localizados (Simulação de 2026)
const receivedReviewData = [
   {
      id: 1,
      studentName: 'Joss Sticks',
      studentImage: '/assets/img/dashboard/profile/reviews-profile-1.png',
      date: '27 de Agosto, 2026',
      time: '08:31',
      rating: 5,
      feedback: 'Curso excelente!',
      courseTitle: 'Masterclass de Design',
   },
   {
      id: 2,
      studentName: 'Benjamin Evalent',
      studentImage: '/assets/img/dashboard/profile/reviews-profile-2.png',
      date: '30 de Janeiro, 2026',
      time: '10:21',
      rating: 5,
      feedback: 'O curso é ótimo!',
      courseTitle: 'Design de Movimento 3D',
   },
   {
      id: 3,
      studentName: 'Hanson Deck',
      studentImage: '/assets/img/dashboard/profile/reviews-profile-3.png',
      date: '20 de Abril, 2026',
      time: '13:05',
      rating: 5,
      feedback: 'Incrível',
      courseTitle: 'Masterclass de Design Gráfico',
   },
   {
      id: 4,
      studentName: 'Hanson Violet',
      studentImage: '/assets/img/dashboard/profile/reviews-profile-4.png',
      date: '27 de Agosto, 2026',
      time: '10:21',
      rating: 5,
      feedback: 'Muito bom!',
      courseTitle: 'Masterclass de Design Gráfico',
   },
   {
      id: 5,
      studentName: 'Indigo Violet',
      studentImage: '/assets/img/dashboard/profile/reviews-profile-5.png',
      date: '30 de Janeiro, 2026',
      time: '10:21',
      rating: 5,
      feedback: 'Espetacular',
      courseTitle: 'Sistema de Design no Figma',
   },
];

// Dados de avaliações dadas traduzidos
const giverReviewData = [
   {
      id: 1,
      studentName: 'Hanson Deck',
      studentImage: '/assets/img/dashboard/profile/reviews-profile-3.png',
      date: '20 de Abril, 2026',
      time: '13:05',
      rating: 5,
      feedback: 'Incrível',
      courseTitle: 'Masterclass de Design Gráfico',
   },
   {
      id: 2,
      studentName: 'Hanson Violet',
      studentImage: '/assets/img/dashboard/profile/reviews-profile-4.png',
      date: '27 de Agosto, 2026',
      time: '10:21',
      rating: 5,
      feedback: 'O curso é ótimo!',
      courseTitle: 'Masterclass de Design Gráfico',
   },
   {
      id: 3,
      studentName: 'Indigo Violet',
      studentImage: '/assets/img/dashboard/profile/reviews-profile-5.png',
      date: '30 de Janeiro, 2026',
      time: '10:21',
      rating: 5,
      feedback: 'Espetacular',
      courseTitle: 'Sistema de Design no Figma',
   },
];

export default function InstructorReviewArea() {
   const [activeTab, setActiveTab] = useState(tabs[0]);
   const { currentItems, handlePageClick, pageCount } = usePagination(activeTab === 'Recebidas' ? receivedReviewData : giverReviewData, 4);

   function handleReviewCount (tab: string) {
      if (tab === 'Recebidas') {
         return receivedReviewData.length
      } else {
         return giverReviewData.length
      }
   }

   return (
      <>
         {/* Início da área de abas de avaliações */}
         <div className="tp-dashboard-tab mb-30">
            <h2 className="tp-dashboard-tab-title">Avaliações</h2>
            <div className="tp-dashboard-tab-list">
               <ul>
                  {tabs.map((tab) => (
                     <li
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                     >
                        <a className={`${activeTab === tab ? 'active' : ''} pointer`}>
                         {tab}{" "}<span>({handleReviewCount(tab)})</span>
                        </a>
                     </li>
                  ))}
               </ul>
            </div>
         </div>
         {/* Fim da área de abas */}

         {/* Início da área de listagem */}
         <div className="tpd-table mb-25">
            <ul>
               <li className="tpd-table-head">
                  <div className="tpd-table-row">
                     <div className="tpd-reviews-student">
                        <h4 className="tpd-table-title">Aluno</h4>
                     </div>
                     <div className="tpd-reviews-date">
                        <h4 className="tpd-table-title">Data</h4>
                     </div>
                     <div className="tpd-reviews-feedback">
                        <h4 className="tpd-table-title">Feedback</h4>
                     </div>
                  </div>
               </li>

               {currentItems.map((review) => (
                  <li key={review.id}>
                     <div className="tpd-table-row">
                        <div className="tpd-reviews-student">
                           <div className="tpd-reviews-profile d-flex align-items-center">
                              <div className="tpd-reviews-thumb">
                                 <Image src={review.studentImage} alt={review.studentName} width={38} height={38} />
                              </div>
                              <h4 className="tpd-reviews-thumb-title">{review.studentName}</h4>
                           </div>
                        </div>
                        <div className="tpd-reviews-date">
                           <span>{review.date}</span>
                           <p>{review.time}</p>
                        </div>
                        <div className="tpd-reviews-feedback">
                           <div className="tp-instructor-rating">
                              {[...Array(review.rating)].map((_, i) => (
                                 <i key={i} className="fa-solid fa-star"></i>
                              ))}
                           </div>
                           <span>{review.feedback}</span>
                           <div className="tpd-course-wrap">
                              <span className="tpd-course-name">Curso:</span>
                              <span className="tpd-course-title">{review.courseTitle}</span>
                           </div>
                        </div>
                     </div>
                  </li>
               ))}
            </ul>
         </div>
         {/* Fim da área de listagem */}

         {/* Início da área de paginação */}
         <div className="tp-dashboard-pagination pt-20">
            <div className="tp-pagination">
               <Pagination handlePageClick={handlePageClick} pageCount={pageCount} isCenter={true} />
            </div>
         </div>
         {/* Fim da área de paginação */}
      </>
   )
}