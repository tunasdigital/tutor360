import BackToTop from "@/components/back-to-top";
import FooterOne from "@/components/footer/footer-one";
import HeaderThee from "@/components/header/header-thee";
import MainProvider from "@/components/provider/main-provider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <MainProvider>
      {/* Início da área do cabeçalho */}
      <HeaderThee sm_mega_title="Programas" />
      {/* Fim da área do cabeçalho */}

      {/* Conteúdo principal dinâmico */}
      {children}
      {/* Fim do conteúdo principal */}

      {/* Início da área do rodapé oficial Tutor360 */}
      <FooterOne />
      {/* Fim da área do rodapé */}

      {/* Botão flutuante de voltar ao topo */}
      <BackToTop />
      {/* Fim do botão de voltar ao topo */}
    </MainProvider>
  );
}