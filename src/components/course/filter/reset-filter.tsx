'use client';
import useCourseFilter from '@/hooks/use-course-filter';
import { FilterActionTypes } from '@/types/course-filter-type';

export default function ResetFilter() {
    const { dispatch } = useCourseFilter();
    return (
        <div className="container mt-100 mb-100">
            <div className="text-center">
                {/* Tradução: No Course Found -> Nenhum Curso Encontrado */}
                <h3>Nenhum Curso Encontrado</h3>
                {/* Tradução: Please try with... -> Tente novamente com outros termos ou filtros */}
                <p>Tente novamente utilizando palavras-chave ou filtros diferentes.</p>
                {/* Tradução: Reset Filter -> Limpar Filtros */}
                <button 
                    className='tp-btn-inner' 
                    onClick={() => dispatch({ type: FilterActionTypes.RESET_FILTER })}
                >
                    Limpar Filtros
                </button>
            </div>
        </div>
    )
}