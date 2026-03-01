'use client';
import React from "react";

// Dados de perfil traduzidos para a realidade da Tutor360
const profileData = [
  { label: 'Data de Registro', value: '06 de Outubro, 2024 8:30 am' },
  { label: 'Nome', value: 'Indigo' },
  { label: 'Sobrenome', value: 'Violet' },
  { label: 'Nome de Usuário', value: 'instrutor' },
  { label: 'E-mail', value: 'exemplo@gmail.com' },
  { label: 'Telefone', value: '+55 (47) 98466-2948' },
  { label: 'Especialidade / Ocupação', value: 'Desenvolvedor Full Stack' },
  {
    label: 'Biografia',
    value: 'Especialista em criar soluções digitais de alto impacto com Next.js, TypeScript e Laravel.',
  },
];

export default function InstructorProfileArea() {
  return (
    <div className="tp-profile-wrapper">
      <div className="row">
        <div className="col-lg-6">
          <div className="tp-dashboard-section">
            <h2 className="tp-dashboard-title">Meu Perfil</h2>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="tp-profile-box">
            <div className="tp-profile-wrap">
              <ul>
                {profileData.map((item, index) => (
                  <li key={index}>
                    <div className="tp-profile-info d-flex">
                      <div className="tp-profile-info-tag">
                        <span>{item.label}</span>
                      </div>
                      <div className="tp-profile-info-details">
                        <span className={item.label === 'Biografia' ? 'details-zone' : ''}>
                          {item.value}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}