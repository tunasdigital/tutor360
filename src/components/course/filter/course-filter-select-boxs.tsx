'use client';
import NiceSelect from "@/components/ui/nice-select"
import useCourseFilter from "@/hooks/use-course-filter";
import { courseCategories, courseInstructors, courseLanguages } from "@/lib/get-course-fields";
import { FilterActionTypes } from "@/types/course-filter-type";


export function SelectFilterSortBy() {
    const { dispatch } = useCourseFilter();
    function handleSortBy(item: { value: string; label: string }) {
        dispatch({ type: FilterActionTypes.SET_SORT_BY, payload: item.value })
    }
    return (
        <NiceSelect
            options={[
                { value: "", label: "Ordenar por" },
                { value: "rating", label: "Mais Relevantes" },
                { value: "low", label: "Preço: Menor para Maior" },
                { value: "high", label: "Preço: Maior para Menor" },
            ]}
            defaultCurrent={0}
            cls="wide"
            placeholder="Padrão"
            onChange={handleSortBy}
            name="SortBy"
        />
    )
}

export function SelectFilterCategory() {
    const { dispatch } = useCourseFilter();
    function handleCategory(item: { value: string; label: string }) {
        dispatch({ type: FilterActionTypes.SET_CATEGORY, payload: item.value })
    }
    return (
        <div className="tp-course-grid-select">
            <p>FILTRAR POR CATEGORIA</p>
            <NiceSelect
                options={[
                    { value: "", label: "Selecionar categoria" },
                    ...courseCategories.map((c) => (
                        { value: c.category, label: c.category }
                    ))
                ]}
                defaultCurrent={0}
                cls="wide"
                placeholder="Padrão"
                onChange={handleCategory}
                name="Category"
            />
        </div>
    )
}

export function SelectFilterAuthor() {
    const { dispatch } = useCourseFilter();
    function handleInstructor(item: { value: string; label: string }) {
        dispatch({ type: FilterActionTypes.SET_INSTRUCTOR, payload: item.value })
    }
    return (
        <div className="tp-course-grid-select">
            <p>FILTRAR POR MENTOR</p>
            <NiceSelect
                options={[
                    { value: "", label: "Selecionar mentor" },
                    ...courseInstructors.map((i) => (
                        { value: i.instructor, label: i.instructor }
                    ))
                ]}
                defaultCurrent={0}
                cls="wide"
                placeholder="Padrão"
                onChange={handleInstructor}
                name="Instructor"
            />
        </div>
    )
}

export function SelectFilterLanguage() {
    const { dispatch } = useCourseFilter();
    function handleLang(item: { value: string; label: string }) {
        dispatch({ type: FilterActionTypes.SET_LANGUAGE, payload: item.value })
    }
    return (
        <div className="tp-course-grid-select">
            <p>FILTRAR POR IDIOMA</p>
            <NiceSelect
                options={[
                    { value: "", label: "Selecionar idioma" },
                    ...courseLanguages.map((l) => (
                        { value: l.language, label: l.language }
                    ))
                ]}
                defaultCurrent={0}
                cls="wide"
                placeholder="Padrão"
                onChange={handleLang}
                name="Language"
            />
        </div>
    )
}

export default function CourseFilterSelectBox() {
    return (
        <div className="row">
            <div className="col-lg-12">
                <div className="tp-course-grid-categories d-flex">
                    <div className="tp-course-grid-select">
                        <p>ORDENAR POR</p>
                        <SelectFilterSortBy />
                    </div>
                    <SelectFilterCategory />
                    <SelectFilterAuthor />
                    <SelectFilterLanguage />
                </div>
            </div>
        </div>
    )
}