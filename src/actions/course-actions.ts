'use server';

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { put } from "@vercel/blob"; 

/**
 * 🎯 MANOBRA DO PENEIRÃO: Busca apenas cursos reais para a Home
 */
export async function getValidCoursesAction() {
  try {
    const courses = await prisma.course.findMany({
      where: {
        AND: [
          { title: { notContains: "Breve" } },
          { title: { notContains: "Em breve" } },
        ],
      },
      orderBy: { id: 'asc' },
    });
    return courses;
  } catch (error) {
    console.error("Erro ao buscar cursos válidos:", error);
    return [];
  }
}

// 🚀 FUNÇÃO PRINCIPAL: Onde todo o salvamento acontece
export async function publishCourseAction(formData: FormData) {
    const courseId = formData.get("courseId") as string;
    
    // Rastreador no terminal para garantir que o ID chegou
    console.log("LOG DE PRODUÇÃO - ID DO CURSO RECEBIDO:", courseId); 

    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const description = formData.get("description") as string;
    const level = formData.get("level") as string;

    // TÁTICA F04: Benefícios
    const learnItemsRaw = formData.getAll("whatYouWillLearn[]") as string[];
    const whatYouWillLearn = learnItemsRaw.filter(item => item.trim() !== "");

    // TÁTICA F05: Vídeo de Introdução
    const videoId = formData.get("videoId") as string;

    // 🚀 TÁTICA F06: Captura dos Módulos
    const moduleTitlesRaw = formData.getAll("moduleTitles[]") as string[];
    const moduleTitles = moduleTitlesRaw.map(t => t.trim()).filter(t => t !== "");

    const price = parseFloat(formData.get("price") as string) || 0;
    const discountPrice = parseFloat(formData.get("discountPrice") as string) || 0;
    const maxStudents = parseInt(formData.get("maxStudents") as string, 10) || 0;

    const thumbnailFile = formData.get("thumbnail") as File;
    let thumbnailUrl = undefined; 

    if (thumbnailFile && thumbnailFile.size > 0) {
        const blob = await put(thumbnailFile.name, thumbnailFile, {
            access: 'public', 
        });
        thumbnailUrl = blob.url; 
    }

    if (!courseId) {
        throw new Error("ID do curso não fornecido para atualização.");
    }

    // 1. ATUALIZA O CURSO PRINCIPAL
    await prisma.course.update({
        where: { id: courseId },
        data: {
            title,
            slug,
            description,
            level,
            price,
            discountPrice,
            maxStudents,
            whatYouWillLearn: whatYouWillLearn, 
            videoId: videoId || null,
            ...(thumbnailUrl && { thumbnail: thumbnailUrl })
        }
    });

    // 2. 🚀 SINCRONIZADOR AGRESSIVO DE MÓDULOS (F06)
    // Só executa se tivermos um curso válido e módulos enviados da tela
    if (courseId && moduleTitles.length > 0) {
        // Passo A: Limpa todos os módulos velhos deste curso para não haver duplicatas
        await prisma.module.deleteMany({ 
            where: { courseId: courseId } 
        });
        
        // Passo B: Cria todos os módulos novos exatamente na ordem da tela
        await Promise.all(moduleTitles.map((moduleTitle, index) => {
            return prisma.module.create({
                data: {
                    title: moduleTitle,
                    order: index,
                    courseId: courseId
                }
            });
        }));
    } else if (courseId && moduleTitles.length === 0) {
        // Se o usuário excluiu todos os módulos na tela, limpamos o banco também
        await prisma.module.deleteMany({ 
            where: { courseId: courseId } 
        });
    }

    // 3. REVALIDAÇÃO DE CACHE E REDIRECIONAMENTO
    revalidatePath("/dashboard/admin-all-courses");
    revalidatePath("/");
    revalidatePath(`/dashboard/create-new-course`); 
    revalidatePath(`/course-details/${slug || courseId}`);

    redirect("/dashboard/admin-all-courses");
}