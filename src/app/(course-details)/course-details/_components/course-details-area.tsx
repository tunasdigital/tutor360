import { ICourseDT } from "@/types/course-d-t";
import CourseDetailsRightSide from "../_components/course-details-right-side";
import CourseDetailsInfo from "@/components/course/details/course-details-info";
import CourseDetailsCurriculum from "@/components/course/details/course-details-curriculum";
import CourseDetailsInstructor from "@/components/course/details/course-details-instructor";
import CourseDetailsRatingReviews from "@/components/course/details/course-details-rating-reviews";
import CourseDetailsFeaturedReviews from "@/components/course/details/course-details-featured-reviews";
import CourseDetailsReviewForm from "@/components/course/details/course-details-review-form";
import CourseDetailsNav from "@/components/course/details/course-details-nav";
import { Lesson } from "@prisma/client";

type IProps = {
   course: ICourseDT;
   lessons: Lesson[];
};

export default function CourseDetailsArea({ course, lessons }: IProps) {

   return (
      <section className="tp-course-details-2-area pt-50 pb-80">
         <div className="container">
            <div className="row">
               <div className="col-lg-8">
                  <div className="tp-course-details-2-main-inner pr-70">
                     <div className="tp-course-details-2-nav d-flex align-items-center">
                        <CourseDetailsNav />
                     </div>

                     <div className="tp-course-details-2-content">
                        <div id="info">
                           <CourseDetailsInfo />
                        </div>

                        <div id="curriculum" className="pt-70">
                           <h4 className="tp-course-details-2-main-title">Grade Curricular</h4>
                           {/* Repassando as aulas reais para o componente de currículo */}
                           <CourseDetailsCurriculum lessons={lessons} />
                        </div>

                        <div id="instructors" className="pt-100">
                           <h4 className="tp-course-details-2-main-title">Seus Instrutores</h4>
                           <CourseDetailsInstructor />
                        </div>

                        <div id="reviews">
                           <h4 className="tp-course-details-2-main-title">Avaliações e Comentários</h4>
                           <CourseDetailsRatingReviews />
                        </div>

                        <h4 className="tp-course-details-2-main-title">Avaliação em Destaque</h4>
                        <CourseDetailsFeaturedReviews />

                        <h4 className="tp-course-details-2-main-title">Escreva uma Avaliação</h4>
                        <div className="tp-course-details-2-comment-box pr-25">
                           <span>O que você achou deste curso?</span>
                           <CourseDetailsReviewForm />
                        </div>
                     </div>
                  </div>
               </div>
               <div className="col-lg-4">
                  <CourseDetailsRightSide course={course} />
               </div>
            </div>
         </div>
      </section>
   );
}