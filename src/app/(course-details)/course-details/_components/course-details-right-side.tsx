'use client';
import React from "react";
import { CertificateSvg, DeadLineSvg, DurationSvg, LanguageSvg, LectureSvg, ShareSvg, SkillLevelSvg } from "@/components/svg";
import { ICourseDT } from "@/types/course-d-t";
import Link from "next/link";

type IProps = {
   course: ICourseDT;
};

export default function CourseDetailsRightSide({ course }: IProps) {
   // Prevenção total de quebra: Valores padrão caso o course venha vazio
   const id = course?.id || 1;
   const discount = course?.discount || 0;
   const price = course?.price || 0;
   const video_id = course?.video_id || "go7QYaQR494";
   const lessons = course?.lessons || "A definir";
   const language = course?.language || "Português";

   return (
      <aside className="tp-course-details-2-widget">
         
         {/* 🎬 CAIXA DE VÍDEO BLINDADA (Proporção 16:9 forçada via CSS) */}
         <div style={{ position: 'relative', width: '100%', paddingBottom: '56.25%', marginBottom: '25px', borderRadius: '12px', overflow: 'hidden', backgroundColor: '#000', boxShadow: '0px 10px 20px rgba(0,0,0,0.1)' }}>
            <iframe
               style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
               src={`https://www.youtube.com/embed/${video_id}?rel=0&modestbranding=1`}
               title="Vídeo de Amostra"
               frameBorder="0"
               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
               allowFullScreen
            ></iframe>
         </div>

         <div className="tp-course-details-2-widget-content">
            
            {/* 💰 ÁREA DE PREÇO (HTML Puro para não sumir) */}
            <div style={{ paddingBottom: '20px', marginBottom: '20px', borderBottom: '1px solid #EAEAEA', textAlign: 'center' }}>
               {price > 0 ? (
                  <h3 style={{ margin: 0, fontSize: '32px', fontWeight: '800', color: '#0055FF' }}>
                     R$ {price.toFixed(2).replace('.', ',')}
                  </h3>
               ) : (
                  <h3 style={{ margin: 0, fontSize: '32px', fontWeight: '800', color: '#00BA55' }}>
                     Gratuito
                  </h3>
               )}
            </div>

            {/* BOTÕES DE CHECKOUT */}
            <div className="tp-course-details-2-widget-btn mb-25">
               <Link className="tp-btn-2 w-100 text-center mb-15" href={`/checkout?id=${id}`} style={{ display: 'block', borderRadius: '8px' }}>
                  Matricular-se Agora
               </Link>
               <Link className="tp-btn-3 w-100 text-center" href={`/cart?id=${id}`} style={{ display: 'block', borderRadius: '8px' }}>
                  Adicionar ao Carrinho
               </Link>
               <p className="text-center mt-15" style={{ fontSize: '13px', color: '#666' }}>
                  <i className="fa-solid fa-shield-check" style={{ color: '#0055FF' }}></i> Garantia de 30 dias para reembolso
               </p>
            </div>

            {/* LISTA DE BENEFÍCIOS */}
            <div className="tp-course-details-2-widget-list">
               <h5 className="mb-15">Este curso inclui:</h5>
               <div className="tp-course-details-2-widget-list-item-wrapper">
                  <div className="tp-course-details-2-widget-list-item d-flex align-items-center justify-content-between">
                     <span> <LectureSvg /> Aulas</span>
                     <span>{lessons}</span>
                  </div>
                  <div className="tp-course-details-2-widget-list-item d-flex align-items-center justify-content-between">
                     <span> <DurationSvg /> Duração</span>
                     <span>12h 45m</span>
                  </div>
                  <div className="tp-course-details-2-widget-list-item d-flex align-items-center justify-content-between">
                     <span> <SkillLevelSvg /> Nível</span>
                     <span>Iniciante ao Avançado</span>
                  </div>
                  <div className="tp-course-details-2-widget-list-item d-flex align-items-center justify-content-between">
                     <span> <LanguageSvg /> Idioma</span>
                     <span>{language}</span>
                  </div>
                  <div className="tp-course-details-2-widget-list-item d-flex align-items-center justify-content-between">
                     <span> <DeadLineSvg /> Acesso</span>
                     <span style={{ fontWeight: 'bold', color: '#0055FF' }}>Vitalício</span>
                  </div>
                  <div className="tp-course-details-2-widget-list-item d-flex align-items-center justify-content-between">
                     <span> <CertificateSvg /> Certificado</span>
                     <span>Sim, incluso</span>
                  </div>
               </div>
            </div>
         </div>
      </aside>
   );
}