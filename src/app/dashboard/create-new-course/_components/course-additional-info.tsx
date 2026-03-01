'use client';
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { MultiValue } from "react-select";

// Importação dinâmica do componente react-select com SSR desativado
const Select = dynamic(() => import("react-select"), { ssr: false });

type OptionType = {
  value: string;
  label: string;
};

export default function CourseAdditionalInfo() {
  // Definindo estado inicial para os dados adicionais
  const [additionalData, setAdditionalData] = useState({
    whatYouWillLearn: "",
    targetedAudience: "",
    courseDurationHours: "",
    courseDurationMinutes: "",
    materialsIncluded: "",
    requirements: "",
    courseTags: [] as MultiValue<OptionType>,
  });

  // Opções de tags de curso para o react-select traduzidas
  const tagOptions: OptionType[] = [
    { value: "empreendedorismo", label: "Empreendedorismo" },
    { value: "vendas", label: "Vendas e Marketing" },
    { value: "gestao", label: "Gestão de Negócios" },
    { value: "tecnologia", label: "Tecnologia e Inovação" }
  ];

  // Manipular mudança nos campos de texto e inputs
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setAdditionalData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Manipular mudança para o react-select
  const handleSelectChange = (newValue: unknown) => {
    const selectedOptions = newValue as MultiValue<OptionType>;
    setAdditionalData((prevState) => ({
      ...prevState,
      courseTags: selectedOptions || []
    }));
  };

  return (
    <div className="accordion-item">
      <h2 className="accordion-header">
        <button
          className="accordion-button collapsed tpd-new-course-heading-title"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#panelsStayOpen-collapseSix"
          aria-expanded="false"
          aria-controls="panelsStayOpen-collapseSix"
        >
          Dados Adicionais
        </button>
      </h2>
      <div id="panelsStayOpen-collapseSix" className="accordion-collapse collapse">
        <div className="accordion-body">
          <div className="tpd-new-course-box-1">
            <div className="tpd-input">
              <label>O que eu vou aprender?</label>
              <textarea
                name="whatYouWillLearn"
                value={additionalData.whatYouWillLearn}
                onChange={handleChange}
                placeholder="Escreva aqui os benefícios do curso (Um por linha)"
              />
            </div>
            <div className="tpd-input">
              <label>Público-Alvo</label>
              <textarea
                name="targetedAudience"
                value={additionalData.targetedAudience}
                onChange={handleChange}
                placeholder="Especifique o público que mais se beneficiará com este curso."
              />
            </div>
            <div className="tpd-new-course-box-duration d-flex align-items-end">
              <div className="tpd-input mr-20">
                <label className="font">Duração Total do Curso</label>
                <input
                  type="number"
                  name="courseDurationHours"
                  value={additionalData.courseDurationHours}
                  onChange={handleChange}
                  placeholder="00"
                />
                <p>Horas</p>
              </div>
              <div className="tpd-input">
                <input
                  type="number"
                  name="courseDurationMinutes"
                  value={additionalData.courseDurationMinutes}
                  onChange={handleChange}
                  placeholder="00"
                />
                <p>Minutos</p>
              </div>
            </div>
            <div className="tpd-input height-auto">
              <label>Materiais Inclusos</label>
              <textarea
                name="materialsIncluded"
                value={additionalData.materialsIncluded}
                onChange={handleChange}
                placeholder="Lista de ativos que você fornecerá aos alunos (Um por linha)"
              />
            </div>
            <div className="tpd-input">
              <label>Requisitos / Instruções</label>
              <textarea
                name="requirements"
                value={additionalData.requirements}
                onChange={handleChange}
                placeholder="Requisitos prévios ou instruções para os alunos (Um por linha)"
              />
            </div>
            <div className="tpd-new-course-select2">
              <div className="tpd-input">
                <label>Tags do Curso</label>
                <Select
                  isMulti
                  placeholder="Selecione as tags..."
                  noOptionsMessage={() => "Nenhuma tag encontrada"}
                  name="courseTags"
                  options={tagOptions}
                  value={additionalData.courseTags}
                  onChange={handleSelectChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}