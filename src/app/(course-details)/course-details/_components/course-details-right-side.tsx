import Image from "next/image";
import { CertificateSvg, DeadLineSvg, DurationSvg, LanguageSvg, LectureSvg, PlayTwoSvg, ShareSvg, SkillLevelSvg } from "@/components/svg";
import VideoProvider from "@/components/video/video-provider";
import course_img from '@/assets/img/course/details/course.jpg';
import { ICourseDT } from "@/types/course-d-t";
import CoursePrice from "../../../../components/course/course-price";
import Link from "next/link";

type IProps = {
   course: ICourseDT;
};

export default function CourseDetailsRightSide({ course }: IProps) {
   const { discount, price } = course || {};
   return (
      <div className="tp-course-details-2-widget">
         <div className="tp-course-details-2-widget-thumb p-relative">
            <Image src={course_img} alt="course-img" />
            <VideoProvider videoId="go7QYaQR494">
               <span>
                  <PlayTwoSvg/>
               </span>
            </VideoProvider>
         </div>
         <div className="tp-course-details-2-widget-content">
            <div className="tp-course-details-2-widget-price">
               <CoursePrice discount={discount} price={price} />
            </div>
            <div className="tp-course-details-2-widget-btn">
               <Link className="active" href="/cart">Adicionar ao Carrinho</Link>
               <Link href="/course-with-filter">Comprar Curso</Link>
               <p>Garantia de 30 dias de devolução</p>
            </div>

            <div className="tp-course-details-2-widget-list">
               <h5>Este curso inclui:</h5>

               <div className="tp-course-details-2-widget-list-item-wrapper">

                  <div className="tp-course-details-2-widget-list-item d-flex align-items-center justify-content-between">
                     <span> <LectureSvg /> Aulas</span>
                     <span>40</span>
                  </div>
                  <div className="tp-course-details-2-widget-list-item d-flex align-items-center justify-content-between">
                     <span> <DurationSvg /> Duração</span>
                     <span>4h 50m</span>
                  </div>
                  <div className="tp-course-details-2-widget-list-item d-flex align-items-center justify-content-between">
                     <span> <SkillLevelSvg /> Nível</span>
                     <span>Iniciante</span>
                  </div>
                  <div className="tp-course-details-2-widget-list-item d-flex align-items-center justify-content-between">
                     <span> <LanguageSvg /> Idioma</span>
                     {/* Fallback inteligente caso a linguagem não venha do banco */}
                     <span>{course.language || "Português"}</span>
                  </div>
                  <div className="tp-course-details-2-widget-list-item d-flex align-items-center justify-content-between">
                     <span> <DeadLineSvg /> Acesso</span>
                     {/* Alterado de data fixa para "Vitalício", muito comum em infoprodutos BR */}
                     <span>Vitalício</span>
                  </div>
                  <div className="tp-course-details-2-widget-list-item d-flex align-items-center justify-content-between">
                     <span> <CertificateSvg /> Certificado</span>
                     <span>Sim</span>
                  </div>

                  <div className="tp-course-details-2-widget-share d-flex align-items-center justify-content-between">
                     <a className="share" href="#"><span><ShareSvg clr="#5169F1" /></span> Compartilhar curso</a>
                     <a className="coupon" href="#">Aplicar cupom</a>
                  </div>
                  <div className="tp-course-details-2-widget-search p-relative">
                     <form action="#">
                        <input type="text" placeholder="Código do Cupom" />
                        <button type="submit">Aplicar</button>
                     </form>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}