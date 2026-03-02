"use client";

import React, { useContext } from "react";
import { CourseContext } from "@/context/course-context";
import CourseItem from "./single/course-item";

export default function CourseItems() {
  // Conectando ao contexto para obter os cursos filtrados em tempo real
  const context = useContext(CourseContext);

  // Verificação de segurança para evitar que a página quebre se o contexto falhar
  if (!context) {
    return null;
  }

  const { filterCourse } = context;

  // LOG DE DEPURAÇÃO: Essencial para validarmos se os vídeos reais estão chegando na Home
  console.log("Cursos sendo renderizados na Home:", filterCourse);

  return (
    <>
      {filterCourse && filterCourse.length > 0 ? (
        filterCourse.map((item) => (
          <div key={item.id} className="col-lg-4 col-md-6 mb-30">
            {/* O componente CourseItem é quem desenha o card com o botão de Play */}
            <CourseItem course={item} />
          </div>
        ))
      ) : (
        <div className="col-12 text-center p-5">
          <p className="text-muted" style={{ fontSize: '18px' }}>Nenhum curso encontrado nesta categoria.</p>
          <small className="d-block mt-10">
            Dica do Mentor: Verifique se os cursos estão marcados com as categorias corretas no banco de dados.
          </small>
        </div>
      )}
    </>
  );
}