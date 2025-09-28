import React from "react";
import Link from "next/link";
import Image from "next/image";
import { SearchSvg } from "../svg";
import NavMenus from "./navbar/nav-menus";
import logo from "@/assets/img/logo/logo.png"; 
import HeaderTopArea from "./header-top/header-top-area";
import logo_black from "@/assets/img/logo/logo-black-1.png";
import HeaderStickyWrapper from "./header-sticky-provider/header-sticky-wrapper";
import SearchButton from "./button/search-button";
import OffcanvasButton from "./button/offcanvas-btn";
import user_avatar_img from "@/assets/img/logo/logo.png"; 

export default function HeaderOne() {
  return (
    <>
      <header className="header-area tp-header-transparent p-relative">
          
        <HeaderStickyWrapper>
          <div className="container">
            <div className="row align-items-center">
              {/* Coluna do Logo: Largura 2, para dar espaço ao menu */}
              <div className="col-xxl-2 col-xl-2 col-lg-6 col-md-6 col-6"> 
                <div className="tp-header-logo-1 tp-header-logo">
                  <Link href="/">
                    <Image className="logo-1" src={logo} alt="Tutor 360 Logo" priority /> 
                    <Image
                      className="logo-2"
                      src={logo_black}
                      alt="Tutor 360 Logo Scroll"
                      priority
                    />
                  </Link>
                </div>
              </div>

              {/* Coluna do Menu: LARGURA MÁXIMA (7) e texto alinhado ao centro (retirado o text-end) */}
              <div className="col-xxl-7 col-xl-6 d-none d-xl-block">
                <div className="main-menu"> 
                  <NavMenus />
                </div>
              </div>

              {/* Coluna dos Botões/Busca/Avatar: LARGURA MÍNIMA (3) e justificado à direita */}
              <div className="col-xxl-3 col-xl-4 col-lg-6 col-md-6 col-6">
                <div className="tp-header-contact d-flex align-items-center justify-content-end">
                  
                  {/* Botão Categoria */}
                  <div className="tp-header-category d-none d-md-block">
                    <Link href="/course-category" className="tp-btn tp-category-btn">
                      <i className="fa-solid fa-grid"></i>
                      Categoria
                    </Link>
                  </div>
                  
                  {/* Avatar do Usuário */}
                  <div className="tp-header-user ml-15 d-none d-lg-block">
                    <Link href="/my-profile" className="tp-user-avatar">
                        <Image src={user_avatar_img} alt="Avatar do Usuário" width={36} height={36} style={{borderRadius: '50%'}} />
                    </Link>
                  </div>

                  {/* Campo de Busca */}
                  <div className="tp-header-serach ml-15"> 
                    <SearchButton />
                  </div>
                  
                  {/* Botão Offcanvas para Mobile */}
                  <div className="tp-header-bar d-xl-none ml-30">
                    <OffcanvasButton/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </HeaderStickyWrapper>
      </header>
      {/* mobile offcanvas */}
      <div id="offcanvas-sidebar"/>
    </>
  );
}