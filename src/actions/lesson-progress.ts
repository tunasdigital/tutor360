'use server';

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function toggleLessonProgress(courseId: string, lessonId: string, userId: string) {
    try {
        // Verifica se já existe o registro
        const existingProgress = await prisma.lessonProgress.findFirst({
            where: { lessonId, userId }
        });

        if (existingProgress) {
            // Se já concluiu, nós desmarcamos (toggle)
            await prisma.lessonProgress.delete({
                where: { id: existingProgress.id }
            });
        } else {
            // Se não existe, marca como concluída
            await prisma.lessonProgress.create({
                data: {
                    lessonId,
                    userId,
                    courseId,
                    completed: true
                }
            });
        }

        revalidatePath(`/course-lesson/${courseId}`);
        return { success: true };
    } catch (error) {
        console.error("Erro ao atualizar progresso:", error);
        return { success: false };
    }
}