'use client';

import Image from "next/image";
import React, { useState, useEffect } from "react";

type IProps = {
  courseToEdit?: any;
};

export default function CourseCertificate({ courseToEdit }: IProps) {
  // A-2: Estado dinâmico para o template. Começa com o do banco ou o padrão (1)
  const [selectedTemplate, setSelectedTemplate] = useState<string>("1");

  const certificateData = [
    { id: "1", imgSrc: "/assets/img/dashboard/cartificate/cartificate-1.png" },
    { id: "2", imgSrc: "/assets/img/dashboard/cartificate/cartificate-2.png" },
    { id: "3", imgSrc: "/assets/img/dashboard/cartificate/cartificate-3.png" },
    { id: "4", imgSrc: "/assets/img/dashboard/cartificate/cartificate-4.png" },
    { id: "5", imgSrc: "/assets/img/dashboard/cartificate/cartificate-5.png" }
  ];

  // A-1: Sincroniza a seleção visual com os dados vindos do banco
  useEffect(() => {
    if (courseToEdit?.certificateTemplate) {
      setSelectedTemplate(courseToEdit.certificateTemplate);
    }
  }, [courseToEdit]);

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
          
          <div className="mb-30">
            <p className="text-muted" style={{ fontSize: '14px' }}>
              Selecione o design do certificado que será gerado e emitido automaticamente aos alunos ao atingirem 100% de conclusão.
            </p>
          </div>

          {/* A-3: O "Fio Conector" - Este input invisível leva o valor para a Action */}
          <input type="hidden" name="certificateTemplate" value={selectedTemplate} />

          <div className="tpd-new-course-instructor">
            <div className="row">
              {certificateData.map((certificate) => (
                <div key={certificate.id} className="col-lg-4 col-sm-6">
                  <div 
                    className="tpd-new-course-cartificate mb-30 p-relative" 
                    style={{ cursor: 'pointer' }}
                    onClick={() => setSelectedTemplate(certificate.id)}
                  >
                    <Image 
                      src={certificate.imgSrc} 
                      alt={`Modelo de certificado ${certificate.id}`} 
                      width={215} 
                      height={276} 
                      style={{
                        height: 'auto', 
                        border: selectedTemplate === certificate.id ? '3px solid #0055FF' : '1px solid #EAEAEA', 
                        borderRadius: '8px', 
                        padding: '5px',
                        transition: 'all 0.3s ease',
                        boxShadow: selectedTemplate === certificate.id ? '0px 10px 20px rgba(0, 85, 255, 0.1)' : 'none'
                      }} 
                    />
                    
                    {/* Checkmark dinâmico baseado no estado selecionado */}
                    {selectedTemplate === certificate.id && (
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
                        fontWeight: 'bold',
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)'
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