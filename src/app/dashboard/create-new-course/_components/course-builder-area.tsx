'use client';
import AnnouncementModal from "@/components/modal/announcement-modal";
import { PlusFiveSvg } from "@/components/svg";
import useGlobalContext from "@/hooks/use-global-context";

export default function CourseBuilderArea() {
    const { handleAnnounceAddEditModal } = useGlobalContext();
    return (
        <div className="accordion-item">
            <h2 className="accordion-header">
                <button className="accordion-button collapsed tpd-new-course-heading-title" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
                    Grade Curricular (Construtor)
                </button>
            </h2>
            <div id="panelsStayOpen-collapseThree" className="accordion-collapse collapse">
                <div className="accordion-body">
                    
                    {/* Texto de apoio (Empty State) inserido para melhorar a UX na apresentação */}
                    <div className="mb-20">
                        <p className="text-muted" style={{ fontSize: '14px' }}>
                            Monte a estrutura do seu curso criando Módulos e adicionando aulas, quizzes e tarefas dentro deles.
                        </p>
                    </div>

                    <div className="tpd-new-course-modal-btn">

                        {/* Botão para abrir o modal de novo módulo */}
                        <button type="button" className="btn btn-primary" onClick={() => handleAnnounceAddEditModal()} data-bs-whatever="@fat">
                            <span><PlusFiveSvg /></span> Adicionar Novo Módulo
                        </button>
                        {/* Fim do botão do modal */}

                        {/* Modal de criação de módulo/anúncio */}
                        <AnnouncementModal />
                        {/* Fim do modal */}

                    </div>
                </div>
            </div>
        </div>
    )
}