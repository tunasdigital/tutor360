import Image from "next/image";
import user_img from '@/assets/img/course/details/user.png';
import { Star, UserSvgTwo, VideoPlayerThreeSvg } from "@/components/svg";
import SocialLinks from "@/components/social/social-links";

export default function CourseDetailsInstructor() {
    return (
        <div className="tp-course-details-2-instructor d-flex">
            <div className="tp-course-details-2-instructor-thumb mr-40">
                <Image src={user_img} alt="Tutor360 Instrutor" />
            </div>
            <div className="tp-course-details-2-instructor-content">
                <h5>Equipe Tutor360</h5>
                <span className="pre">Especialistas em Empreendedorismo e Negócios</span>
                <div className="tp-course-details-2-instructor-sub d-flex">
                    <span><Star /> 4.9 Avaliação</span>
                    <span><VideoPlayerThreeSvg /> 50+ Cursos</span>
                    <span><UserSvgTwo clr="#6C7275" /> 10.000+ Alunos</span>
                </div>
                <div className="tp-course-details-2-instructor-text">
                    <p>Nossa missão é ajudar jovens empreendedores a desenvolverem habilidades <br />
                        práticas para o mercado de trabalho e para a vida. Através de uma metodologia <br />
                        focada em resultados, transformamos a forma como você aprende e aplica seus conhecimentos.</p>
                    <p>A Tutor360 é formada por profissionais dedicados ao seu crescimento <br />
                        pessoal e profissional, oferecendo suporte contínuo em toda a sua jornada.</p>
                </div>
                <div className="tp-course-details-2-instructor-social">
                    <SocialLinks/>
                </div>
            </div>
        </div>
    )
}