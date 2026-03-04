'use client';
import { useState, useEffect } from "react";
import { PlusFiveSvg } from "@/components/svg";

type IProps = {
    courseToEdit?: any; 
};

export default function CourseBuilderArea({ courseToEdit }: IProps) {
    const [modules, setModules] = useState<{ id: string; title: string }[]>([]);
    const [isAddingModule, setIsAddingModule] = useState(false);
    const [newModuleTitle, setNewModuleTitle] = useState("");

    // 🚀 RASTREADOR DE DIAGNÓSTICO:
    // Isso vai imprimir no console do seu navegador (F12) o que o servidor está enviando.
    useEffect(() => {
        console.log("DEBUG PERSISTÊNCIA - Dados recebidos do servidor:", courseToEdit?.modules);
        
        if (courseToEdit?.modules && courseToEdit.modules.length > 0) {
            const loadedModules = courseToEdit.modules.map((m: any) => ({
                id: m.id,
                title: m.title
            }));
            setModules(loadedModules);
        } else {
            console.warn("AVISO: O servidor enviou uma lista de módulos VAZIA ou INDEFINIDA.");
        }
    }, [courseToEdit]);

    const handleSaveModule = () => {
        if (newModuleTitle.trim() === "") return;
        const newModule = { id: Date.now().toString(), title: newModuleTitle };
        setModules([...modules, newModule]);
        setNewModuleTitle(""); 
        setIsAddingModule(false); 
    };

    const handleDeleteModule = (idToRemove: string) => {
        setModules(modules.filter(m => m.id !== idToRemove));
    };

    return (
        <div className="accordion-item mb-20">
            <h2 className="accordion-header">
                <button className="accordion-button collapsed tpd-new-course-heading-title" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree">
                    5. Grade Curricular (Construtor de Módulos)
                </button>
            </h2>
            <div id="panelsStayOpen-collapseThree" className="accordion-collapse collapse show">
                <div className="accordion-body">
                    
                    {/* LISTA DE MÓDULOS */}
                    {modules.length > 0 ? (
                        <div className="mb-30">
                            {modules.map((mod, index) => (
                                <div key={mod.id} className="p-3 mb-15 d-flex justify-content-between align-items-center" style={{ backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px' }}>
                                    <span style={{ fontWeight: '600', color: '#0F172A' }}>
                                        <i className="fa-regular fa-folder-open mr-10" style={{ color: '#1D4ED8' }}></i> 
                                        Módulo {index + 1}: {mod.title}
                                    </span>
                                    <div>
                                        <input type="hidden" name="moduleTitles[]" value={mod.title} />
                                        <button type="button" onClick={() => handleDeleteModule(mod.id)} style={{ border: 'none', background: 'none', color: '#EF4444' }}>
                                            <i className="fa-regular fa-trash mr-5"></i> Excluir
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="p-4 mb-20 text-center" style={{ border: '1px dashed #E2E8F0', borderRadius: '8px' }}>
                            <p className="mb-0 text-muted">Nenhum módulo encontrado. Adicione o primeiro abaixo.</p>
                        </div>
                    )}

                    {/* ÁREA DE CRIAÇÃO */}
                    {isAddingModule ? (
                        <div className="p-4 mb-20" style={{ backgroundColor: '#EEF4FF', border: '1px dashed #1D4ED8', borderRadius: '8px' }}>
                            <input 
                                type="text" 
                                className="form-control mb-15"
                                placeholder="Nome do Módulo" 
                                value={newModuleTitle}
                                onChange={(e) => setNewModuleTitle(e.target.value)}
                            />
                            <div className="d-flex gap-2">
                                <button type="button" onClick={handleSaveModule} className="btn btn-primary">Salvar</button>
                                <button type="button" onClick={() => setIsAddingModule(false)} className="btn btn-light">Cancelar</button>
                            </div>
                        </div>
                    ) : (
                        <button type="button" className="btn btn-primary w-100" onClick={() => setIsAddingModule(true)}>
                            <span><PlusFiveSvg /></span> Adicionar Novo Módulo
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}