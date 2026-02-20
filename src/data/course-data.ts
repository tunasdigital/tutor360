import { ICourseDT } from "@/types/course-d-t";

// 1. DADOS TUTOR360 - Aqui faremos a carga dos 603 vídeos.
// Iniciaremos com o vídeo mestre para validação do Player.
export const tutor360_course_data: ICourseDT[] = [
  {
    id: 101,
    title: "Introdução ao Ecossistema Tutor360",
    author_img: "/assets/img/teacher/teacher-1.png",
    author_name: "Mentor Tutor360",
    // Gerando a thumb dinamicamente via YouTube para economizar processamento
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg", 
    category: "Treinamento",
    price: 0,
    avg_rating: 5,
    discount: 0,
    lessons: 1,
    students: 100,
    total_rating: 5,
    language: "Português",
    video_id: "dQw4w9WgXcQ", // ID essencial para o Modal Player
  }
];

// 2. DADOS ORIGINAIS DO TEMPLATE (Mantidos para garantir a integridade do layout)
export const online_courses_data: ICourseDT[] = [
  {
    id: 1,
    author_img: "/assets/img/teacher/teacher-5.png",
    author_name: "Hilary Ouse",
    title: "Interior design concepts <br /> Masterclass",
    thumbnail: "/assets/img/course/course-thumb-1.jpg",
    category: "Art & Design",
    price: 84,
    avg_rating: 5,
    discount: 25,
    lessons: 12,
    students: 45,
    total_rating: 5,
    language: "English",
  },
  {
    id: 2,
    author_img: "/assets/img/teacher/teacher-2.png",
    author_name: "Joss Sticks",
    title: "Starting seo as your home <br/> based business",
    thumbnail: "/assets/img/course/course-thumb-5.jpg",
    category: "Development",
    price: 54,
    avg_rating: 4,
    discount: 5,
    lessons: 15,
    students: 20,
    total_rating: 10,
    language: "English",
  },
  {
    id: 3,
    author_img: "/assets/img/teacher/teacher-3.png",
    author_name: "Purpleson",
    title: "Grow personal financial security <br/> thinking & principles",
    thumbnail: "/assets/img/course/course-thumb-2.jpg",
    category: "Machine Learning",
    price: 92,
    avg_rating: 4.5,
    discount: 10,
    lessons: 16,
    students: 52,
    total_rating: 15,
    language: "Russian",
  },
  {
    id: 4,
    author_img: "/assets/img/teacher/teacher-5.png",
    author_name: "Benjamin",
    title: "The complete guide to build <br/> restful API application",
    thumbnail: "/assets/img/course/course-thumb-4.jpg",
    category: "Marketing",
    price: 45,
    avg_rating: 4.8,
    discount: 0,
    lessons: 12,
    students: 60,
    total_rating: 12,
    language: "Hindi",
  },
  {
    id: 5,
    author_img: "/assets/img/teacher/teacher-4.png",
    author_name: "Indigo Violet",
    title: "Computer science: mathematical and analytical",
    thumbnail: "/assets/img/course/course-thumb-3.jpg",
    category: "Computer Science",
    price: 65,
    avg_rating: 5,
    discount: 4,
    lessons: 18,
    students: 68,
    total_rating: 4,
    language: "English",
  },
  {
    id: 6,
    author_img: "/assets/img/teacher/teacher-6.png",
    author_name: "Hanson Deck",
    title: "Machine learning A-Z: <br/> hands-on python and java",
    thumbnail: "/assets/img/course/course-thumb-6.jpg",
    category: "Programming",
    price: 75,
    avg_rating: 5,
    discount: 0,
    lessons: 20,
    students: 100,
    total_rating: 10,
    language: "English",
  },
];

export const gym_course_data: ICourseDT[] = [];
export const high_school_course_data: ICourseDT[] = [];

// 3. UNIÃO E EXPORTAÇÃO (O Spread Operator ... garante a fusão das listas)
export const all_courses = [
  ...tutor360_course_data,
  ...online_courses_data,
];