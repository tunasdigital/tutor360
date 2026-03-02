import { CloseEyeThree, CloseEyeTwo, DeleteSvg, DraftTwoSvg, OpenEyeThree, PenSvg } from "@/components/svg";
import Image from "next/image";

// Dados de certificados traduzidos para a realidade Tutor360
const certificateData = [
   {
      id: 1,
      title: "Fundamentos de Design",
      status: "Rascunho",
      isPublished: false,
      image: "/assets/img/dashboard/bg/certificate.png",
   },
   {
      id: 2,
      title: "Fundamentos de UI/UX",
      status: "Rascunho",
      isPublished: false,
      image: null,
   },
   {
      id: 3,
      title: "Desenvolvimento Web Avançado",
      status: "Publicado",
      isPublished: true,
      image: "/assets/img/dashboard/bg/certificate.png",
   },
   {
      id: 4,
      title: "Masterclass em Design Gráfico",
      status: "Publicado",
      isPublished: true,
      image: null,
   },
   {
      id: 5,
      title: "Especialista em Marketing Digital",
      status: "Rascunho",
      isPublished: false,
      image: null,
   },
];


export default function InstructorCertificateArea() {
   return (
      <>
         {/* Início da área da seção */}
         <div className="section-area">
            <div className="row">
               <div className="col-lg-6">
                  <div className="tp-dashboard-section mb-20">
                     {/* Nacionalização do título */}
                     <h2 className="tp-dashboard-title">Galeria de Certificados</h2>
                     <p className="text-muted" style={{ fontSize: '14px' }}>Gerencie os modelos de certificados disponíveis para emissão aos alunos.</p>
                  </div>
               </div>
            </div>
         </div>
         {/* Fim da área da seção */}

         {/* Início da área de certificados */}
         <div className="tpd-course-area">
            <div className="row">
               <div className="col-12">
                  <div className="tpd-certificate-table li-hover-none mb-25">
                     <ul>
                        {certificateData.map((certificate, index) => (
                           <li key={index}>
                              <div className="tpd-table-row">
                                 <div className="tpd-certificate-box d-flex justify-content-between align-items-center">
                                    <div className="tpd-certificate-info d-flex align-items-center">
                                       {certificate.image && (
                                          <div className="tpd-certificate-img mr-15">
                                             <Image src={certificate.image} alt="Certificado" width={90} height={64} style={{ borderRadius: '4px', border: '1px solid #eee' }} />
                                          </div>
                                       )}
                                       <h4 className="tpd-certificate-title">{certificate.title}</h4>
                                    </div>
                                    <div className="tpd-cartificate-btn-box d-flex">
                                       <div className="tpd-certificate-badges">
                                          <button className={`tpd-certificate-badge ${certificate.isPublished ? 'active' : ''}`}>
                                             <span className="tpd-certificate-badge-text">
                                                <span className="tpd-certificate-badge-file">
                                                   {certificate.isPublished ? <OpenEyeThree /> : <DraftTwoSvg />}
                                                </span>
                                                {/* Exibição do status traduzido */}
                                                {certificate.status}
                                             </span>
                                             <span className="tpd-certificate-badge-publish">
                                                {certificate.isPublished ? <CloseEyeThree /> : <CloseEyeTwo />}
                                             </span>
                                          </button>
                                       </div>
                                       <div className="tpd-certificate-edit">
                                          <div className="tpd-action-inexact-btn">
                                             <button>
                                                <PenSvg />
                                                <span className="tpd-action-tooltip">Editar</span>
                                             </button>
                                          </div>
                                       </div>
                                       <div className="tpd-certificate-delete">
                                          <div className="tpd-action-inexact-btn">
                                             <button className="border-bg">
                                                <DeleteSvg />
                                                {/* Tooltip de exclusão adicionado para padronização de UX */}
                                                <span className="tpd-action-tooltip">Excluir</span>
                                             </button>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </li>
                        ))}
                     </ul>

                  </div>
               </div>
            </div>
         </div>
         {/* Fim da área de certificados */}
      </>
   )
}