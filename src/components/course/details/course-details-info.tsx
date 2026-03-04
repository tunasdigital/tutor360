'use client';
import React from "react";
import { ICourseDT } from "@/types/course-d-t";

type IProps = { 
   course: ICourseDT; 
};

export default function CourseDetailsInfo({ course }: IProps) {
   const { description, whatYouWillLearn } = course || {};

   return (
      <div className="tp-course-details-2-info">
         {/* 📝 ÁREA SOBRE O CURSO */}
         <div className="tp-course-details-2-text mb-40">
            <h4 className="tp-course-details-2-main-title" style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '15px', color: '#000' }}>
               Sobre o Curso
            </h4>
            <div style={{ whiteSpace: 'pre-line', color: '#4F5E64', lineHeight: '1.7', fontSize: '16px' }}>
               {description || "A descrição deste curso está sendo atualizada. Em breve mais detalhes."}
            </div>
         </div>

         {/* 🚀 F04 - TÓPICOS DESEMBOLADOS (A Mágica do Grid e Flexbox) */}
         <div className="tp-course-details-2-list mt-40 mb-40">
            <h4 className="tp-course-details-2-main-title" style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '25px', color: '#000' }}>
               O que você vai aprender
            </h4>
            
            {/* Usamos o sistema de Grid do Bootstrap (row) para organizar em colunas */}
            <div className="row">
               {whatYouWillLearn && whatYouWillLearn.length > 0 ? (
                  whatYouWillLearn.map((item, index) => (
                     // col-lg-6 divide a lista em 2 colunas em telas grandes. col-md-12 deixa 1 coluna no celular.
                     <div className="col-lg-6 col-md-12 mb-20" key={index}>
                        {/* d-flex align-items-start garante que o ícone fique no topo se o texto tiver 2 linhas */}
                        <div className="d-flex align-items-start" style={{ gap: '12px' }}>
                           <i 
                              className="fa-regular fa-check" 
                              style={{ color: '#1d4ed8', fontSize: '18px', marginTop: '4px', flexShrink: 0 }}
                           ></i>
                           <span style={{ color: '#4F5E64', fontSize: '15.5px', lineHeight: '1.6' }}>
                              {item}
                           </span>
                        </div>
                     </div>
                  ))
               ) : (
                  <div className="col-12">
                     <span style={{ color: '#4F5E64' }}>Conteúdo focado em resultados reais.</span>
                  </div>
               )}
            </div>
         </div>
      </div>
   );
}