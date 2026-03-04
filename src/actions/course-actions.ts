'use server';

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { put } from "@vercel/blob"; 

/**
 * 🚀 EXTRATOR DE ID (Blindagem F05/F06)
 */
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

    // 1. ATUALIZA CURSO
    await prisma.course.update({
        where: { id: courseId },
        data: {
            title, slug, description, level, price, discountPrice,
            whatYouWillLearn, videoId: getYouTubeID(videoId) || null,
            ...(thumbnailUrl && { thumbnail: thumbnailUrl })
        }
    });

    // 2. ⚡ SINCRONIZADOR DE MÓDULOS E AULAS (Multimodal)
    await prisma.module.deleteMany({ where: { courseId } });

    for (let i = 0; i < moduleTitles.length; i++) {
        const mTitle = moduleTitles[i].trim();
        if (!mTitle) continue;

        const createdModule = await prisma.module.create({
            data: {
                title: mTitle,
                order: i,
                courseId: courseId
            }
        });

        // 🎯 O PONTO DE FALHA ESTAVA AQUI:
        const lessonTitles = formData.getAll(`lessonTitles_${i}[]`) as string[];
        const lessonVideos = formData.getAll(`lessonVideos_${i}[]`) as string[];
        const lessonDescriptions = formData.getAll(`lessonDescriptions_${i}[]`) as string[]; // 🚀 CAPTURA O TEXTO

        if (lessonTitles.length > 0) {
            await Promise.all(lessonTitles.map((lTitle, lIndex) => {
                const vUrlRaw = lessonVideos[lIndex] || "";
                const lDesc = lessonDescriptions[lIndex] || ""; // 🚀 PEGA A DESCRIÇÃO DA AULA
                
                if (!lTitle.trim()) return null;

                return prisma.lesson.create({
                    data: {
                        title: lTitle,
                        videoUrl: getYouTubeID(vUrlRaw),
                        description: lDesc, // 🚀 SALVA NO BANCO (Campo que criamos no Schema)
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

/**
 * 🎯 BUSCA CURSOS
 */
export async function getValidCoursesAction() {
    try {
        return await prisma.course.findMany({
            where: {
                AND: [
                    { title: { notContains: "Breve" } },
                    { title: { notContains: "Em breve" } },
                ],
            },
            orderBy: { id: 'asc' },
        });
    } catch (error) {
        return [];
    }
}