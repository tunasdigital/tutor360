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

    const [curriculumData, setCurriculumData] = useState(courseToEdit?.modules || []);

    useEffect(() => {
        if (courseToEdit?.modules) {
            setCurriculumData(courseToEdit.modules);
        }
    }, [courseToEdit]);

    const handleFormSubmit = async (formData: FormData) => {
        formData.append("curriculum", JSON.stringify(curriculumData));

        // A-1: Disparo limpo, sem try/catch, permitindo que a Action respire
        startTransition(() => {
            publishCourseAction(formData);
        });
    };

    return (
        <main className="tp-dashboard-body-bg p-relative">
            <div className="tpd-dashboard-wrap-bg" style={{ backgroundImage: "url(/assets/img/dashboard/bg/dashboard-bg-shape-1.jpg)" }}>
                <form action={handleFormSubmit} id="course-publish-form">
                    <input type="hidden" name="courseId" value={courseId} />
                    <section className="tpd-new-course-area pb-120 pt-80">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-8">
                                    <div className="tpd-new-course-wrap">
                                        <div className="tpd-new-course-box">
                                            
                                            <div className="accordion" id="accordionPanelsStayOpenExample">
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

                                            {/* A-2: Footer Restaurado */}
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
    );
}