import MainProvider from "@/components/provider/main-provider";
import BackToTop from "@/components/back-to-top";
import HeaderSeven from "@/components/header/header-seven";
import FooterOne from "@/components/footer/footer-one";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <MainProvider>
      {/* Início da área do cabeçalho da universidade */}
      <HeaderSeven/>
      {/* Fim da área do cabeçalho */}

      {/* Conteúdo dinâmico da página (Cursos/Programas) */}
      {children}
      {/* Fim do conteúdo principal */}

      {/* Início da área do rodapé oficial Tutor360 */}
      <FooterOne />
      {/* Fim da área do rodapé */}

      {/* Botão flutuante de voltar ao topo */}
      <BackToTop/>
      {/* Fim do botão de voltar ao topo */}
    </MainProvider>
  );
}