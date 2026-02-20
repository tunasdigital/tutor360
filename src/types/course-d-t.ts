// Interface que define a estrutura de dados de um curso no ecossistema Tutor360.
// Esta tipagem garante que tanto os dados originais do template Acadia 
// quanto as nossas inserções personalizadas (como video_id) funcionem sem erros.

export type ICourseDT = {
    id: number;              // Identificador único do curso
    title: string;           // Título visível no card
    author_img?: string;     // Foto do instrutor (opcional)
    author_name: string;     // Nome do instrutor
    thumbnail: string;       // Imagem de capa do curso
    category: string;        // Categoria para filtros (ex: Art & Design)
    price: number;           // Preço atual
    avg_rating: number;      // Média de estrelas (ex: 4.5)
    discount: number;        // Porcentagem de desconto (ex: 25)
    lessons: number;         // Quantidade total de aulas
    students: number;        // Quantidade de alunos matriculados
    total_rating: number;    // Quantidade total de avaliações
    language: string;        // Idioma principal do curso
    progress?: number;       // Barra de progresso (uso futuro para área do aluno)
    video_id?: string;       // ID do YouTube para o Player de Preview (Essencial para o Tutor360)
}