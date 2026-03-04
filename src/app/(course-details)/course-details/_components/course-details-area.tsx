'use client';
import React from "react";
import Link from "next/link";
import { ICourseDT } from "@/types/course-d-t";
import { Lesson } from "@prisma/client";
import CourseDetailsRightSide from "./course-details-right-side";
import CourseDetailsNav from "@/components/course/details/course-details-nav";
import CourseDetailsInfo from "@/components/course/details/course-details-info";
import CourseDetailsCurriculum from "@/components/course/details/course-details-curriculum";
import CourseDetailsInstructor from "@/components/course/details/course-details-instructor";
import CourseDetailsRatingReviews from "@/components/course/details/course-details-rating-reviews";

type IProps = {
   course: ICourseDT;
   lessons: Lesson[];
};

export default function CourseDetailsArea({ course, lessons }: IProps) {
   return (
      <>
         {/* 🎨 HERO AREA: Restaurando o "roxinho suave" com respiro calculado para o Header de 72px */}
         <section className="tp-course-details-breadcrumb-area p-relative z-index-1" 
            style={{ 
               background: 'linear-gradient(120deg, #F0F7FF 0%, #F5F3FF 100%)', // Degradê suave Acadia
               paddingTop: 'calc(var(--t360-hdr-desktop) + 80px)', 
               paddingBottom: '200px',
               overflow: 'hidden' 
            }}>
            <div className="container">
               <div className="row">
                  <div className="col-xl-8 col-lg-7">
                     <div className="tp-course-details-breadcrumb-content">
                        {/* Identificação e Metadados da Curadoria (image_e86539.jpg) */}
                        <div className="mb-20" style={{ fontSize: '14px', color: '#64748B' }}>
                           <Link href="/">Início</Link> / <Link href="/course">Cursos</Link> / <span style={{ color: '#8E44AD' }}>{course.category}</span>
                        </div>
                        <span className="mb-15 d-inline-block" style={{ backgroundColor: '#8E44AD', color: '#fff', padding: '3px 15px', borderRadius: '6px', fontSize: '11px', fontWeight: 'bold' }}>
                           {course.level}
                        </span>
                        <h1 style={{ fontSize: '42px', fontWeight: '800', color: '#0F172A', lineHeight: '1.1' }}>
                           {course.title}
                        </h1>
                        <div className="mt-20 d-flex align-items-center" style={{ gap: '20px' }}>
                           <span><b>Instrutor:</b> {course.mentorName}</span>
                           <span><i className="fa-solid fa-star" style={{ color: '#FFB600' }}></i> 5.0</span>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         {/* 🚀 O ENCAIXE QVA: Mockup flutuando no azul e conteúdo no branco sem vãos (image_e851bd.jpg) */}
         <section className="pb-80" style={{ marginTop: '-140px', position: 'relative', zIndex: 10 }}>
            <div className="container">
               <div className="row">
                  <div className="col-lg-8">
                     <div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '24px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.04)' }}>
                        <CourseDetailsNav />
                        <div id="info"><CourseDetailsInfo course={course} /></div>
                        <div id="curriculum" className="pt-80"><CourseDetailsCurriculum lessons={lessons} /></div>
                        <div id="instructors" className="pt-80"><CourseDetailsInstructor course={course} /></div>
                        <div id="reviews" className="pt-80"><CourseDetailsRatingReviews /></div>
                     </div>
                  </div>
                  <div className="col-lg-4">
                     <div className="tp-course-details-sidebar tp-course-sidebar-sticky">
                        <CourseDetailsRightSide course={course} />
                     </div>
                  </div>
               </div>
            </div>
         </section>
      </>
   );
}