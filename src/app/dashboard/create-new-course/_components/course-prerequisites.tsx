'use client';

import dynamic from "next/dynamic";
import React, { useState, useEffect } from "react";

// O { ssr: false } é vital aqui para evitar erros de hidratação no Next.js com o react-select
const Select = dynamic(() => import("react-select"), { ssr: false });
import { MultiValue } from "react-select";

type OptionType = {
    value: string;
    label: string;
};

// A-1: Injeção dos dados do curso atual
type IProps = {
    courseToEdit?: any;
};

export default function CoursePrerequisites({ courseToEdit }: IProps) {
    const [selectedCourses, setSelectedCourses] = useState<OptionType[]>([]);

    const courseOptions = [
        { value: "mkt-digital", label: "Marketing Digital para Iniciantes" },
        { value: "gestao-tempo", label: "Gestão de Tempo e Produtividade" },
        { value: "financas-negocios", label: "Finanças para Pequenos Negócios" },
        { value: "vendas-estrategicas", label: "Vendas Estratégicas" }
    ];

    // A-2: Resgatando os pré-requisitos salvos no banco de dados
    useEffect(() => {
        if (courseToEdit?.prerequisites && Array.isArray(courseToEdit.prerequisites)) {
            // O banco nos devolve ['mkt-digital', 'gestao-tempo']
            // Precisamos achar os 'labels' correspondentes na nossa lista pronta para o componente desenhar
            const savedOptions = courseToEdit.prerequisites.map((val: string) => {
                const found = courseOptions.find(opt => opt.value === val);
                return found ? found : { value: val, label: val }; 
            });
            setSelectedCourses(savedOptions);
        }
    }, [courseToEdit]);

    const handleSelectChange = (newValue: unknown) => {
        const selectedOptions = newValue as MultiValue<OptionType>;
        setSelectedCourses([...selectedOptions] as OptionType[]);
    };

    return (
        <div className="accordion-item">
            <h2 className="accordion-header">
                <button
                    className="accordion-button collapsed tpd-new-course-heading-title"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#panelsStayOpen-collapseSeven"
                    aria-expanded="false"
                    aria-controls="panelsStayOpen-collapseSeven"
                >
                    Pré-requisitos do Curso
                </button>
            </h2>
            <div id="panelsStayOpen-collapseSeven" className="accordion-collapse collapse">
                <div className="accordion-body">
                    
                    <div className="mb-20">
                        <p className="text-muted" style={{ fontSize: '14px' }}>
                            Defina quais conhecimentos ou cursos prévios são recomendados para um melhor aproveitamento.
                        </p>
                    </div>

                    {/* A-3: A Fiação Invisível que viaja no FormData para o backend */}
                    {selectedCourses.map((course, index) => (
                        <input key={index} type="hidden" name="prerequisites[]" value={course.value} />
                    ))}

                    <div className="tpd-new-course-select2">
                        <div className="tpd-input">
                            <label>Cursos Necessários</label>
                            <Select
                                isMulti
                                placeholder="Escolha os cursos necessários..."
                                noOptionsMessage={() => "Nenhum curso encontrado"}
                                options={courseOptions}
                                value={selectedCourses}
                                onChange={handleSelectChange}
                                classNamePrefix="react-select"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}