import CourseAdditionalInfo from "./course-additional-info";
import CourseAttachment from "./course-attachment";
import CourseBuilderArea from "./course-builder-area";
import CourseCertificate from "./course-certificate";
import CourseInfoArea from "./course-info-area";
import CourseInstructor from "./course-instructor";
// ❌ REMOVIDO: import CourseIntroVideo from "./course-intro-video"; (A Sanfona duplicada foi eliminada)
import CoursePrerequisites from "./course-prerequisites";
import { publishCourseAction } from "@/actions/course-actions";

// Dicas de Upload de Curso (Refinadas para o ecossistema Tutor360)
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

                {/* Início da área de criação de novo curso */}
                <section className="tpd-new-course-area pt-80 pb-120">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8">
                                <div className="tpd-new-course-wrap">
                                    <div className="tpd-new-course-box">

                                        {/* 🚀 O FORMULÁRIO MESTRE: Repare no ID "master-course-form" */}
                                        <form action={publishCourseAction} id="master-course-form">
                                            
                                            {/* ID do Curso Oculto */}
                                            <input type="hidden" name="courseId" value={courseToEdit?.id || ""} />

                                            <div className="accordion" id="accordionPanelsStayOpenExample">

                                                {/* Blocos 1, 2, 3 e 4 (Já inclui o Vídeo atualizado!) */}
                                                <CourseInfoArea courseToEdit={courseToEdit} />

                                                {/* ❌ A Sanfona Velha de Vídeo foi deletada daqui para não duplicar */}

                                                {/* 5. Área do construtor de cursos (grade curricular) */}
                                                <CourseBuilderArea />

                                                {/* 6. Área de seleção de instrutores */}
                                                <CourseInstructor />

                                                {/* 7. Área de anexos do curso */}
                                                <CourseAttachment />

                                                {/* 8. Informações adicionais */}
                                                <CourseAdditionalInfo />

                                                {/* 9. Pré-requisitos do curso */}
                                                <CoursePrerequisites />

                                                {/* 10. Certificado do curso */}
                                                <CourseCertificate />

                                            </div>

                                            {/* 🚀 BOTÃO GLOBAL DE SALVAMENTO (O Único que Funciona Agora) */}
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
                {/* Fim da área de criação de novo curso */}

            </div>
        </main>
    )
}