import { Metadata } from "next";
import prisma from "@/lib/prisma"; // TÁTICA DE MESTRE: O Motor do Banco na Home
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

export default async function HomeOnlineCoursePage() {
  // 1. BUSCA DE ELITE: Traz os cursos e conta as aulas simultaneamente
  const dbCourses = await prisma.course.findMany({
    include: {
      _count: {
        select: { lessons: true } // Mágica do Prisma: Retorna a quantidade de aulas vinculadas
      }
    },
    orderBy: {
      createdAt: 'desc' // Lista os cursos mais novos primeiro
    }
  });

  // 2. ADAPTADOR VISUAL: Converte os dados crus do banco para o padrão do Template
  const formattedCourses = dbCourses.map((course) => ({
    id: course.id,
    title: course.title,
    description: course.description || "O melhor conteúdo para alavancar a sua carreira.",
    // Se não tiver categoria definida, colocamos "Tendências" para testar as abas
    category: course.category || "Tendências", 
    price: 97.00, // Preço provisório até incluirmos a coluna de preço no seu painel
    discount: 0,
    thumbnail: course.thumbnail || "/assets/img/course/course-1.jpg", // Fallback seguro
    video_id: "go7QYaQR494",
    lessons: course._count.lessons, // Conta real vinda do banco de dados!
    students: 150,
    language: "Português",
    mentorName: "Equipe Tutor360"
  }));

  return (
    <main>
      {/* hero area start */}
      <HeroAreaTwo />
      {/* hero area end */}

      {/* category area */}
      <CategoryArea />
      {/* category area */}

      {/* fun fact area start */}
      <FunFactArea/>
      {/* fun fact area end */}

      {/* course area start */}
      {/* LIGANDO A CHAVE: Injetando os 38 cursos reais dentro da Vitrine! */}
      <CourseArea courses={formattedCourses} />
      {/* course area end */}

      {/* course live area start */}
      <CourseLiveArea/>
      {/* course live area end */}

      {/* testimonial area start */}
      <TestimonialTwo/>
      {/* testimonial area end */}

      {/* brand area start */}
      <BrandArea/>
      {/* brand area end */}
    </main>
  );
}