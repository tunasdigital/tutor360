import BackToTop from "@/components/back-to-top";
import FooterOne from "@/components/footer/footer-one";
import HeaderTwo from "@/components/header/header-two";
import MainProvider from "@/components/provider/main-provider";

export default function Layout({children}: {children:React.ReactNode}) {
  return (
    <MainProvider>

      {/* header area start */}
      <HeaderTwo inner={true}/>
      {/* header area end */}

      {/* main content */}
      {children}
      {/* main content */}

      {/* footer area start */}
      <FooterOne />
      {/* footer area end */}

      {/* back to top */}
      <BackToTop />
      {/* back to top */}
    </MainProvider>
  );
}