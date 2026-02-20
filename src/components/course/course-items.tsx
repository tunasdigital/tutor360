"use client";

import React, { useContext } from "react";
import { CourseContext } from "@/context/course-context";
import CourseItem from "./single/course-item";

export default function CourseItems() {
  // Conectando ao contexto para obter os cursos filtrados
  const context = useContext(CourseContext);

  // Verificação de segurança para evitar crash
  if (!context) {
    return null;
  }

  const { filterCourse } = context;

  // LOG DE DEPURAÇÃO: Isso nos ajudará a ver no F12 o que está chegando aqui.
  console.log("Cursos sendo renderizados:", filterCourse);

  return (
    <>
      {filterCourse && filterCourse.length > 0 ? (
        filterCourse.map((item) => (
          <div key={item.id} className="col-lg-4 col-md-6">
            <CourseItem course={item} />
          </div>
        ))
      ) : (
        <div className="col-12 text-center p-5">
          <p className="text-muted">Nenhum curso encontrado nesta categoria.</p>
          <small>Dica do Mentor: Verifique se a categoria 'Treinamento' está ativa nos filtros.</small>
        </div>
      )}
    </>
  );
}