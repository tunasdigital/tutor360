import BackToTop from "@/components/back-to-top";
import FooterSeven from "@/components/footer/footer-seven";
import HeaderTwo from "@/components/header/header-two";
import MainProvider from "@/components/provider/main-provider";

export default function Layout({children}: {children:React.ReactNode}) {
  return (
    <MainProvider>

      {/* Início da área do cabeçalho */}
      <HeaderTwo inner={true}/>
      {/* Fim da área do cabeçalho */}

      {/* Conteúdo principal dinâmico da página */}
      {children}
      {/* Fim do conteúdo principal */}

      {/* Início da área do rodapé do painel */}
      <FooterSeven dashboard_footer={true}/>
      {/* Fim da área do rodapé do painel */}

      {/* Botão flutuante de voltar ao topo */}
      <BackToTop />
      {/* Fim do botão de voltar ao topo */}
      
    </MainProvider>
  );
}