import { Metadata } from "next";
import CourseFilterBanner from "./_components/course-filter-banner";
import CourseFilterProvider from "@/components/provider/course-filter-provider";
import { all_courses } from "@/data/course-data";
import CourseFilterArea from "./_components/course-filter-area";
import BannerArea from "@/components/banner/banner-area";


export const metadata: Metadata = {
    // Nacionalização do título da aba do navegador para SEO
    title: "Catálogo de Cursos - Tutor360",
}

export default function CourseWithFilterPage() {
    return (
        <CourseFilterProvider initialCourses={all_courses}>

            {/* banner de cabeçalho da vitrine */}
            <CourseFilterBanner/>

            {/* área principal com filtros e listagem de cursos */}
            <CourseFilterArea/>

            {/* banner de conversão inferior */}
            <BannerArea/>

        </CourseFilterProvider>
    )
}