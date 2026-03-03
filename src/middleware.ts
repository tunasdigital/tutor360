import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

// Inicializa a proteção acionando o callback "authorized" do authConfig
export default NextAuth(authConfig).auth;

export const config = {
    // Vigia todas as rotas, exceto arquivos de sistema, imagens e APIs
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico|assets).*)"],
};