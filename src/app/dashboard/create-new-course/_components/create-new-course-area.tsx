'use client';

import CourseAdditionalInfo from "./course-additional-info";
import CourseAttachment from "./course-attachment";
import CourseBuilderArea from "./course-builder-area";
import CourseCertificate from "./course-certificate";
import CourseInfoArea from "./course-info-area";
import CourseInstructor from "./course-instructor";
import CoursePrerequisites from "./course-prerequisites";
import { publishCourseAction } from "@/actions/course-actions";

const listData = [
    "Configure a opção de Preço do Curso ou defina-o como gratuito.",
    "O tamanho padrão para a miniatura (thumbnail) do curso é 700x430 pixels.",
    "A seção de Vídeo controla o vídeo de apresentação (pitch) do curso.",
    "O Construtor de Cursos é onde você cria e organiza toda a estrutura do conteúdo.",
    "Adicione Tópicos no Construtor para criar aulas em vídeo, quizzes e tarefas.",
];

type IProps = {
    courseToEdit?: any; 
}

export default function CreateNewCourseArea({ courseToEdit }: IProps) {
    return (
        <main className="tp-dashboard-body-bg p-relative">
            <div className="tpd-dashboard-wrap-bg" style={{ backgroundImage: "url(/assets/img/dashboard/bg/dashboard-bg-shape-1.jpg)" }}>

                <section className="tpd-new-course-area pt-80 pb-120">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8">
                                <div className="tpd-new-course-wrap">
                                    <div className="tpd-new-course-box">

                                        {/* FORMULÁRIO MESTRE */}
                                        <form action={publishCourseAction} id="master-course-form">
                                            
                                            {/* ID DO CURSO: Fundamental para a Action saber quem atualizar */}
                                            <input type="hidden" name="courseId" value={courseToEdit?.id || ""} />

                                            <div className="accordion" id="accordionPanelsStayOpenExample">

                                                {/* PONTE 1: Informações e Vídeo */}
                                                <CourseInfoArea courseToEdit={courseToEdit} />

                                                {/* 🚀 PONTE 2 (O ERRO PROVÁVEL ESTAVA AQUI): 
                                                    O construtor precisa receber o courseToEdit para ler os módulos! */}
                                                <CourseBuilderArea courseToEdit={courseToEdit} />

                                                <CourseInstructor />
                                                <CourseAttachment />
                                                <CourseAdditionalInfo />
                                                <CoursePrerequisites />
                                                <CourseCertificate />

                                            </div>

                                            {/* BOTÃO MESTRE */}
                                            <div className="mt-40 text-center">
                                                <button type="submit" className="tp-btn-13 w-100" style={{ height: '60px', fontSize: '18px' }}>
                                                    Salvar e Atualizar Curso Completo
                                                </button>
                                                <p className="mt-15" style={{ fontSize: '13px', color: '#64748B' }}>
                                                    Use este botão para garantir que todos os dados do formulário sejam gravados no banco.
                                                </p>
                                            </div>

                                        </form>

                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="tpd-course-enroll-list">
                                    <h2 className="tp-dashboard-title">Dicas para Publicação</h2>
                                    <ul>
                                        {listData.map((tip, index) => (
                                            <li key={index}>
                                                <span>{index + 1}. </span>
                                                {tip}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    )
}