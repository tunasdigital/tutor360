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
    title: "Development",
    description: "Code with Confident",
    icon: category_icon_1,
    color: "cat-purple",
    key: "development",
  },
  {
    id: 2,
    title: "UI/UX Design",
    description: "Design with Confident",
    icon: category_icon_2,
    color: "cat-green",
    key: "ux_design",
  },
  {
    id: 3,
    title: "Lifestyle",
    description: "New Skills, New You",
    icon: category_icon_3,
    color: "cat-purple",
    key: "lifestyle",
  },
  {
    id: 4,
    title: "Business",
    description: "Improve your business",
    icon: category_icon_4,
    color: "cat-blue",
    key: "business",
  },
  {
    id: 5,
    title: "Photography",
    description: "Major or Minor",
    icon: category_icon_5,
    color: "cat-pink",
    key: "photography",
  },
  {
    id: 6,
    title: "Music",
    description: "Control your Wallet",
    icon: category_icon_6,
    color: "cat-l-purple",
    key: "music",
  },
  {
    id: 7,
    title: "Teaching",
    description: "High Education Level",
    icon: category_icon_7,
    color: "cat-yellow",
    key: "teaching",
  },
  {
    id: 8,
    title: "Development",
    description: "Improve your business",
    icon: category_icon_8,
    color: "cat-lgreen",
    key: "development",
  },
];

export { category_data };