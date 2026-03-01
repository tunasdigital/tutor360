'use client';
import dynamic from "next/dynamic";
import React, { useState } from "react";
const Select = dynamic(() => import("react-select"), { ssr: false });
import { MultiValue } from "react-select";

type OptionType = {
    value: string;
    label: string;
};

export default function CoursePrerequisites() {
   // Definindo estado inicial vazio para os cursos pré-requisitos selecionados
   const [selectedCourses, setSelectedCourses] = useState<OptionType[]>([]);

   // Opções de cursos para pré-requisitos traduzidas
   const courseOptions = [
      { value: "mkt-digital", label: "Marketing Digital para Iniciantes" },
      { value: "gestao-tempo", label: "Gestão de Tempo e Produtividade" },
      { value: "financas-negocios", label: "Finanças para Pequenos Negócios" },
      { value: "vendas-estrategicas", label: "Vendas Estratégicas" }
   ];

   // Manipular mudança na seleção de pré-requisitos
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
               <div className="tpd-new-course-select2">
                  <div className="tpd-input">
                     <label>Selecionar Cursos</label>
                     <Select
                        isMulti
                        placeholder="Escolha os cursos necessários..."
                        noOptionsMessage={() => "Nenhum curso encontrado"}
                        name="prerequisiteCourses"
                        options={courseOptions}
                        value={selectedCourses}
                        onChange={handleSelectChange}
                     />
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}