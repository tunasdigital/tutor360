'use client';
import Image from "next/image";
import { UserSvgSix } from "@/components/svg";
import useGlobalContext from "@/hooks/use-global-context";
import profile_img from '@/assets/img/dashboard/profile/reviews-profile-4.png';


export default function CourseInstructor() {
    const { handleAnnounceAddEditModal } = useGlobalContext();
    return (
        <div className="accordion-item">
            <h2 className="accordion-header">
                <button className="accordion-button collapsed tpd-new-course-heading-title" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseFour" aria-expanded="false" aria-controls="panelsStayOpen-collapseFour">
                    Instrutores e Especialistas
                </button>
            </h2>
            <div id="panelsStayOpen-collapseFour" className="accordion-collapse collapse">
                <div className="accordion-body">
                    
                    {/* Texto de apoio (UX Copy) para agregar valor na apresentação */}
                    <div className="mb-20">
                        <p className="text-muted" style={{ fontSize: '14px' }}>
                            Defina o especialista principal ou adicione co-autores para este treinamento.
                        </p>
                    </div>

                    <div className="tpd-new-course-instructor">
                        <div className="tpd-new-course-instructor-user d-flex align-items-center">
                            <Image src={profile_img} alt="Imagem de perfil do instrutor" style={{height:'auto'}} />
                            {/* Nome ajustado para a identidade da plataforma */}
                            <span>Instrutor Tutor360</span>
                        </div>
                        {/* Botão de ação traduzido */}
                        <button type="button" className="btn btn-primary" onClick={() => handleAnnounceAddEditModal()} data-bs-whatever="@fat">
                           <span><UserSvgSix/></span> Adicionar Instrutor
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}