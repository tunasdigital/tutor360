'use client';
import { useState, useEffect } from "react";
import { PlusFiveSvg } from "@/components/svg";

type Lesson = {
    id: string;
    title: string;
    videoUrl: string;
    description: string; // 🚀 NOVO: Campo de Texto/Descrição da Aula
};

type Module = {
    id: string;
    title: string;
    lessons: Lesson[];
};

type IProps = {
    courseToEdit?: any; 
};

export default function CourseBuilderArea({ courseToEdit }: IProps) {
    const [modules, setModules] = useState<Module[]>([]);
    const [isAddingModule, setIsAddingModule] = useState(false);
    const [newModuleTitle, setNewModuleTitle] = useState("");

    useEffect(() => {
        if (courseToEdit?.modules && courseToEdit.modules.length > 0) {
            const loadedModules = courseToEdit.modules.map((m: any) => ({
                id: m.id,
                title: m.title,
                lessons: m.lessons.map((l: any) => ({
                    id: l.id,
                    title: l.title,
                    videoUrl: l.videoUrl || "",
                    description: l.description || "" // Carrega a descrição do banco
                })) || []
            }));
            setModules(loadedModules);
        }
    }, [courseToEdit]);

    // --- GESTÃO DE MÓDULOS ---
    const handleSaveModule = () => {
        if (newModuleTitle.trim() === "") return;
        setModules([...modules, { id: Date.now().toString(), title: newModuleTitle, lessons: [] }]);
        setNewModuleTitle(""); 
        setIsAddingModule(false); 
    };

    const handleDeleteModule = (idToRemove: string) => {
        setModules(modules.filter(m => m.id !== idToRemove));
    };

    // --- 🎥 GESTÃO DE AULAS MULTIMODAIS ---
    const handleAddLesson = (moduleId: string) => {
        const updatedModules = modules.map(mod => {
            if (mod.id === moduleId) {
                return {
                    ...mod,
                    lessons: [...mod.lessons, { id: `lesson-${Date.now()}`, title: "", videoUrl: "", description: "" }]
                };
            }
            return mod;
        });
        setModules(updatedModules);
    };

    const handleLessonChange = (moduleId: string, lessonId: string, field: keyof Lesson, value: string) => {
        const updatedModules = modules.map(mod => {
            if (mod.id === moduleId) {
                return {
                    ...mod,
                    lessons: mod.lessons.map(les => les.id === lessonId ? { ...les, [field]: value } : les)
                };
            }
            return mod;
        });
        setModules(updatedModules);
    };

    const handleDeleteLesson = (moduleId: string, lessonId: string) => {
        const updatedModules = modules.map(mod => {
            if (mod.id === moduleId) {
                return { ...mod, lessons: mod.lessons.filter(les => les.id !== lessonId) };
            }
            return mod;
        });
        setModules(updatedModules);
    };

    return (
        <div className="accordion-item mb-20">
            <h2 className="accordion-header">
                <button className="accordion-button collapsed tpd-new-course-heading-title" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree">
                    5. Grade Curricular (Construtor Multimodal)
                </button>
            </h2>
            <div id="panelsStayOpen-collapseThree" className="accordion-collapse collapse show">
                <div className="accordion-body">
                    
                    <div className="mb-30">
                        {modules.map((mod, modIndex) => (
                            <div key={mod.id} className="p-4 mb-20" style={{ backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '12px' }}>
                                
                                {/* CABEÇALHO DO MÓDULO */}
                                <div className="d-flex justify-content-between align-items-center mb-20">
                                    <span style={{ fontWeight: '700', color: '#1E293B', fontSize: '16px' }}>
                                        📦 Módulo {modIndex + 1}: {mod.title}
                                        <input type="hidden" name="moduleTitles[]" value={mod.title} />
                                    </span>
                                    <button type="button" onClick={() => handleDeleteModule(mod.id)} className="text-danger border-0 bg-transparent">
                                        <i className="fa-regular fa-trash"></i>
                                    </button>
                                </div>

                                {/* 🎥 LISTA DE AULAS */}
                                <div className="ml-20 pl-20" style={{ borderLeft: '2px solid #E2E8F0' }}>
                                    {mod.lessons.map((les, lesIndex) => (
                                        <div key={les.id} className="bg-white p-4 mb-15 rounded shadow-sm border">
                                            <div className="row g-3">
                                                {/* Título e Vídeo */}
                                                <div className="col-md-6">
                                                    <label style={{ fontSize: '12px', fontWeight: '600', color: '#64748B' }}>Título da Aula</label>
                                                    <input 
                                                        type="text" 
                                                        name={`lessonTitles_${modIndex}[]`}
                                                        className="form-control"
                                                        value={les.title}
                                                        onChange={(e) => handleLessonChange(mod.id, les.id, 'title', e.target.value)}
                                                        placeholder="Ex: Aula 01 - Boas Vindas"
                                                    />
                                                </div>
                                                <div className="col-md-5">
                                                    <label style={{ fontSize: '12px', fontWeight: '600', color: '#64748B' }}>ID do Vídeo ou Link</label>
                                                    <input 
                                                        type="text" 
                                                        name={`lessonVideos_${modIndex}[]`}
                                                        className="form-control"
                                                        value={les.videoUrl}
                                                        onChange={(e) => handleLessonChange(mod.id, les.id, 'videoUrl', e.target.value)}
                                                        placeholder="Ex: w6KjcavHFrA"
                                                    />
                                                </div>
                                                <div className="col-md-1 text-end pt-4">
                                                    <button type="button" onClick={() => handleDeleteLesson(mod.id, les.id)} className="btn btn-link text-danger p-0">
                                                        <i className="fa-regular fa-xmark"></i>
                                                    </button>
                                                </div>

                                                {/* 🚀 NOVO: CAMPO DE TEXTO DA AULA */}
                                                <div className="col-12 mt-10">
                                                    <label style={{ fontSize: '12px', fontWeight: '600', color: '#64748B' }}>Texto de Apoio / Descrição da Aula</label>
                                                    <textarea 
                                                        name={`lessonDescriptions_${modIndex}[]`}
                                                        className="form-control"
                                                        rows={3}
                                                        value={les.description}
                                                        onChange={(e) => handleLessonChange(mod.id, les.id, 'description', e.target.value)}
                                                        placeholder="Escreva aqui os pontos principais, links externos ou o resumo da aula..."
                                                        style={{ fontSize: '14px' }}
                                                    />
                                                </div>

                                                {/* NOTA SOBRE ANEXOS GLOBAIS */}
                                                <div className="col-12">
                                                    <p className="mb-0" style={{ fontSize: '11px', color: '#94A3B8' }}>
                                                        <i className="fa-regular fa-paperclip mr-5"></i> 
                                                        Anexos de arquivos podem ser gerenciados na sanfona "Materiais Complementares" abaixo para organização centralizada.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    
                                    <button type="button" onClick={() => handleAddLesson(mod.id)} className="mt-10" style={{ color: '#1D4ED8', background: 'none', border: 'none', fontSize: '14px', fontWeight: '600' }}>
                                        + Adicionar Aula ao Módulo
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* BOTÃO ADICIONAR MÓDULO */}
                    {isAddingModule ? (
                        <div className="p-4" style={{ backgroundColor: '#EEF4FF', border: '1px dashed #1D4ED8', borderRadius: '8px' }}>
                            <input 
                                type="text" 
                                className="form-control mb-15"
                                placeholder="Nome do Módulo" 
                                value={newModuleTitle}
                                onChange={(e) => setNewModuleTitle(e.target.value)}
                            />
                            <div className="d-flex gap-2">
                                <button type="button" onClick={handleSaveModule} className="btn btn-primary">Criar Módulo</button>
                                <button type="button" onClick={() => setIsAddingModule(false)} className="btn btn-light">Cancelar</button>
                            </div>
                        </div>
                    ) : (
                        <button type="button" className="btn btn-primary w-100" onClick={() => setIsAddingModule(true)} style={{ height: '55px', borderStyle: 'dashed' }}>
                             Adicionar Novo Módulo
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}