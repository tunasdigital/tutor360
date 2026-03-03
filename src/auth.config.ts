import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login', // Redireciona para cá quando barrado
  },
  callbacks: {
    // 🛡️ O NOVO GUARDA-COSTAS: Lógica de interceptação nativa do Next-Auth
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isDashboardRoute = nextUrl.pathname.startsWith('/dashboard');
      const isLoginRoute = nextUrl.pathname === '/login';

      if (isDashboardRoute) {
        if (isLoggedIn) return true;
        return false; // Retornar false = Redireciona para a página 'signIn' configurada acima
      } else if (isLoginRoute && isLoggedIn) {
        // 🚀 AJUSTE DE ROTA: Se tentar acessar o login já logado, joga direto para a Sala de Comando!
        return Response.redirect(new URL('/dashboard/admin-dashboard', nextUrl));
      }
      return true; // Deixa passar nas outras páginas (Home, etc)
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        (session.user as any).role = token.role;
      }
      return session;
    },
  },
  providers: [], 
} satisfies NextAuthConfig;