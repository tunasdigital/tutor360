'use client';
import React, { useState, useEffect } from "react";
import { CourseContext } from "@/context/course-context";
import { ICourseDT } from "@/types/course-d-t";
import { all_courses } from "@/data/course-data";

type IPropType = {
  children: React.ReactNode;
};

export default function CourseProvider({ children }: IPropType) {
  const [activeTab, setActiveTab] = useState<string>("All Courses");
  
  // Iniciamos com um array vazio e preenchemos no useEffect para evitar erro de hidratação (SSR)
  const [filterCourse, setFilterCourse] = useState<ICourseDT[]>([]);

  useEffect(() => {
    // Verificação de segurança: se all_courses não existir, não quebra o site
    if (!all_courses) return;

    if (activeTab === "All Courses") {
      setFilterCourse(all_courses);
    } else {
      const filtered = all_courses.filter(course => course.category === activeTab);
      setFilterCourse(filtered.length > 0 ? filtered : all_courses);
    }
  }, [activeTab]);

  return (
    <CourseContext.Provider value={{ activeTab, setActiveTab, filterCourse }}>
      {children}
    </CourseContext.Provider>
  );
}