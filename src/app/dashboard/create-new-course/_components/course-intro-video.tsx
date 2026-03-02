'use client';

import NiceSelect from "@/components/ui/nice-select";

export default function CourseIntroVideo() {
    function handleCourseFilter(item: { value: string, label: string }) {
        console.log(item);
    }
    return (
        <div className="accordion-item">
            <h2 className="accordion-header">
                <button className="accordion-button collapsed tpd-new-course-heading-title" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
                    Vídeo de Introdução (Pitch de Vendas)
                </button>
            </h2>
            <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse">
                <div className="accordion-body">
                    <div className="tpd-new-course-wrapper">
                        <div className="tpd-new-course-categories">
                            
                            <div className="tpd-input mb-20">
                                <label>Fonte do Vídeo</label>
                                <div className="tpd-select">
                                    <NiceSelect
                                        options={[
                                            { value: "", label: "Selecione a fonte" },
                                            { value: "youtube", label: "YouTube" },
                                            { value: "vimeo", label: "Vimeo" },
                                            { value: "external", label: "Link Externo" },
                                            { value: "upload", label: "Upload Direto" },
                                        ]}
                                        defaultCurrent={0}
                                        onChange={handleCourseFilter}
                                        name="courseSort"
                                    />
                                </div>
                            </div>

                            {/* Campo de URL adicionado para dar realismo e funcionalidade à interface */}
                            <div className="tpd-input">
                                <label>URL do Vídeo</label>
                                <input type="text" placeholder="Cole o link do vídeo aqui (ex: https://vimeo.com/...)" />
                                <p className="text-muted mt-2" style={{ fontSize: '13px' }}>
                                    Este vídeo aparecerá na página de vendas do curso para atrair e converter novos alunos.
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}