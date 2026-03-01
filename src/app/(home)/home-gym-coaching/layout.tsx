import BackToTop from "@/components/back-to-top";
import FooterOne from "@/components/footer/footer-one";
import HeaderFour from "@/components/header/header-four";
import MainProvider from "@/components/provider/main-provider";

export default function Layout({children}: {children:React.ReactNode}) {
  return (
    <MainProvider>

      {/* Início da área do cabeçalho */}
      <HeaderFour sm_mega_title="programas" />
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