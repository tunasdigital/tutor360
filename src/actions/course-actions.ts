'use server';

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { put } from "@vercel/blob"; 

/**
 * 🎯 MANOBRA DO PENEIRÃO: Busca apenas cursos reais para a Home
 * Ignora cursos que contenham "Breve" no título ou que não possuam preço definido (opcional).
 */
export async function getValidCoursesAction() {
  try {
    const courses = await prisma.course.findMany({
      where: {
        AND: [
          {
            title: {
              notContains: "Breve", // Descarta rascunhos do WP
            },
          },
          {
            title: {
              notContains: "Em breve", // Segunda camada de segurança
            },
          },
        ],
      },
      orderBy: {
        id: 'asc', // Mantém a ordem de migração
      },
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
            ...(thumbnailUrl && { thumbnail: thumbnailUrl })
        }
    });

    revalidatePath("/dashboard/admin-all-courses");
    revalidatePath("/");

    redirect("/dashboard/admin-all-courses");
}