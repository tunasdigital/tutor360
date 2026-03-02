'use client';
import useCourseFilter from '@/hooks/use-course-filter';
import { courseLanguages } from "@/lib/get-course-fields";
import { FilterActionTypes } from '@/types/course-filter-type';

type IProps = {
    cls?: string;
    checkbox?: boolean;
}

export default function FilterLanguage({cls='filter', checkbox}: IProps) {
    const {state, dispatch} = useCourseFilter();
    
    function handleLanguage(lang: string) {
        dispatch({type: FilterActionTypes.SET_LANGUAGE, payload: lang});
    }

    // Tática de Nacionalização: Mapeamento de idiomas para exibição amigável
    const getLanguageLabel = (lang: string) => {
        const labels: { [key: string]: string } = {
            'English': 'Inglês',
            'Portuguese': 'Português',
            'Spanish': 'Espanhol',
            'French': 'Francês'
        };
        return labels[lang] || lang;
    };

    return (
        <div className={`tp-${cls}-widget-content`}>
            <div className={`tp-${cls}-widget-${checkbox?'checkbox':'radio'}`}>
                <ul>
                    {courseLanguages.map((lang, i) => (
                    <li key={i}>
                        <div className={`${checkbox?'from-checkbox':'form-check'}`}>
                            <input 
                                className={`${checkbox?'':'form-check-input'}`} 
                                type={checkbox?'checkbox':'radio'} 
                                name={lang.language} 
                                id={lang.language} 
                                checked={state.language.includes(lang.language)} 
                                readOnly 
                            />
                            <label onClick={() => handleLanguage(lang.language)} className={`${checkbox?'':'form-check-label'}`} htmlFor={lang.language}>
                                {/* Exibindo o nome do idioma em português e a contagem dinâmica */}
                                {getLanguageLabel(lang.language)} ({lang.languageCounts})
                            </label>
                        </div>
                    </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}