'use client';
import { useState } from "react";
import NiceSelect from "@/components/ui/nice-select";
import DatePicker from "@/components/ui/date-picker";
import { CalenderThreeSvg } from "@/components/svg";

type IProps = {
    title?: string;
}
export default function SectionArea({title='Tentativas de Quiz'}: IProps) {
    const [date, setDate] = useState(new Date());
    function handleCourseFilter(item: { value: string, label: string }) {
        console.log(item);
    }
    function handleCourseSorting(item: { value: string, label: string }) {
        console.log(item);
    }
    return (
        <div className="section-area">
            <div className="tp-dashboard-section">
                {/* Título dinâmico nacionalizado por padrão */}
                <h2 className="tp-dashboard-title">{title}</h2>
            </div>
            <div className="row">
                <div className="col-lg-6">
                    <div className="tpd-dashboard-select-course">
                        <div className="tp-course-filter-select">
                            <NiceSelect
                                options={[
                                    { value: "", label: "Todos os Cursos" },
                                    { value: "latest", label: "Novos Cursos 2026" },
                                    { value: "web-d", label: "Sistema de Web Design no Figma" },
                                    { value: "interior", label: "Masterclass de Design de Interiores" },
                                    { value: "graphic", label: "Masterclass de Design Gráfico" },
                                    { value: "bootstrap", label: "Bootstrap 5 do Zero" },
                                ]}
                                defaultCurrent={0}
                                cls="wide"
                                onChange={handleCourseFilter}
                                name="courseSort"
                            />
                        </div>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="tpd-dashboard-select-calender d-flex align-items-center justify-content-lg-end">
                        <div className="tpd-order-short-list mb-30">
                           <div className="tp-course-filter-select">
                                <NiceSelect
                                    options={[
                                        { value: "desc", label: "Decrescente" },
                                        { value: "asc", label: "Crescente" },
                                        { value: "popularity", label: "Popularidade" },
                                    ]}
                                    defaultCurrent={0}
                                    cls="wide"
                                    onChange={handleCourseSorting}
                                    name="sorting"
                                />
                            </div>
                        </div>
                        <div className="tpd-order-date-input mb-30 ml-10">
                            <form action="#">
                                <DatePicker date={date} setDate={setDate} />
                                <span><CalenderThreeSvg /></span>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}