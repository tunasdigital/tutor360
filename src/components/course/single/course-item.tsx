'use client';
import React from "react";
import Image from "next/image";
import { LessonsSvg, UserSvgTwo } from "../../svg";
import { ICourseDT } from "@/types/course-d-t";
import Link from "next/link";
import CoursePrice from "../course-price";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";

type IProps = {
  course: ICourseDT;
  removeTag?: boolean;
};

export default function CourseItem({ course, removeTag }: IProps) {
  if (!course) return null;

  const {
    id,
    thumbnail,
    author_name,
    author_img,
    title,
    discount,
    lessons,
    students,
    avg_rating,
    total_rating,
    category,
    price,
    video_id,
  } = course;

  // CORREÇÃO ESTRATÉGICA: O link do card AGORA SEMPRE aponta para a página de detalhes do curso.
  // Isso mantém o aluno dentro da Tutor360 para que ele veja os cadeados e o botão de compra.
  const courseLink = `/course-details/${id}`;

  const isExternalImage = thumbnail.startsWith('http');

  return (
    <div className="tp-course-item p-relative fix mb-30">
      <div className="tp-course-teacher mb-15">
        <span>
          {author_img && (
            <Image src={author_img} alt={author_name || "mentor"} width={30} height={30} style={{ borderRadius: '50%' }} />
          )}
          {author_name}
        </span>
        {discount && discount > 0 ? (
          <span className="discount">-{discount}% </span>
        ) : null}
      </div>

      <div className="tp-course-thumb p-relative">
        {/* Agora o clique na imagem também leva para a página de vendas interna */}
        <Link href={courseLink}>
          {isExternalImage ? (
            <img
              src={thumbnail}
              alt={title}
              style={{ width: '100%', height: '200px', objectFit: 'cover' }}
              className="course-lightblue"
            />
          ) : (
            <Image
              className="course-lightblue"
              src={thumbnail}
              alt={title}
              width={352}
              height={200}
              priority={id === 101}
              style={{ objectFit: 'cover' }}
            />
          )}
          
          {video_id && (
            <div className="tp-course-video-icon" style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: '45px',
              color: '#FF0000',
              backgroundColor: 'rgba(255,255,255,0.9)',
              borderRadius: '50%',
              width: '60px',
              height: '60px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 15px rgba(0,0,0,0.3)'
            }}>
              <FontAwesomeIcon icon={faYoutube} />
            </div>
          )}
        </Link>
      </div>

      <div className="tp-course-content">
        <div className="tp-course-tag mb-10">
          <span style={{ backgroundColor: '#EEF4FF', color: '#0055FF' }}>{category}</span>
          <span className="ml-10" style={{ backgroundColor: '#0055FF', color: '#fff', padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold' }}>
            TUTOR 360
          </span>
        </div>

        <div className="tp-course-meta">
          <span>
            <span><LessonsSvg /></span>
            {" "}{lessons} {lessons === 1 ? 'Aula' : 'Aulas'}
          </span>
          <span>
            <span><UserSvgTwo /></span>
            {" "}{students} {students === 1 ? 'Aluno' : 'Alunos'}
          </span>
        </div>

        <h4 className="tp-course-title">
          <Link href={courseLink}
            dangerouslySetInnerHTML={{ __html: removeTag ? title.replace(/(<([^>]+)>)/gi, "") : title }}
          ></Link>
        </h4>

        <div className="tp-course-rating d-flex align-items-end justify-content-between">
          <div className="tp-course-rating-star">
            <p>
              {avg_rating}
              <span> /{total_rating}</span>
            </p>
            <div className="tp-course-rating-icon">
              {[...Array(5)].map((_, i) => (
                <FontAwesomeIcon key={i} icon={faStar} color={i < Math.floor(avg_rating) ? "#FFB600" : "#E5E7EB"} />
              ))}
            </div>
          </div>
          <div className="tp-course-pricing home-2">
            <CoursePrice discount={discount} price={price} />
          </div>
        </div>
      </div>

      <div className="tp-course-btn home-2">
        {/* BOTÃO CORRIGIDO: Agora aponta para a página interna, garantindo que o aluno veja o funil de vendas */}
        <Link href={courseLink}>
          Conhecer Curso
        </Link>
      </div>
    </div>
  );
}