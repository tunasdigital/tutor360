'use client';
import Image from "next/image";
import { CertificateSvg, DeadLineSvg, DurationSvg, LanguageSvg, LectureSvg, PlayTwoSvg, ShareSvg, SkillLevelSvg } from "@/components/svg";
import VideoProvider from "@/components/video/video-provider";
import { ICourseDT } from "@/types/course-d-t";
import CoursePrice from "../../../../components/course/course-price";
import Link from "next/link";
import course_img_default from '@/assets/img/course/details/course.jpg';

type IProps = {
   course: ICourseDT;
};

export default function CourseDetailsRightSide({ course }: IProps) {
   const { discountPrice, price, thumbnail, lessons, level, language, video_id, duration } = course || {};

   // 🎥 TÁTICA DE EXTRAÇÃO: Limpa a URL (image_e864fe.png) para pegar apenas o ID que o Player entende
   const extractVideoId = (url: string) => {
      if (!url) return "go7QYaQR494"; 
      const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*|vimeo\.com\/(\d+)/;
      const match = url.match(regExp);
      return (match && (match[7] || match[8])) ? (match[7] || match[8]) : url;
   };

   return (
      <div className="tp-course-details-2-widget" style={{ backgroundColor: '#fff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 30px 60px rgba(0,0,0,0.1)' }}>
         <div className="tp-course-details-2-widget-thumb p-relative">
            <Image 
               src={thumbnail || course_img_default} 
               alt={course.title || "Capa"} 
               width={400} height={250} 
               style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
            />
            {/* Aceita links do Vimeo/YouTube colados na curadoria (image_e864fe.png) */}
            <VideoProvider videoId={extractVideoId(video_id)}>
               <span><PlayTwoSvg/></span>
            </VideoProvider>
         </div>

         <div className="tp-course-details-2-widget-content">
            <div className="tp-course-details-2-widget-price">
               <CoursePrice discount={discountPrice} price={price} />
            </div>
            <div className="tp-course-details-2-widget-btn">
               <Link className="active" href="/cart">Matricular-se Agora</Link>
               <Link href="/cart">Adicionar ao Carrinho</Link>
            </div>
            <div className="tp-course-details-2-widget-list">
               <h5>Este curso inclui:</h5>
               <div className="tp-course-details-2-widget-list-item-wrapper">
                  <div className="tp-course-details-2-widget-list-item d-flex align-items-center justify-content-between">
                     <span> <LectureSvg /> Aulas</span>
                     <span>{lessons || 0}</span>
                  </div>
                  <div className="tp-course-details-2-widget-list-item d-flex align-items-center justify-content-between">
                     <span> <DurationSvg /> Duração</span>
                     <span>{duration || "Acesso Vitalício"}</span>
                  </div>
                  <div className="tp-course-details-2-widget-list-item d-flex align-items-center justify-content-between">
                     <span> <SkillLevelSvg /> Nível</span>
                     <span>{level}</span>
                  </div>
                  <div className="tp-course-details-2-widget-list-item d-flex align-items-center justify-content-between">
                     <span> <LanguageSvg /> Idioma</span>
                     <span>{language}</span>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}