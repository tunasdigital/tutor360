'use client';
import useScrollSpy from "@/hooks/use-scroll-spy";

export default function CourseDetailsNav() {
    // Tática de Mentor: Mantemos os IDs originais ("info", "curriculum", etc.) 
    // para não quebrar a funcionalidade de âncora do CSS e do ScrollSpy.
    const sections = ["info", "curriculum", "instructors", "reviews"];
    const activeSection = useScrollSpy(sections);
    
    return (
        <nav>
            <ul id="course_details2_nav">
                <li className={activeSection === "info" ? "current" : ""}>
                    <a href="#info">Sobre o Curso</a>
                </li>
                <li className={activeSection === "curriculum" ? "current" : ""}>
                    <a href="#curriculum">Grade Curricular</a>
                </li>
                <li className={activeSection === "instructors" ? "current" : ""}>
                    <a href="#instructors">Instrutores</a>
                </li>
                <li className={activeSection === "reviews" ? "current" : ""}>
                    <a href="#reviews">Avaliações</a>
                </li>
            </ul>
        </nav>
    )
}