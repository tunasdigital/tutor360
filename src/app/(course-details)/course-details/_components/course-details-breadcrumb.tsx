import Link from "next/link";
import Image from "next/image";
import { HomeSvg } from "@/components/svg";
import { ICourseDT } from "@/types/course-d-t";
import { removeTagInText } from "@/utils";
import author_img from "@/assets/img/course/course-5-teacher-1.png";

type IProps = {
   course: ICourseDT
}
export default function CourseDetailsBreadcrumb({ course }: IProps) {
   // Formatação de data amigável para o Brasil baseada no banco de dados
   const formattedDate = course.updatedAt
      ? new Date(course.updatedAt).toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' })
      : "15 de Julho, 2024";

   return (
      <section className="tp-breadcrumb__area pt-25 pb-55 p-relative z-index-1 fix">
         <div className="tp-breadcrumb__bg" style={{ backgroundImage: "url(/assets/img/breadcrumb/breadcrumb-bg-2.jpg)" }}></div>
         <div className="container">
            <div className="row align-items-center">
               <div className="col-sm-12">
                  <div className="tp-breadcrumb__content">
                     <div className="tp-breadcrumb__list course-details mb-70">
                        <span><Link href="/"><HomeSvg/></Link></span>
                        {/* Caminho de navegação dinâmico */}
                        <span>Cursos  /  {course.category || "Geral"}  /  {removeTagInText(course.title)}</span>
                     </div>

                     <div className="tp-course-details-2-header">
                        <span className="tp-course-details-2-category">{course.category || "Geral"}</span>
                        {/* Título dinâmico vindo do banco de dados */}
                        <h3 className="tp-course-details-2-title">{removeTagInText(course.title)}</h3>
                        
                        <div className="tp-course-details-2-meta-wrapper d-flex align-items-center flex-wrap">
                           <div className="tp-course-details-2-meta ">
                              <div className="tp-course-details-2-author d-flex align-items-center">
                                 <div className="tp-course-details-2-author-avater">
                                    <Image src={course.author_img ? course.author_img : author_img} alt="Tutor" width={50} height={50} />
                                 </div>
                                 <div className="tp-course-details-2-author-content">
                                    <span className="tp-course-details-2-author-designation">Instrutor(a)</span>
                                    {/* Nome padrão da plataforma até termos tabela de instrutores */}
                                    <h3 className="tp-course-details-2-meta-title"><a href="#">Tutor360</a></h3>
                                 </div>
                              </div>
                           </div>
                           <div className="tp-course-details-2-meta">
                              <span className="tp-course-details-2-meta-subtitle">Categoria</span>
                              {/* Categoria dinâmica */}
                              <h3 className="tp-course-details-2-meta-title">{course.category || "Geral"}</h3>
                           </div>
                           <div className="tp-course-details-2-meta">
                              <span className="tp-course-details-2-meta-subtitle">Última atualização</span>
                              {/* Data dinâmica formatada */}
                              <h3 className="tp-course-details-2-meta-title">{formattedDate}</h3>
                           </div>
                           <div className="tp-course-details-2-meta text-end">
                              <div className="tp-course-details-2-meta-rating-wrapper">
                                 <div className="tp-course-rating-icon">
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                    <i className="fa-solid fa-star"></i>
                                 </div>
                                 <span className="tp-course-details-2-meta-subtitle">Avaliações</span>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   )
}