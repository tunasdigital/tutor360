import Link from "next/link";

// Dados fictícios traduzidos e adaptados
const courseData = [
   {
      name: 'Design de Produtos Digitais',
      enrollCount: 45,
      rating: 5,
   },
   {
      name: 'Masterclass de Design Gráfico',
      enrollCount: 12,
      rating: 3,
   },
   {
      name: 'Fundamentos de Análise de Negócios',
      enrollCount: 22,
      rating: 2,
   },
   {
      name: 'Sistemas de Design no Figma',
      enrollCount: 30,
      rating: 5,
   },
   {
      name: 'Animação e Motion Design',
      enrollCount: 8,
      rating: 5,
   },
];

export default function DashboardCoursesArea() {
   return (
      <section className="tp-dashboard-course-wrapper">
         <div className="row">
            <div className="col-6">
               <div className="tp-dashboard-section">
                  {/* Título da seção traduzido */}
                  <h2 className="tp-dashboard-title">Meus Cursos</h2>
               </div>
            </div>
            <div className="col-6">
               <div className="tp-dashboard-course-details text-sm-end">
                  {/* Link traduzido */}
                  <Link href="/course-with-filter">
                     Ver Todos os Cursos <i className="fa-regular fa-angle-right"></i>
                  </Link>
               </div>
            </div>
         </div>
         <div className="row">
            <div className="col-12">
               <div className="tp-dashboard-course-list">
                  <ul>
                     <li className="active">
                        <div className="tp-dashboard-course-item">
                           <div className="tp-dashboard-course-name">
                              {/* Cabeçalho da coluna traduzido */}
                              <h5 className="tp-dashboard-course-name-title">Nome do Curso</h5>
                           </div>
                           <div className="tp-dashboard-course-enroll">
                              {/* Cabeçalho da coluna traduzido */}
                              <span>Matriculados</span>
                           </div>
                           <div className="tp-dashboard-course-rating">
                              {/* Cabeçalho da coluna traduzido */}
                              <span>Avaliação</span>
                           </div>
                        </div>
                     </li>
                     {courseData.map((course, index) => (
                        <li key={index}>
                           <div className="tp-dashboard-course-item">
                              <div className="tp-dashboard-course-name">
                                 <h5 className="tp-dashboard-course-name-title">{course.name}</h5>
                              </div>
                              <div className="tp-dashboard-course-enroll">
                                 <span>{course.enrollCount}</span>
                              </div>
                              <div className="tp-dashboard-course-rating">
                                 {Array.from({ length: 5 }, (_, i) => (
                                    <i
                                       key={i}
                                       className={`fa-star ${i < course.rating ? 'fa-solid' : 'fa-light'}`}
                                    ></i>
                                 ))}

                              </div>
                           </div>
                        </li>
                     ))}
                  </ul>
               </div>
            </div>
         </div>
      </section>
   );
}