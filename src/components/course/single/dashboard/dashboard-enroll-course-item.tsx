import Image from "next/image";
import { ICourseDT } from "@/types/course-d-t";
import { LessonsSvg, UserSvgTwo } from "@/components/svg";
import { removeTagInText } from "@/utils";
import Link from "next/link";

type IProps = {
  course: ICourseDT;
};

export default function DashboardEnrollCourseItem({ course }: IProps) {
  const { id, thumbnail, title, total_rating, lessons, students, progress } = course;
  const progressValue = progress ?? 0;
  
  return (
    <div className="tp-dashboard-course mb-25">
      <div className="tp-dashboard-course-thumb">
        <Link href={`/course-details/${id}`}>
          <Image src={thumbnail} alt="Capa do curso" width={262} height={160} />
        </Link>
      </div>
      <div className="tp-dashboard-course-content">
        <div className="tp-dashboard-rating">
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          <span>({total_rating} Avaliações)</span>
        </div>
        <h4 className="tp-dashboard-course-title">
          <Link href={`/course-details/${id}`}>{removeTagInText(title)}</Link>
        </h4>
        <div className="tp-dashboard-course-meta">
          <span>
            <span>
              <LessonsSvg />
            </span>
            {" "}{lessons} Aulas
          </span>
          <span>
            <span>
              <UserSvgTwo />
            </span>
            {" "}{students} Alunos
          </span>
        </div>
        <div className="tp-dashboard-progress">
          <div className="tp-dashboard-progress-info d-flex align-items-center justify-content-between">
            <span>{Math.round((progressValue / 100) * lessons)} / {lessons}</span>
            <span>{progressValue}% Concluído</span>
          </div>
          <div className="progress" role="progressbar" aria-label="Exemplo de Progresso" aria-valuenow={progressValue} aria-valuemin={0} aria-valuemax={100}>
            <div className="progress-bar" style={{ width: `${progressValue}%` }}>
            </div>
          </div>
        </div>
        
        {/* Lógica Dinâmica do Botão: Certificado vs Continuar Curso */}
        <div className="tp-dashboard-course-btn mt-15">
          {progressValue >= 100 ? (
            <a 
              className="tp-btn w-100 text-center" 
              href="/assets/img/dashboard/bg/certificate.png" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ backgroundColor: '#10B981', border: 'none', padding: '8px 0', fontSize: '14px', borderRadius: '5px' }}
            >
              <i className="fa-solid fa-award" style={{ marginRight: '8px' }}></i>
              Baixar Certificado
            </a>
          ) : (
            <Link className="tpd-btn-border w-100 text-center" href={`/course-details/${id}`}>
              Continuar Curso
            </Link>
          )}
        </div>

      </div>
    </div>
  );
}