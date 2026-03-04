'use client';
import React, { useState } from 'react';
import { ICourseDT } from '@/types/course-d-t';

type IProps = {
   course: ICourseDT;
};

export default function CourseDetailsRightSide({ course }: IProps) {
   // Estado que controla se a janela preta do vídeo está aberta ou fechada
   const [isVideoOpen, setIsVideoOpen] = useState(false);
   
   const { 
      price, 
      discountPrice, 
      lessons, 
      duration, 
      level, 
      language, 
      hasCertificate, 
      thumbnail,
      video_id // O link que você salva no dashboard
   } = course || {};

   // 🚀 EXTRATOR AUTOMÁTICO DE ID DO YOUTUBE
   const extractYouTubeId = (urlOrId: string) => {
      if (!urlOrId) return null;
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
      const match = urlOrId.match(regExp);
      return (match && match[2].length === 11) ? match[2] : urlOrId;
   };

   const finalVideoId = extractYouTubeId(video_id || "");

   return (
      <>
         <div className="tp-course-details-2-widget">
            {/* 🎥 ÁREA DO VÍDEO COM O ÍCONE PULSANTE */}
            <div className="tp-course-details-2-widget-thumb p-relative shadow-lg mb-35" style={{ position: 'relative', overflow: 'hidden', borderRadius: '8px' }}>
               <img 
                  src={thumbnail || "/assets/img/course/details/course.jpg"} 
                  alt="Capa do curso" 
                  style={{ width: '100%', display: 'block' }}
               />
               
               <div className="tp-course-details-2-widget-play" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 10 }}>
                  <button 
                     onClick={() => setIsVideoOpen(true)} // Abre o Modal
                     className="pulse-button"
                  >
                     <i className="fa-sharp fa-solid fa-play"></i>
                  </button>
               </div>
            </div>

            {/* 💰 FINANCEIRO */}
            <div className="tp-course-details-2-widget-price mb-30">
               <div className="tp-course-details-2-widget-price-inner d-flex align-items-center">
                  <span className="tp-course-details-2-widget-price-new" style={{ fontSize: '28px', fontWeight: '700', color: '#1d4ed8' }}>R$ {price}</span>
                  {discountPrice && discountPrice > 0 && (
                     <del className="tp-course-details-2-widget-price-old ml-15" style={{ color: '#64748B' }}>R$ {discountPrice}</del>
                  )}
               </div>
            </div>

            <div className="tp-course-details-2-widget-btn mb-45">
               <a href="#" className="tp-btn-13 w-100 text-center mb-15">Matricular-se Agora</a>
               <a href="#" className="tp-btn-14 w-100 text-center">Adicionar ao Carrinho</a>
            </div>

            {/* 📊 LISTA DE INCLUSÕES */}
            <div className="tp-course-details-2-widget-list">
               <h4 className="tp-course-details-2-widget-title" style={{ fontSize: '18px', marginBottom: '20px', fontWeight: '600' }}>Este curso inclui:</h4>
               <ul style={{ listStyle: 'none', padding: 0 }}>
                  {[
                     { label: 'Aulas', value: lessons || 0, icon: 'fa-video' },
                     { label: 'Duração', value: duration || "Acesso Vitalício", icon: 'fa-clock' },
                     { label: 'Nível', value: level || "Iniciante", icon: 'fa-signal' },
                     { label: 'Idioma', value: language || "Português", icon: 'fa-globe' },
                     { label: 'Certificado', value: hasCertificate ? "Sim" : "Sim", icon: 'fa-certificate' },
                  ].map((item, idx) => (
                     <li key={idx} className="mb-15 pb-15" style={{ borderBottom: idx === 4 ? 'none' : '1px solid #F0F2F5' }}>
                        <div className="d-flex align-items-center justify-content-between">
                           <span style={{ color: '#4F5E64' }}><i className={`fa-light ${item.icon} mr-10`}></i> {item.label}</span>
                           <span style={{ fontWeight: '500' }}>{item.value}</span>
                        </div>
                     </li>
                  ))}
               </ul>
            </div>

            {/* 🚀 COMPARTILHAMENTO E CUPOM */}
            <div className="tp-course-details-2-widget-social mt-40 d-flex align-items-center justify-content-between">
               <div className="tp-course-details-2-widget-social-share">
                  <a href="#" style={{ fontSize: '14px', color: '#64748B' }}>
                     <i className="fa-light fa-share-nodes mr-8"></i> Share this course
                  </a>
               </div>
               <div className="tp-course-details-2-widget-coupon">
                  <button style={{ color: '#FF6F06', fontWeight: '600', border: 'none', background: 'none' }}>Apply coupon</button>
               </div>
            </div>
         </div>

         {/* O MODAL NATIVO */}
         {isVideoOpen && finalVideoId && (
            <div className="video-modal-overlay" onClick={() => setIsVideoOpen(false)}>
               <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
                  {/* Botão de fechar visível e pulsante (Fidelidade image_0.png) */}
                  <button className="video-modal-close pulse-close" onClick={() => setIsVideoOpen(false)}>
                     <i className="fa-regular fa-xmark"></i>
                  </button>
                  <iframe
                     width="100%"
                     height="100%"
                     src={`https://www.youtube.com/embed/${finalVideoId}?autoplay=1`}
                     title="YouTube video player"
                     frameBorder="0"
                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                     allowFullScreen
                  ></iframe>
               </div>
            </div>
         )}

         <style jsx>{`
            .pulse-button {
               width: 70px;
               height: 70px;
               background-color: #fff;
               color: #1d4ed8;
               border-radius: 50%;
               display: flex;
               align-items: center;
               justify-content: center;
               font-size: 22px;
               border: none;
               cursor: pointer;
               box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.7);
               animation: pulse 2s infinite;
            }
            @keyframes pulse {
               0% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.7); transform: scale(0.95); }
               70% { box-shadow: 0 0 0 15px rgba(255, 255, 255, 0); transform: scale(1); }
               100% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0); transform: scale(0.95); }
            }
            
            /* ESTILOS DO MODAL ACADIA */
            .video-modal-overlay {
               position: fixed;
               top: 0;
               left: 0;
               width: 100vw;
               height: 100vh;
               background-color: rgba(0, 0, 0, 0.85); /* Fundo escuro Acadia */
               z-index: 9999;
               display: flex;
               align-items: center;
               justify-content: center;
            }
            .video-modal-content {
               position: relative;
               width: 80%;
               /* max-width reduzida para 700px para garantir visibilidade do botão de fechar */
               max-width: 700px;
               aspect-ratio: 16/9;
               background: #000;
               border-radius: 8px;
               box-shadow: 0 10px 30px rgba(0,0,0,0.5);
            }
            .video-modal-close {
               position: absolute;
               top: -40px;
               right: 0;
               background: none;
               border: none;
               color: #fff;
               font-size: 30px;
               cursor: pointer;
               transition: color 0.3s;
               zIndex: 100;
            }
            .video-modal-close:hover {
               color: #FF6F06;
            }

            /* Animação pulsante para o botão de fechar (image_0.png) */
            .pulse-close {
               animation: pulse-close-animation 2s infinite;
            }
            @keyframes pulse-close-animation {
               0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.7); }
               70% { transform: scale(1.05); box-shadow: 0 0 0 10px rgba(255, 255, 255, 0); }
               100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(255, 255, 255, 0); }
            }
         `}</style>
      </>
   );
}