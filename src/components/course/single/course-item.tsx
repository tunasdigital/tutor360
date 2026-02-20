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

  const courseLink = video_id 
    ? `https://www.youtube.com/watch?v=${video_id}` 
    : `/course-details/${id}`;

  // Verifica se a imagem é externa (YouTube) para evitar crash do Next/Image
  const isExternalImage = thumbnail.startsWith('http');

  return (
    <div className="tp-course-item p-relative fix mb-30">
      <div className="tp-course-teacher mb-15">
        <span>
          {author_img && (
            <Image src={author_img} alt={author_name || "author"} width={30} height={30} />
          )}
          {author_name}
        </span>
        {discount && discount > 0 ? (
          <span className="discount">-{discount}% </span>
        ) : null}
      </div>

      <div className="tp-course-thumb p-relative">
        <Link href={courseLink} target={video_id ? "_blank" : "_self"}>
          {isExternalImage ? (
            /* ESTRATÉGIA DE SEGURANÇA: 
               Usamos <img> comum para domínios externos (YouTube) 
               evitando o erro de configuração do next.config.js
            */
            <img
              src={thumbnail}
              alt={title}
              style={{ width: '352px', height: '200px', objectFit: 'cover' }}
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
              backgroundColor: 'rgba(255,255,255,0.8)',
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
          <span>{category}</span>
          {video_id && (
            <span className="ml-10" style={{ backgroundColor: '#FF0000', color: '#fff', padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold' }}>
              TUTOR 360
            </span>
          )}
        </div>
        <div className="tp-course-meta">
          <span>
            <span><LessonsSvg /></span>
            {" "}{lessons} Lessons
          </span>
          <span>
            <span><UserSvgTwo /></span>
            {" "}{students} Student
          </span>
        </div>
        <h4 className="tp-course-title">
          <Link href={courseLink}
            target={video_id ? "_blank" : "_self"}
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
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
            </div>
          </div>
          <div className="tp-course-pricing home-2">
            <CoursePrice discount={discount} price={price} />
          </div>
        </div>
      </div>
      <div className="tp-course-btn home-2">
        <Link href={courseLink} target={video_id ? "_blank" : "_self"}>
          {video_id ? "Assistir no YouTube" : "Preview this Course"}
        </Link>
      </div>
    </div>
  );
}