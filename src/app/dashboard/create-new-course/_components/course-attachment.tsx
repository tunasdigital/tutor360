'use client';

import { UploadTwoSvg } from "@/components/svg";
import { useState, useRef, useEffect } from "react";

type IProps = {
    courseToEdit?: any;
};

export default function CourseAttachment({ courseToEdit }: IProps) {
    // A-1: Estados separados para o que é NOVO e o que JÁ ESTÁ SALVO
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [existingFiles, setExistingFiles] = useState<any[]>([]);
    
    const hiddenFileInputRef = useRef<HTMLInputElement>(null);

    // Carrega os arquivos que a página principal (page.tsx) buscou no banco
    useEffect(() => {
        if (courseToEdit?.attachments && Array.isArray(courseToEdit.attachments)) {
            setExistingFiles(courseToEdit.attachments);
        }
    }, [courseToEdit]);

    // Sincronizador do input hidden para envio de novos arquivos
    useEffect(() => {
        if (hiddenFileInputRef.current) {
            const dataTransfer = new DataTransfer();
            selectedFiles.forEach(file => dataTransfer.items.add(file));
            hiddenFileInputRef.current.files = dataTransfer.files;
        }
    }, [selectedFiles]);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files);
            setSelectedFiles(prev => [...prev, ...newFiles]);
        }
        e.target.value = '';
    };

    const handleRemoveSelectedFile = (indexToRemove: number) => {
        setSelectedFiles(prev => prev.filter((_, index) => index !== indexToRemove));
    };

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
                    
                    <div className="mb-20">
                        <p className="text-muted" style={{ fontSize: '14px' }}>
                            Enriqueça a experiência do aluno disponibilizando PDFs, planilhas, mapas mentais e outros arquivos de apoio.
                        </p>
                    </div>

                    <input 
                        type="file" 
                        name="attachments[]" 
                        multiple 
                        ref={hiddenFileInputRef} 
                        style={{ display: 'none' }} 
                    />

                    {/* A-2: Bloco visual para arquivos que JÁ ESTÃO NO BANCO/VERCEL BLOB */}
                    {existingFiles.length > 0 && (
                        <div className="mb-4">
                            <h6 className="mb-3" style={{ fontSize: '14px', fontWeight: '600', color: '#10B981' }}>
                                <i className="fa-solid fa-cloud-check mr-5"></i> Arquivos Salvos na Nuvem:
                            </h6>
                            <div className="d-flex flex-column gap-2">
                                {existingFiles.map((file) => (
                                    <div key={file.id} className="d-flex align-items-center justify-content-between p-3 rounded" style={{ border: '1px solid #E2E8F0', backgroundColor: '#F8FAFC' }}>
                                        <div className="d-flex align-items-center gap-3">
                                            <div style={{ backgroundColor: '#D1FAE5', padding: '10px', borderRadius: '8px', color: '#10B981' }}>
                                                <i className="fa-solid fa-cloud"></i>
                                            </div>
                                            <div>
                                                <span style={{ fontWeight: '600', color: '#0F172A', display: 'block', fontSize: '14px' }}>
                                                    {file.name}
                                                </span>
                                                <span style={{ fontSize: '12px', color: '#64748B' }}>
                                                    {file.size ? `${file.size.toFixed(2)} MB` : 'Tamanho desconhecido'}
                                                </span>
                                            </div>
                                        </div>
                                        <a 
                                            href={file.url} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="btn btn-sm"
                                            style={{ backgroundColor: '#10B981', color: 'white', fontWeight: '500', fontSize: '12px', borderRadius: '6px' }}
                                            title="Baixar ou visualizar arquivo"
                                        >
                                            <i className="fa-solid fa-download mr-5"></i> Ver Arquivo
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* A-3: Bloco visual para NOVOS arquivos selecionados */}
                    {selectedFiles.length > 0 && (
                        <div className="mb-4 mt-4">
                            <h6 className="mb-3" style={{ fontSize: '14px', fontWeight: '600', color: '#475569' }}>
                                Novos Arquivos Prontos para Envio:
                            </h6>
                            <div className="d-flex flex-column gap-2">
                                {selectedFiles.map((file, index) => (
                                    <div key={index} className="d-flex align-items-center justify-content-between p-3 rounded" style={{ border: '1px solid #E2E8F0', backgroundColor: '#F8FAFC' }}>
                                        <div className="d-flex align-items-center gap-3">
                                            <div style={{ backgroundColor: '#E0E7FF', padding: '10px', borderRadius: '8px', color: '#4F46E5' }}>
                                                <i className="fa-solid fa-paperclip"></i>
                                            </div>
                                            <div>
                                                <span style={{ fontWeight: '600', color: '#0F172A', display: 'block', fontSize: '14px' }}>
                                                    {file.name}
                                                </span>
                                                <span style={{ fontSize: '12px', color: '#64748B' }}>
                                                    {(file.size / 1024 / 1024).toFixed(2)} MB
                                                </span>
                                            </div>
                                        </div>
                                        <button 
                                            type="button" 
                                            onClick={() => handleRemoveSelectedFile(index)}
                                            style={{ border: 'none', background: 'transparent', color: '#EF4444', fontWeight: '500', fontSize: '14px' }}
                                            title="Remover anexo"
                                        >
                                            <i className="fa-regular fa-trash-can mr-5"></i> Remover
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="tpd-new-course-instructor mt-3">
                        <span className="upload-btn">
                            <input 
                                id="tpd-new-course-file" 
                                type="file" 
                                multiple 
                                onChange={handleFileSelect}
                            />
                            <label htmlFor="tpd-new-course-file" style={{ cursor: 'pointer' }}>
                                <span><UploadTwoSvg /></span> Selecionar Arquivos
                            </label>
                        </span>
                    </div>

                </div>
            </div>
        </div>
    )
}