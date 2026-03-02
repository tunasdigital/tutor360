import { UploadTwoSvg } from "@/components/svg";

export default function CourseAttachment() {
    return (
        <div className="accordion-item">
            <h2 className="accordion-header">
                <button 
                   className="accordion-button collapsed tpd-new-course-heading-title" 
                   type="button" 
                   data-bs-toggle="collapse" 
                   data-bs-target="#panelsStayOpen-collapseFive" 
                   aria-expanded="false" 
                   aria-controls="panelsStayOpen-collapseFive"
                >
                    Materiais Complementares (Anexos)
                </button>
            </h2>
            <div id="panelsStayOpen-collapseFive" className="accordion-collapse collapse">
                <div className="accordion-body">
                    
                    {/* Texto de apoio (UX Copy) para valorizar a apresentação aos sócios */}
                    <div className="mb-20">
                        <p className="text-muted" style={{ fontSize: '14px' }}>
                            Enriqueça a experiência do aluno disponibilizando PDFs, planilhas, mapas mentais e outros arquivos de apoio.
                        </p>
                    </div>

                    <div className="tpd-new-course-instructor">
                        <span className="upload-btn">
                            {/* Adicionado o atributo 'multiple' para dar realismo na seleção de arquivos */}
                            <input id="tpd-new-course-file" type="file" multiple />
                            <label htmlFor="tpd-new-course-file">
                               <span><UploadTwoSvg /></span> Enviar Arquivos
                            </label>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}