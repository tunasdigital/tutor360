'use client';
import React, { useState, useEffect } from "react";
import { CourseContext } from "@/context/course-context";

// Deletamos a importação criminosa: import { all_courses } from "@/data/course-data";

type IPropType = {
  children: React.ReactNode;
  // TÁTICA DE MESTRE: Criamos uma "Porta de Entrada" para os cursos reais do Prisma
  courses?: any[]; 
};

export default function CourseProvider({ children, courses = [] }: IPropType) {
  // Ajuste fino para o padrão nacionalizado da sua plataforma
  const [activeTab, setActiveTab] = useState<string>("Todos");
  
  // Iniciamos com um array vazio e preenchemos no useEffect para evitar erro de hidratação (SSR)
  const [filterCourse, setFilterCourse] = useState<any[]>([]);

  useEffect(() => {
    // Defesa anti-quebra: Se os dados do Prisma ainda não chegaram, não fazemos nada
    if (!courses || courses.length === 0) {
      setFilterCourse([]);
      return;
    }

    if (activeTab === "Todos") {
      setFilterCourse(courses);
    } else {
      // Inteligência de Filtro: Varre a categoria do curso real do PostgreSQL
      const filtered = courses.filter(course => course.category === activeTab);
      setFilterCourse(filtered.length > 0 ? filtered : courses);
    }
  }, [activeTab, courses]);

  return (
    <CourseContext.Provider value={{ activeTab, setActiveTab, filterCourse }}>
      {children}
    </CourseContext.Provider>
  );
}