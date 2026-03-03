'use client';
import React from "react";
import { MinusSvg, PlusThreeSvg } from "@/components/svg";
import { ICourseDT } from "@/types/course-d-t";

interface IProps {
  course?: ICourseDT; // Recebe os dados do curso para sair do texto estático
}

export default function CourseDetailsInfo({ course }: IProps) {
  const [showMore, setShowMore] = React.useState(false);

  return (
    <div id="info">
      <h4 className="tp-course-details-2-main-title">Sobre o Curso</h4>
      <div className="tp-course-details-2-text mb-60">
        <div className={`content ${showMore ? 'show' : ''}`}>
          {/* Tática de Mentor: Se houver descrição no banco, usa ela. Senão, mantém o padrão elegante. */}
          <p>
            {course?.title ? `Este curso de ${course.category} é focado em resultados reais.` : 'Este curso é voltado para pessoas interessadas em desenvolver novas habilidades.'} 
            Começaremos desde o básico e avançaremos passo a passo. Se você já tem alguma experiência na área, mas quer se atualizar e acelerar seus resultados, este curso é perfeito para você também!
          </p>
          <p>
            Primeiro, vamos repassar os conceitos fundamentais e as melhores práticas do mercado. Veremos como aplicar o conhecimento em projetos do mundo real, aprenderemos sobre estruturação e como tirar o máximo de proveito das ferramentas disponíveis.
          </p>
        </div>
        
        <a 
          style={{ cursor: 'pointer' }} 
          onClick={() => setShowMore(!showMore)} 
          className="tp-course-details-showmore show-more-button"
        >
          <span className="svg-icon">
            {showMore ? <MinusSvg clr="#3C66F9" /> : <PlusThreeSvg clr="#3C66F9" />}
          </span> 
          {showMore ? 'Mostrar Menos' : 'Mostrar Mais'}
        </a>
      </div>

      <h4 className="tp-course-details-2-main-title">O que você vai aprender?</h4>
      <div className="tp-course-details-2-list">
        <ul>
          <li>Domine os conceitos essenciais de {course?.category || 'sua área'}.</li>
          <li>Fundamentos práticos para iniciantes e avançados.</li>
          <li>Aprenda a planejar e executar projetos do zero.</li>
          <li>As ferramentas necessárias para os melhores resultados.</li>
          <li>Como organizar suas ideias e criar estratégias sólidas.</li>
          <li>Como utilizar materiais de apoio e templates prontos.</li>
          <li>Diferenças entre as principais abordagens do mercado.</li>
        </ul>
        <p className="mt-20">
          Com este curso, você também tem acesso a diversos recursos complementares, materiais de apoio e ferramentas extras para impulsionar o seu aprendizado de forma prática.
        </p>
      </div>
    </div>
  )
}