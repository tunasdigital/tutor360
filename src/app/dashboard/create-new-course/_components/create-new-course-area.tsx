import CourseAdditionalInfo from "./course-additional-info";
import CourseAttachment from "./course-attachment";
import CourseBuilderArea from "./course-builder-area";
import CourseCertificate from "./course-certificate";
import CourseInfoArea from "./course-info-area";
import CourseInstructor from "./course-instructor";
import CourseIntroVideo from "./course-intro-video";
import CoursePrerequisites from "./course-prerequisites";

// Dicas de Upload de Curso (Refinadas para o ecossistema Tutor360)
const listData = [
    "Configure a opção de Preço do Curso ou defina-o como gratuito.",
    "O tamanho padrão para a miniatura (thumbnail) do curso é 700x430 pixels.",
    "A seção de Vídeo controla o vídeo de apresentação (pitch) do curso.",
    "O Construtor de Cursos é onde você cria e organiza toda a estrutura do conteúdo.",
    "Adicione Tópicos no Construtor para criar aulas em vídeo, quizzes e tarefas.",
];

export default function CreateNewCourseArea() {
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

                                        <div className="accordion" id="accordionPanelsStayOpenExample">

                                            {/* Início da área de informações básicas */}
                                            <CourseInfoArea />
                                            {/* Fim da área de informações básicas */}

                                            {/* Vídeo de introdução do curso */}
                                            <CourseIntroVideo />
                                            {/* Vídeo de introdução do curso */}

                                            {/* Área do construtor de cursos (grade curricular) */}
                                            <CourseBuilderArea />
                                            {/* Área do construtor de cursos */}

                                            {/* Área de seleção de instrutores */}
                                            <CourseInstructor />
                                            {/* Área de seleção de instrutores */}

                                            {/* Área de anexos do curso */}
                                            <CourseAttachment />
                                            {/* Área de anexos do curso */}

                                            {/* Informações adicionais */}
                                            <CourseAdditionalInfo />
                                            {/* Informações adicionais */}

                                            {/* Pré-requisitos do curso */}
                                            <CoursePrerequisites />
                                            {/* Pré-requisitos do curso */}

                                            {/* Certificado do curso */}
                                            <CourseCertificate />
                                            {/* Certificado do curso */}

                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="tpd-course-enroll-list">
                                    {/* Título lateral traduzido */}
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