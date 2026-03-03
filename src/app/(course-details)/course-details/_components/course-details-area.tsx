'use client';
import React from "react";
import { ICourseDT } from "@/types/course-d-t";
import { Lesson } from "@prisma/client";

// TÁTICA DE CHOQUE: Importando o componente que contém o vídeo e o checkout
import CourseDetailsRightSide from "./course-details-right-side";

// Importações dos componentes de conteúdo da esquerda
import CourseDetailsNav from "@/components/course/details/course-details-nav";
import CourseDetailsInfo from "@/components/course/details/course-details-info";
import CourseDetailsCurriculum from "@/components/course/details/course-details-curriculum";
import CourseDetailsInstructor from "@/components/course/details/course-details-instructor";
import CourseDetailsRatingReviews from "@/components/course/details/course-details-rating-reviews";

type IProps = {
   course: ICourseDT;
   lessons: Lesson[];
};

export default function CourseDetailsArea({ course, lessons }: IProps) {
   return (
      <section className="tp-course-details-2-area pt-50 pb-80">
         <div className="container">
            <div className="row">
               {/* COLUNA DA ESQUERDA (Conteúdo Principal) */}
               <div className="col-lg-8">
                  <div className="tp-course-details-2-main-inner pr-70">
                     <CourseDetailsNav />
                     
                     <div className="tp-course-details-2-content">
                        <div id="info">
                           <CourseDetailsInfo course={course} />
                        </div>

                        <div id="curriculum" className="pt-70">
                           <h4 className="tp-course-details-2-main-title">Grade Curricular</h4>
                           <CourseDetailsCurriculum lessons={lessons} />
                        </div>

                        <div id="instructors" className="pt-100">
                           <h4 className="tp-course-details-2-main-title">Seus Instrutores</h4>
                           <CourseDetailsInstructor course={course} />
                        </div>

                        <div id="reviews">
                           <h4 className="tp-course-details-2-main-title">Avaliações</h4>
                           <CourseDetailsRatingReviews />
                        </div>
                     </div>
                  </div>
               </div>

               {/* COLUNA DA DIREITA (Onde o vídeo DEVE aparecer) */}
               <div className="col-lg-4">
                  {/* Tática de Visibilidade: Envolvendo em uma div de classe widget para forçar o CSS do template */}
                  <div className="tp-course-details-2-sidebar">
                     <CourseDetailsRightSide course={course} />
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
}