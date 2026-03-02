import { ICourseDT } from "@/types/course-d-t";

// 1. DADOS TUTOR360 - O curso mestre de validação
export const tutor360_course_data: ICourseDT[] = [
  {
    id: 101,
    title: "Introdução ao Ecossistema Tutor360",
    author_img: "/assets/img/teacher/teacher-1.png",
    author_name: "Mentor Tutor360",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg", 
    category: "Treinamento",
    price: 0,
    avg_rating: 5,
    discount: 0,
    lessons: 1,
    students: 100,
    total_rating: 5,
    language: "Português",
    video_id: "dQw4w9WgXcQ", 
  }
];

// 2. DADOS DOS ESPECIALISTAS (100% Sincronizados com as novas capas)
export const online_courses_data: ICourseDT[] = [
  {
    id: 1,
    author_img: "/assets/img/teacher/teacher-5.png",
    author_name: "Diego Rafael",
    title: "Empreendedor de <br /> Sucesso",
    thumbnail: "/assets/img/course/course-thumb-1.jpg",
    category: "Empreendedorismo",
    price: 84,
    avg_rating: 5,
    discount: 25,
    lessons: 12,
    students: 145,
    total_rating: 5,
    language: "Português",
  },
  {
    id: 2,
    author_img: "/assets/img/teacher/teacher-2.png",
    author_name: "Sheyla Sabino",
    title: "Oratória e <br/> Comunicação",
    thumbnail: "/assets/img/course/course-thumb-5.jpg",
    category: "Comunicação",
    price: 54,
    avg_rating: 4.9,
    discount: 5,
    lessons: 15,
    students: 220,
    total_rating: 10,
    language: "Português",
  },
  {
    id: 3,
    author_img: "/assets/img/teacher/teacher-3.png",
    author_name: "Francielle Colla",
    title: "5 Pilares do Empreendedorismo <br/> Eficaz",
    thumbnail: "/assets/img/course/course-thumb-2.jpg",
    category: "Empreendedorismo",
    price: 92,
    avg_rating: 5,
    discount: 10,
    lessons: 16,
    students: 152,
    total_rating: 15,
    language: "Português",
  },
  {
    id: 4,
    author_img: "/assets/img/teacher/teacher-5.png",
    author_name: "Milena Kremer",
    title: "Inteligência Emocional e <br/> Relações Interpessoais",
    thumbnail: "/assets/img/course/course-thumb-4.jpg",
    category: "Desenvolvimento",
    price: 45,
    avg_rating: 4.8,
    discount: 0,
    lessons: 12,
    students: 160,
    total_rating: 12,
    language: "Português",
  },
  {
    id: 5,
    author_img: "/assets/img/teacher/teacher-4.png",
    author_name: "Patrick Dauer",
    title: "O Guia Completo para <br/> Formalizar um MEI",
    thumbnail: "/assets/img/course/course-thumb-3.jpg",
    category: "Negócios",
    price: 65,
    avg_rating: 5,
    discount: 4,
    lessons: 18,
    students: 168,
    total_rating: 4,
    language: "Português",
  },
  {
    id: 6,
    author_img: "/assets/img/teacher/teacher-6.png",
    author_name: "Antônio Mendes",
    title: "Estratégias de Vendas de <br/> Alta Performance",
    thumbnail: "/assets/img/course/course-thumb-6.jpg",
    category: "Vendas",
    price: 75,
    avg_rating: 5,
    discount: 0,
    lessons: 20,
    students: 200,
    total_rating: 10,
    language: "Português",
  },
];

export const gym_course_data: ICourseDT[] = [];
export const high_school_course_data: ICourseDT[] = [];

// 3. UNIÃO E EXPORTAÇÃO
export const all_courses = [
  ...tutor360_course_data,
  ...online_courses_data,
];