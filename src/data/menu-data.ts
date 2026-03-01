import { IMenu, IMenuDT2 } from "@/types/menu-d-t";

const menu_data: IMenu[] = [
    {
        id: 1,
        title: 'Início',
        link: '/',
    },
    {
        id: 2,
        title: 'Cursos',
        link: '/courses',
    },
    {
        id: 3,
        title: 'Planos',
        link: '/pricing',
    },
    {
        id: 4,
        title: 'Contato',
        link: '/contact',
    }
];

export default menu_data;

export const menu_data_2: IMenuDT2[] = [
    { id: 1, title: 'Início', link: '/' },
    { id: 2, title: 'Cursos', link: '/courses' },
    { id: 3, title: 'Planos', link: '/pricing' },
    { id: 4, title: 'Contato', link: '/contact' }
];