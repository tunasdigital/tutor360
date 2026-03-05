'use client';

import Image from "next/image";
import { UserSvgSix } from "@/components/svg";
import { useState, useEffect } from "react";
import profile_img from '@/assets/img/dashboard/profile/reviews-profile-4.png';

type IProps = {
    courseToEdit?: any;
};

export default function CourseInstructor({ courseToEdit }: IProps) {
    // A-2: Estados para gerenciar a lista dinâmica de especialistas
    const [instructors, setInstructors] = useState<string[]>([]);
    const [newInstructor, setNewInstructor] = useState("");

    // A-1: Efeito para carregar os instrutores caso estejamos editando um curso
    useEffect(() => {
        if (courseToEdit?.instructors && Array.isArray(courseToEdit.instructors)) {
            setInstructors(courseToEdit.instructors);
        }
    }, [courseToEdit]);

    // Função para adicionar um novo nome à lista
    const handleAddInstructor = () => {
        const trimmedName = newInstructor.trim();
        if (trimmedName !== "" && !instructors.includes(trimmedName)) {
            setInstructors([...instructors, trimmedName]);
            setNewInstructor(""); // Limpa o campo após adicionar
        }
    };

    // Função para remover um instrutor caso o usuário erre
    const handleRemoveInstructor = (instructorToRemove: string) => {
        setInstructors(instructors.filter(inst => inst !== instructorToRemove));
    };

    return (
        <div className="accordion-item">
            <h2 className="accordion-header">
                <button className="accordion-button collapsed tpd-new-course-heading-title" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseFour" aria-expanded="false" aria-controls="panelsStayOpen-collapseFour">
                    Instrutores e Especialistas
                </button>
            </h2>
            <div id="panelsStayOpen-collapseFour" className="accordion-collapse collapse">
                <div className="accordion-body">
                    
                    <div className="mb-20">
                        <p className="text-muted" style={{ fontSize: '14px' }}>
                            Defina o especialista principal ou adicione co-autores para este treinamento.
                        </p>
                    </div>

                    {/* A-3: O Segredo da Fiação! Inputs ocultos que viajam no FormData */}
                    {instructors.map((inst, index) => (
                        <input key={index} type="hidden" name="instructors[]" value={inst} />
                    ))}

                    <div className="tpd-new-course-instructor">
                        
                        {/* Renderiza a lista de instrutores adicionados */}
                        {instructors.length > 0 && (
                            <div className="mb-4">
                                {instructors.map((inst, index) => (
                                    <div key={index} className="d-flex align-items-center justify-content-between mb-3 p-3 rounded" style={{ border: '1px solid #E2E8F0', backgroundColor: '#F8FAFC' }}>
                                        <div className="d-flex align-items-center">
                                            <Image src={profile_img} alt="Perfil" style={{ height: '45px', width: '45px', borderRadius: '50%', marginRight: '15px' }} />
                                            <span style={{ fontWeight: '600', color: '#0F172A' }}>{inst}</span>
                                        </div>
                                        <button 
                                            type="button" 
                                            onClick={() => handleRemoveInstructor(inst)}
                                            style={{ border: 'none', background: 'transparent', color: '#EF4444', fontWeight: '500', fontSize: '14px' }}
                                        >
                                            <i className="fa-regular fa-trash-can mr-5"></i> Remover
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* A-4: Área de input e botão para adicionar (Substitui o Modal) */}
                        <div className="d-flex align-items-center gap-3 mt-3">
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Nome do Especialista (ex: Tunas)" 
                                value={newInstructor}
                                onChange={(e) => setNewInstructor(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault(); // Evita que o formulário todo seja salvo ao dar Enter
                                        handleAddInstructor();
                                    }
                                }}
                                style={{ height: '50px' }}
                            />
                            <button 
                                type="button" 
                                className="btn btn-primary d-flex align-items-center gap-2" 
                                onClick={handleAddInstructor}
                                style={{ height: '50px', whiteSpace: 'nowrap' }}
                            >
                                <span><UserSvgSix/></span> Adicionar
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}