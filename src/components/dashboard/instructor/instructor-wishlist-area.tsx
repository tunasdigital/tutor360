'use client';
import Pagination from "@/components/ui/pagination";
import { online_courses_data } from "@/data/course-data";
import usePagination from "@/hooks/use-pagination";
import DashboardCourseItemTwo from "@/components/course/single/dashboard/dashboard-course-item-2";

export default function InstructorWishlistArea() {
    // Organização da paginação para exibir 6 cursos por vez
    const { currentItems, handlePageClick, pageCount } = usePagination([...online_courses_data], 6);
    
    return (
        <>
            {/* Início da área de listagem de desejos */}
            <div className="course-area">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="tp-dashboard-section">
                            {/* NACIONALIZADO: Título da seção conforme padrão Tutor360 */}
                            <h2 className="tp-dashboard-title">Lista de Desejos</h2>
                        </div>
                    </div>
                </div>

                <div className="row">
                    {/* Renderização dinâmica dos cursos favoritados */}
                    {currentItems.map((course, index) => (
                        <div className="col-xl-4 col-md-6" key={index}>
                            <DashboardCourseItemTwo course={course} />
                        </div>
                    ))}
                </div>
            </div>
            {/* Fim da área de cursos */}

            {/* Início da área de paginação nacionalizada */}
            <div className="tp-dashboard-pagination pt-20">
                <div className="tp-pagination">
                    <Pagination handlePageClick={handlePageClick} pageCount={pageCount} isCenter={true} />
                </div>
            </div>
            {/* Fim da área de paginação */}
        </>
    )
}