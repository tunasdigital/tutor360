/**
 * 🚀 MOTOR ABABOO: Calcula o progresso real do aluno
 * @param totalLessons Quantidade total de aulas no curso
 * @param completedCount Quantidade de aulas marcadas como concluídas no Prisma
 */
export function calculateCourseProgress(totalLessons: number, completedCount: number): number {
    if (totalLessons <= 0) return 0;
    
    const percentage = (completedCount / totalLessons) * 100;
    
    // Retorna o valor arredondado para não quebrar o layout com decimais
    return Math.round(percentage > 100 ? 100 : percentage);
}