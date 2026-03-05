'use client';

import { useState, useTransition, useEffect } from "react";
import CourseAttachment from "./course-attachment";
import CourseBuilderArea from "./course-builder-area";
import CourseCertificate from "./course-certificate";
import CourseInfoArea from "./course-info-area";
import CourseInstructor from "./course-instructor";
import CoursePrerequisites from "./course-prerequisites";
import { publishCourseAction } from "@/actions/course-actions";

type IProps = {
    courseToEdit?: any; 
}

export default function CreateNewCourseArea({ courseToEdit }: IProps) {
    const courseId = courseToEdit?.id || "";
    const [isPending, startTransition] = useTransition();

    // A-3: Estado centralizado para a Grade Curricular (Aba 5)
    const [curriculumData, setCurriculumData] = useState(courseToEdit?.modules || []);

    useEffect(() => {
        if (courseToEdit?.modules) {
            setCurriculumData(courseToEdit.modules);
        }
    }, [courseToEdit]);

    // A-1: Função de submissão vitoriosa
    const handleFormSubmit = async (formData: FormData) => {
        // Garante que os dados da grade entrem no envelope de envio
        formData.append("curriculum", JSON.stringify(curriculumData));

        startTransition(async () => {
            try {
                await publishCourseAction(formData);
            } catch (err) {
                console.error("Erro técnico na Action:", err);
            }
        });
    };

    return (
        <main className="tp-dashboard-body-bg p-relative">
            <div className="tpd-dashboard-wrap-bg" style={{ backgroundImage: "url(/assets/img/dashboard/bg/dashboard-bg-shape-1.jpg)" }}>
                
                {/* O Formulário mestre recuperado da versão funcional */}
                <form action={handleFormSubmit} id="course-publish-form">
                    <input type="hidden" name="courseId" value={courseId} />
                    
                    {/* Backup do dado para o servidor para garantir persistência da grade */}
                    <input type="hidden" name="curriculum" value={JSON.stringify(curriculumData)} />

                    <section className="tpd-new-course-area pb-120 pt-80">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-8">
                                    <div className="tpd-new-course-wrap">
                                        <div className="tpd-new-course-box">
                                            
                                            <div className="accordion" id="accordionPanelsStayOpenExample">
                                                {/* A-2: Todas as abas agora recebem os dados para deixarem de ser mockups */}
                                                <CourseInfoArea courseToEdit={courseToEdit} />
                                                
                                                <CourseBuilderArea 
                                                    courseToEdit={courseToEdit} 
                                                    onCurriculumChange={(data: any) => setCurriculumData(data)} 
                                                />

                                                <CourseInstructor courseToEdit={courseToEdit} />
                                                <CourseAttachment courseToEdit={courseToEdit} />
                                                <CoursePrerequisites courseToEdit={courseToEdit} />
                                                <CourseCertificate courseToEdit={courseToEdit} />
                                            </div>

                                            {/* Botão de Salvamento funcional integrado ao layout */}
                                            <div className="mt-50 p-4 rounded-3 d-flex justify-content-between align-items-center" style={{ backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                                                <div>
                                                    <h5 className="mb-1" style={{ fontWeight: '700' }}>Finalizar Configurações</h5>
                                                    <p className="m-0 text-muted" style={{ fontSize: '13px' }}>
                                                        Sincronizando todas as abas com o banco de dados.
                                                    </p>
                                                </div>
                                                
                                                <button 
                                                    type="submit" 
                                                    disabled={isPending}
                                                    className="btn btn-primary px-5" 
                                                    style={{ 
                                                        height: '55px', fontSize: '16px', fontWeight: '700',
                                                        backgroundColor: isPending ? '#94A3B8' : '#4F46E5',
                                                        borderRadius: '10px', border: 'none', color: 'white'
                                                    }}
                                                >
                                                    <i className={`fa-regular ${isPending ? 'fa-spinner fa-spin' : 'fa-cloud-arrow-up'} mr-10`}></i>
                                                    {isPending ? "Salvando..." : "Salvar e Atualizar"}
                                                </button>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </form>
            </div>
        </main>
    )
}