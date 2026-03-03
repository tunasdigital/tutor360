'use client';
import Image from "next/image";
import { removeTagInText } from "@/utils";
import CoursePrice from "../../course-price";
import { LessonsSvg, PenSvg, UserSvgTwo } from "@/components/svg";
import Link from "next/link";
import CourseDashboardItemAction from "./course-d-item-action";

type IProps = {
    course: any; 
};

export default function DashboardCourseItemThree({ course }: IProps) {
    const { id, title, discount, thumbnail, total_rating, lessons, students, price, radarLessons } = course || {};
    
    return (
        <div className="tp-dashboard-course tp-dashboard-course-2 mb-25">
            <div className="tp-dashboard-course-thumb">
                <Link href={`/course-details/${id}`}>
                    <Image 
                        src={thumbnail || "/assets/img/course/course-1.jpg"} 
                        alt={title ? removeTagInText(title) : 'Curso'} 
                        width={262} 
                        height={160} 
                        style={{objectFit: 'cover'}}
                    />
                </Link>
            </div>
            <div className="tp-dashboard-course-content">
                <div className="tp-dashboard-rating">
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <span>({total_rating || 0} Avaliações)</span>
                </div>
                <h4 className="tp-dashboard-course-title">
                    <Link href={`/course-details/${id}`}>{title ? removeTagInText(title) : 'Sem Título'}</Link>
                </h4>
                
                {/* 📡 RADAR DE IDENTIFICAÇÃO: Mantido para sua segurança na curadoria */}
                {radarLessons && radarLessons.length > 0 && (
                    <div style={{ backgroundColor: '#f0f5ff', padding: '10px', borderRadius: '8px', marginBottom: '15px', borderLeft: '3px solid #0055FF' }}>
                        <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#0055FF', display: 'block', marginBottom: '5px' }}>
                            📡 Radar de Identificação:
                        </span>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                            {radarLessons.map((lesson: any, index: number) => (
                                <li key={index} style={{ fontSize: '13px', color: '#444', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                    {index + 1}. {lesson.title}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                <div className="tp-dashboard-course-meta">
                    <span>
                        <span><LessonsSvg/></span>
                        {" "}{lessons || 0} Aulas
                    </span>
                    <span>
                        <span><UserSvgTwo/></span>
                        {" "}{students || 0} Alunos
                    </span>
                </div>
                <div className="tp-dashboard-btn d-flex align-items-center justify-content-between">
                    <div className="tp-course-pricing text-start">
                        <CoursePrice discount={discount || 0} price={price || 0} />
                    </div>
                    <div className="tp-course-action d-flex align-items-center">
                        <div className="tpd-action-inexact-btn">
                            {/* 🎯 ACESSO À SALA DE COMANDO: O lápis agora leva para a edição real do curso */}
                            <Link href={`/dashboard/create-new-course?courseId=${id}`}>
                                <PenSvg/>
                            </Link>
                        </div>
                        <CourseDashboardItemAction courseId={id}/>
                    </div>
                </div>
            </div>
        </div>
    );
}