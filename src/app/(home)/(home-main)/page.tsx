import { Metadata } from "next";
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

export default function HomeOnlineCoursePage() {
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
      <CourseArea/>
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