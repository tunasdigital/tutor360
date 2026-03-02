import FilterCategory from "@/components/course/filter/filter-category";
import FilterInstructor from "@/components/course/filter/filter-instructor";
import FilterLanguage from "@/components/course/filter/filter-language";
import FilterPrice from "@/components/course/filter/filter-price";
import FilterSortBy from "@/components/course/filter/filter-sort-by";


export default function CourseFilterDropdownArea() {
    return (
        <div className="row row-cols-lg-5 row-cols-md-3 row-cols-sm-2 row-cols-1">
            <div className="col">
                {/* Tradução: Sort by -> Ordenar por */}
                <h4 className="tp-filter-widget-title">Ordenar por</h4>
                <FilterSortBy />
            </div>

            <div className="col">
                {/* Tradução: All categories -> Categorias */}
                <h4 className="tp-filter-widget-title">Categorias</h4>
                <FilterCategory />
            </div>

            <div className="col">
                {/* Tradução: Instructors -> Mentores */}
                <h4 className="tp-filter-widget-title">Mentores</h4>
                <FilterInstructor />
            </div>

            <div className="col">
                {/* Tradução: Price -> Preço */}
                <h4 className="tp-filter-widget-title">Preço</h4>
                <FilterPrice />
            </div>

            <div className="col">
                {/* Tradução: Language -> Idioma */}
                <h4 className="tp-filter-widget-title">Idioma</h4>
                <FilterLanguage />
            </div>
        </div>
    )
}