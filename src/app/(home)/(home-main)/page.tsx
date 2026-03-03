import { Metadata } from "next";
import Link from "next/link";
import prisma from "@/lib/prisma"; 
import BrandArea from "@/components/brand/brand-area";
import CategoryArea from "@/components/category/category-area";
import CourseArea from "@/components/course/course-area";
import CourseLiveArea from "@/components/course/course-live-area";
import FunFactArea from "@/components/fun-fact/fun-fact-area";
import HeroAreaTwo from "@/components/hero-area/hero-area-two";
import TestimonialTwo from "@/components/testimonial/testimonial-two";

export const metadata: Metadata = {
  title: "Tutor 360 - Plataforma de Ensino Online",
  description: "Evolua sua carreira com os melhores cursos e transmissões ao vivo.",
};

interface IProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function HomeOnlineCoursePage({ searchParams }: IProps) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const limit = 9; 
  const skip = (currentPage - 1) * limit;

  const [dbCourses, totalCourses] = await Promise.all([
    prisma.course.findMany({
      where: {
        lessons: { some: {} },
        NOT: [
          { title: { contains: "Breve" } },
          { title: { contains: "Em breve" } }
        ]
      },
      include: { _count: { select: { lessons: true } } },
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: skip,
    }),
    prisma.course.count({
      where: {
        lessons: { some: {} },
        NOT: [
          { title: { contains: "Breve" } },
          { title: { contains: "Em breve" } }
        ]
      }
    })
  ]);

  const pageCount = Math.ceil(totalCourses / limit);

  const formattedCourses = dbCourses.map((course) => ({
    id: course.id,
    title: course.title,
    description: course.description || "O melhor conteúdo para alavancar a sua carreira.",
    category: course.level || "Tendências", 
    price: course.price || 97.00,
    discount: course.discountPrice ? (course.price - course.discountPrice) : 0,
    thumbnail: course.thumbnail || "/assets/img/course/course-1.jpg", 
    lessons: course._count.lessons,
    students: 150,
    mentorName: "Equipe Tutor360"
  }));

  const buttonStyle: React.CSSProperties = {
    backgroundColor: '#0055FF', 
    color: '#FFFFFF', 
    borderRadius: '50px', 
    padding: '8px 24px',
    display: 'inline-flex',
    alignItems: 'center',
    fontWeight: '600',
    fontSize: '13px',
    textDecoration: 'none',
    border: '0',
    outline: '0',
    boxShadow: 'none'
  };

  return (
    <main>
      {/* 🚀 TÁTICA ANTI-TEIMOSIA: Forçamos o sumiço do banner indesejado via CSS Injetado */}
      <style dangerouslySetInnerHTML={{ __html: `
        .tp-pagination-wrapper .row:has(.tp-category-banner),
        .tp-category-banner, 
        .tp-category-banner-content { display: none !important; }
      `}} />

      <HeroAreaTwo />
      <CategoryArea />
      <FunFactArea/>
      
      {/* 🎯 ANCORAGEM: ID para evitar o salto para o topo no clique da paginação */}
      <section id="vitrine-cursos" className="course-area pb-120" style={{ scrollMarginTop: '100px' }}>
        <div className="container">
          <CourseArea courses={formattedCourses} />
          
          {/* NAVEGAÇÃO PURA COM FOCO LOCAL */}
          {pageCount > 1 && (
            <div className="d-flex justify-content-center gap-3 mt-80">
               {currentPage > 1 && (
                 <Link href={`/?page=${currentPage - 1}#vitrine-cursos`} style={buttonStyle}>
                   <i className="fa-light fa-arrow-left mr-8"></i> Anterior
                 </Link>
               )}
               
               {currentPage < pageCount && (
                 <Link href={`/?page=${currentPage + 1}#vitrine-cursos`} style={buttonStyle}>
                   Próxima <i className="fa-light fa-arrow-right ml-8"></i>
                 </Link>
               )}
            </div>
          )}
        </div>
      </section>
      
      <CourseLiveArea/>
      <TestimonialTwo/>
      <BrandArea/>
    </main>
  );
}