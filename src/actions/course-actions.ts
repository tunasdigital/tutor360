'use server';

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { put } from "@vercel/blob"; 

/**
 * 🎯 MANOBRA DO PENEIRÃO: Busca apenas cursos reais para a Home
 * Ignora cursos que contenham "Breve" no título.
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

// Ação invocada pelo formulário de edição do curso
export async function publishCourseAction(formData: FormData) {
    const courseId = formData.get("courseId") as string;
    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const description = formData.get("description") as string;
    const level = formData.get("level") as string;

    // 🚀 TÁTICA F04: Capturando a lista de "O que você vai aprender"
    const learnItemsRaw = formData.getAll("whatYouWillLearn[]") as string[];
    const whatYouWillLearn = learnItemsRaw.filter(item => item.trim() !== "");

    // 🚀 TÁTICA F05: O ELO PERDIDO DO VÍDEO
    // Agora a Action captura o que você digita no campo de Vídeo
    const videoId = formData.get("videoId") as string;

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

    // Persistência no PostgreSQL via Prisma
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
            // 🚀 Gravando os dados que estavam sendo ignorados:
            whatYouWillLearn: whatYouWillLearn, 
            videoId: videoId || null, // Salva o link no banco
            ...(thumbnailUrl && { thumbnail: thumbnailUrl })
        }
    });

    // Revalidação para atualizar o cache e refletir na vitrine e no painel
    revalidatePath("/dashboard/admin-all-courses");
    revalidatePath("/");
    revalidatePath(`/dashboard/create-new-course`); // Força o painel a recarregar os dados novos
    revalidatePath(`/course-details/${slug || courseId}`);

    redirect("/dashboard/admin-all-courses");
}