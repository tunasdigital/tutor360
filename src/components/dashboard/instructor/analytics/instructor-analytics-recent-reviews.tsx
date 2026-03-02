import Image from "next/image";

// Dados de avaliações nacionalizados - Tutor360
const recentReviewsData = [
   {
      id: 1,
      studentName: "Joss Sticks",
      studentImg: "/assets/img/dashboard/profile/reviews-profile-1.png",
      date: "27 de Agosto de 2024",
      time: "08:31",
      rating: 5,
      feedback: "Ótimo curso!",
      courseTitle: "Masterclass de Design",
   },
   {
      id: 2,
      studentName: "Benjamin Evalent",
      studentImg: "/assets/img/dashboard/profile/reviews-profile-2.png",
      date: "30 de Janeiro de 2024",
      time: "10:21",
      rating: 5,
      feedback: "Curso excelente!",
      courseTitle: "Motion Design 3D",
   },
   {
      id: 3,
      studentName: "Hanson Deck",
      studentImg: "/assets/img/dashboard/profile/reviews-profile-3.png",
      date: "20 de Abril de 2024",
      time: "13:05",
      rating: 5,
      feedback: "Incrível",
      courseTitle: "Masterclass de Design Gráfico",
   },
   {
      id: 4,
      studentName: "Hanson Violet",
      studentImg: "/assets/img/dashboard/profile/reviews-profile-4.png",
      date: "27 de Agosto de 2024",
      time: "10:21",
      rating: 5,
      feedback: "Muito bom o conteúdo!",
      courseTitle: "Masterclass de Design Gráfico",
   },
   {
      id: 5,
      studentName: "Indigo Violet",
      studentImg: "/assets/img/dashboard/profile/reviews-profile-5.png",
      date: "30 de Janeiro de 2024",
      time: "10:21",
      rating: 5,
      feedback: "Sensacional",
      courseTitle: "Design System no Figma",
   },
];


export default function InstructorAnalyticsRecentReviews() {
   return (
      <section className="tp-dashboard-course-wrapper">
         <div className="tp-dashboard-section">
            <h2 className="tp-dashboard-title">Avaliações Recentes</h2>
         </div>
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
                        <h4 className="tpd-table-title">Avaliação</h4>
                     </div>
                  </div>
               </li>

               {recentReviewsData.map((review, index) => (
                  <li key={index}>
                     <div className="tp-dashboard-course-item p-0 border-0">
                        <div className="tpd-table-row">
                           <div className="tpd-reviews-student">
                              <div className="tpd-reviews-profile d-flex align-items-center">
                                 <div className="tpd-reviews-thumb">
                                    <Image src={review.studentImg} alt={review.studentName} width={38} height={38} />
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
                                 {[...Array(5)].map((star, i) => (
                                    <i
                                       key={i}
                                       className={`fa-solid fa-star ${i < review.rating ? "" : "fa-light"
                                          }`}
                                    ></i>
                                 ))}
                              </div>
                              <span className="span">{review.feedback}</span>
                              <div className="tpd-course-wrap">
                                 <span className="tpd-course-name">Curso:</span>
                                 <span className="tpd-course-title">{review.courseTitle}</span>
                              </div>
                           </div>
                        </div>
                     </div>
                  </li>
               ))}
            </ul>
         </div>
      </section>

   )
}