import { ICategoryDT } from "@/types/category-d-t";

// Importações dos ícones usando a sintaxe CORRETA do Next.js/TypeScript:
import category_icon_1 from '@/assets/img/icon/category/cat-2-icon-1.svg';
import category_icon_2 from '@/assets/img/icon/category/cat-2-icon-2.svg';
import category_icon_3 from '@/assets/img/icon/category/cat-2-icon-3.svg';
import category_icon_4 from '@/assets/img/icon/category/cat-2-icon-4.svg';
import category_icon_5 from '@/assets/img/icon/category/cat-2-icon-5.svg';
import category_icon_6 from '@/assets/img/icon/category/cat-2-icon-6.svg';
import category_icon_7 from '@/assets/img/icon/category/cat-2-icon-7.svg';
import category_icon_8 from '@/assets/img/icon/category/cat-2-icon-8.svg';

const category_data: ICategoryDT[] = [
  {
    id: 1,
    title: "Empreendedorismo & Negócios",
    description: "Transforme sua ideia em negócio",
    icon: category_icon_1,
    color: "cat-purple",
    key: "empreendedorismo",
  },
  {
    id: 2,
    title: "Vendas & Marketing",
    description: "Estratégias de alta performance",
    icon: category_icon_2,
    color: "cat-green",
    key: "vendas_marketing",
  },
  {
    id: 3,
    title: "Soft Skills & Inteligência Emocional",
    description: "Controle e relações interpessoais",
    icon: category_icon_3,
    color: "cat-purple",
    key: "soft_skills",
  },
  {
    id: 4,
    title: "Finanças & Investimentos",
    description: "Gestão e crescimento de patrimônio",
    icon: category_icon_4,
    color: "cat-blue",
    key: "financas",
  },
  {
    id: 5,
    title: "Carreira & Liderança",
    description: "Destaque-se no mercado",
    icon: category_icon_5,
    color: "cat-pink",
    key: "carreira",
  },
  {
    id: 6,
    title: "Tecnologia & Inteligência Artificial",
    description: "Inovação e ferramentas do futuro",
    icon: category_icon_6,
    color: "cat-l-purple",
    key: "tecnologia",
  },
  {
    id: 7,
    title: "Comunicação & Oratória",
    description: "Fale com confiança e clareza",
    icon: category_icon_7,
    color: "cat-yellow",
    key: "comunicacao",
  },
  {
    id: 8,
    title: "Saúde & Bem-Estar",
    description: "Corpo e mente em equilíbrio",
    icon: category_icon_8,
    color: "cat-lgreen",
    key: "saude",
  },
];

export { category_data };