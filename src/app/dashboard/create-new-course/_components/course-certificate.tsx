import Image from "next/image";
import React from "react";

export default function CourseCertificate() {
   const certificateData = [
      { id: 1, imgSrc: "/assets/img/dashboard/cartificate/cartificate-1.png"},
      { id: 2, imgSrc: "/assets/img/dashboard/cartificate/cartificate-2.png"},
      { id: 3, imgSrc: "/assets/img/dashboard/cartificate/cartificate-3.png"},
      { id: 4, imgSrc: "/assets/img/dashboard/cartificate/cartificate-4.png"},
      { id: 5, imgSrc: "/assets/img/dashboard/cartificate/cartificate-5.png"}
   ];

   return (
      <div className="accordion-item">
         <h2 className="accordion-header">
            <button
               className="accordion-button collapsed tpd-new-course-heading-title"
               type="button"
               data-bs-toggle="collapse"
               data-bs-target="#panelsStayOpen-collapseEight"
               aria-expanded="false"
               aria-controls="panelsStayOpen-collapseEight"
            >
               Certificado de Conclusão
            </button>
         </h2>
         <div id="panelsStayOpen-collapseEight" className="accordion-collapse collapse">
            <div className="accordion-body">
               
               {/* Texto de apoio (UX Copy) focado em automação e recompensa */}
               <div className="mb-30">
                  <p className="text-muted" style={{ fontSize: '14px' }}>
                     Selecione o design do certificado que será gerado e emitido automaticamente aos alunos ao atingirem 100% de conclusão.
                  </p>
               </div>

               <div className="tpd-new-course-instructor">
                  <div className="row">
                     {certificateData.map((certificate) => (
                        <div key={certificate.id} className="col-lg-4 col-sm-6">
                           {/* Adicionado mock visual de "Selecionado" no primeiro item para a apresentação */}
                           <div className="tpd-new-course-cartificate mb-30 p-relative" style={{ cursor: 'pointer' }}>
                              <Image 
                                 src={certificate.imgSrc} 
                                 alt={`Modelo de certificado ${certificate.id}`} 
                                 width={215} 
                                 height={276} 
                                 style={{
                                    height: 'auto', 
                                    border: certificate.id === 1 ? '3px solid #0055FF' : '1px solid #EAEAEA', 
                                    borderRadius: '8px', 
                                    padding: '5px',
                                    transition: 'all 0.3s ease'
                                 }} 
                              />
                              {certificate.id === 1 && (
                                  <div style={{
                                      position: 'absolute', 
                                      top: '-10px', 
                                      right: '10px', 
                                      backgroundColor: '#0055FF', 
                                      color: '#fff', 
                                      borderRadius: '50%', 
                                      width: '24px', 
                                      height: '24px', 
                                      display: 'flex', 
                                      alignItems: 'center', 
                                      justifyContent: 'center', 
                                      fontSize: '12px',
                                      fontWeight: 'bold'
                                  }}>
                                      ✓
                                  </div>
                              )}
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}