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
                    Vídeo de Introdução do Curso
                </button>
            </h2>
            <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse">
                <div className="accordion-body">
                    <div className="tpd-new-course-wrapper">
                        <div className="tpd-new-course-categories">
                            <div className="tpd-input">
                                <label>Fonte do Vídeo de Introdução</label>
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}