import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function GET() {
    try {
        // 🔐 NOVOS DADOS DE ACESSO OFICIAL - TUTOR 360
        const adminEmail = "tutoradmin@tutor360.com.br";
        const adminPassword = "tutor360yoham";

        // 1. Criptografa a nova senha para o banco de dados aceitar
        const hashedPassword = await bcrypt.hash(adminPassword, 10);

        // 2. Injeta o novo usuário no Prisma (cria se não existir, atualiza a senha se já existir)
        const user = await prisma.user.upsert({
            where: { email: adminEmail },
            update: { password: hashedPassword },
            create: {
                name: "Admin Tutor360",
                email: adminEmail,
                password: hashedPassword,
                role: "ADMIN" // Garantindo que a gaveta receba a patente de Administrador
            }
        });

        return NextResponse.json({
            message: "👑 NOVA CHAVE MESTRA FORJADA COM SUCESSO!",
            credentials: {
                email: user.email,
                senha_temporaria: adminPassword
            }
        });
    } catch (error) {
        console.error("ERRO DE FORJA NO PRISMA:", error);
        return NextResponse.json({ 
            error: "Falha na criação. Verifique o terminal do VS Code para detalhes do erro." 
        }, { status: 500 });
    }
}