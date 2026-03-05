'use server';

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { put } from "@vercel/blob"; 

// Extrator de ID vitorioso (para o player funcionar)
const getYouTubeID = (url: string) => {
    if (!url) return "";
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : url;
};

export async function publishCourseAction(formData: FormData) {
    const courseId = formData.get("courseId") as string;
    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const description = formData.get("description") as string;
    const level = formData.get("level") as string;
    const videoId = formData.get("videoId") as string;
    
    // Captura dos campos do Certificado e Instrutores
    const certificateTemplate = formData.get("certificateTemplate") as string || "1";
    const instructors = formData.getAll("instructors[]") as string[];

    const whatYouWillLearn = (formData.getAll("whatYouWillLearn[]") as string[]).filter(item => item.trim() !== "");
    const moduleTitles = formData.getAll("moduleTitles[]") as string[];

    const price = parseFloat(formData.get("price") as string) || 0;
    const discountPrice = parseFloat(formData.get("discountPrice") as string) || 0;

    const thumbnailFile = formData.get("thumbnail") as File;
    let thumbnailUrl = undefined; 

    if (thumbnailFile && thumbnailFile.size > 0) {
        const blob = await put(thumbnailFile.name, thumbnailFile, { access: 'public' });
        thumbnailUrl = blob.url; 
    }

    if (!courseId) throw new Error("ID do curso não fornecido.");

    // ==========================================
    // 1. ATUALIZA DADOS MESTRES (Agora com as novas colunas)
    // ==========================================
    await prisma.course.update({
        where: { id: courseId },
        data: {
            title, slug, description, level, price, discountPrice,
            whatYouWillLearn, 
            instructors, // ✅ Fiação ligada!
            certificateTemplate, // ✅ Fiação ligada!
            videoId: getYouTubeID(videoId) || null,
            ...(thumbnailUrl && { thumbnail: thumbnailUrl })
        }
    });

    // ==========================================
    // 📎 2. GESTÃO DE ANEXOS (UPLOAD PARA VERCEL BLOB)
    // ==========================================
    const attachmentFiles = formData.getAll("attachments[]") as File[];

    if (attachmentFiles && attachmentFiles.length > 0) {
        // Limpamos os antigos do banco nesta edição para evitar duplicatas
        await prisma.attachment.deleteMany({ where: { courseId } });

        for (const file of attachmentFiles) {
            if (file.size > 0) {
                // Sobe o PDF/Planilha para a nuvem da Vercel
                const blob = await put(`attachments/${file.name}`, file, {
                    access: 'public',
                    addRandomSuffix: true // Evita que arquivos com mesmo nome deem conflito
                });

                // Salva o "recibo" (dados e URL) na nova tabela do banco
                await prisma.attachment.create({
                    data: {
                        name: file.name,
                        url: blob.url,
                        size: file.size / (1024 * 1024), // Converte bytes para MB
                        courseId: courseId
                    }
                });
            }
        }
    }

    // ==========================================
    // ⚡ 3. SINCRONIZAÇÃO DE MÓDULOS E AULAS
    // ==========================================
    await prisma.module.deleteMany({ where: { courseId } });

    for (let i = 0; i < moduleTitles.length; i++) {
        const mTitle = moduleTitles[i].trim();
        if (!mTitle) continue;

        const createdModule = await prisma.module.create({
            data: { title: mTitle, order: i, courseId: courseId }
        });

        const lessonTitles = formData.getAll(`lessonTitles_${i}[]`) as string[];
        const lessonVideos = formData.getAll(`lessonVideos_${i}[]`) as string[];
        const lessonDescriptions = formData.getAll(`lessonDescriptions_${i}[]`) as string[];

        if (lessonTitles.length > 0) {
            await Promise.all(lessonTitles.map((lTitle, lIndex) => {
                if (!lTitle.trim()) return null;
                return prisma.lesson.create({
                    data: {
                        title: lTitle,
                        videoUrl: getYouTubeID(lessonVideos[lIndex] || ""),
                        description: lessonDescriptions[lIndex] || "",
                        slug: `${slug}-m${i}-l${lIndex}`,
                        order: lIndex,
                        courseId: courseId,
                        moduleId: createdModule.id
                    }
                });
            }));
        }
    }

    revalidatePath("/dashboard/admin-all-courses");
    revalidatePath(`/dashboard/create-new-course`);
    redirect("/dashboard/admin-all-courses");
}