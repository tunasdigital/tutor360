import Image from "next/image";
import Link from "next/link";
import NavMenus from "./navbar/nav-menus";
import logo from "@/assets/img/logo/logo-black.png";
import HeaderStickyWrapper from "./header-sticky-provider/header-sticky-wrapper";
import OffcanvasButton from "./button/offcanvas-btn";

// Definição do tipo para as propriedades do componente
type IProps = {
  sm_mega_title?: string;
};

export default function HeaderThee({sm_mega_title}: IProps) {
  return (
    <>
      <header>
        <HeaderStickyWrapper cls="header-area tp-header-transparent tp-header-3">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-xxl-2 col-xl-2 col-6">
                <div className="tp-header-logo">
                  <Link href="/">
                    <Image src={logo} alt="Tutor360 Logo" priority style={{height:'auto'}} />
                  </Link>
                </div>
              </div>
              <div className="col-xxl-8 col-xl-7 d-none d-xl-block">
                <div className="main-menu text-center">
                  {/* Menus de navegação integrados */}
                  <NavMenus sm_mega_title={sm_mega_title} />
                </div>
              </div>
              <div className="col-xxl-2 col-xl-3 col-6">
                <div className="tp-header-contact d-flex align-items-center justify-content-end">
                  <div className="tp-header-3-btn d-none d-sm-block">
                    {/* Tradução do CTA para o padrão brasileiro */}
                    <Link className="tp-btn-tomato" href="/contact">
                      Agende uma visita
                    </Link>
                  </div>
                  <div className="offcanvas-btn d-xxl-none ml-30">
                    <OffcanvasButton offcanvas_cls="offcanvas__3" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </HeaderStickyWrapper>
      </header>

      {/* Menu lateral mobile (Offcanvas) */}
      <div id="offcanvas-sidebar"/>
    </>
  );
}