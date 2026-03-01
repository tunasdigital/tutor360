import { all_courses } from "@/data/course-data"
import CourseItem from "../single/course-item";

const related_courses = all_courses.slice(0, 3);
export default function RelatedCourses() {
    return (
        <section className="tp-course-details-2-related-area pb-80">
            <div className="container">
                <div className="tp-course-details-2-related-border"></div>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="tp-course-details-2-related-heading pt-80">
                            <h3 className="tp-course-details-2-related-title">Cursos Relacionados</h3>
                            <p>Explore outros treinamentos para impulsionar a sua jornada</p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {related_courses.map((item,) => (
                        <div key={item.id} className="col-lg-4 col-md-6">
                            <CourseItem course={item} removeTag={true} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}