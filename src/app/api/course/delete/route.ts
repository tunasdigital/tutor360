import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ error: "ID não fornecido" }, { status: 400 });
        }

        // 🚀 O COMANDO DE ELIMINAÇÃO: Remove do banco definitivamente
        await prisma.course.delete({
            where: { id: id }
        });

        return NextResponse.json({ message: "Curso excluído com sucesso" });
    } catch (error) {
        console.error("Erro ao excluir curso:", error);
        return NextResponse.json({ error: "Erro interno ao excluir" }, { status: 500 });
    }
}