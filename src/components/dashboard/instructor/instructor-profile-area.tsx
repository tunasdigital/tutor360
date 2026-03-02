'use client';
import React from "react";

// Dados de perfil estrategicamente preenchidos com os dados do CEO para a apresentação
const profileData = [
  { label: 'Data de Registro', value: '01 de Março, 2026 08:30' },
  { label: 'Nome', value: 'Edvaldo (Tunas)' },
  { label: 'Sobrenome', value: 'Ferreira' },
  { label: 'Nome de Usuário', value: 'ceo.tunas' },
  { label: 'E-mail', value: 'tunas@tutor360.com.br' },
  { label: 'Telefone', value: '+55 (47) 98466-2948' },
  { label: 'Especialidade / Ocupação', value: 'CEO & Full Stack Developer' },
  {
    label: 'Biografia',
    value: 'Ex-professor e arquiteto de soluções digitais. Especialista na criação de ecossistemas educacionais escaláveis com Next.js, TypeScript, PostgreSQL e Prisma. Focado na expansão e governança da Tutor360.',
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