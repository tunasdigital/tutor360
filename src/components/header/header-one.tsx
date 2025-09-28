'use client'; 

import React, { useEffect } from "react"; 
import Link from "next/link";
import Image from "next/image";
// SearchSvg está sendo usado no SearchButton, então o mantemos!
import { SearchSvg } from "../svg"; 
import NavMenus from "./navbar/nav-menus";
import logo from "@/assets/img/logo/logo.png"; 
import logo_black from "@/assets/img/logo/logo-black-1.png";
import HeaderStickyWrapper from "./header-sticky-provider/header-sticky-wrapper";
import SearchButton from "./button/search-button";
import OffcanvasButton from "./button/offcanvas-btn";
import user_avatar_img from "@/assets/img/logo/logo.png"; 
import { useTranslation } from "react-i18next"; 

export default function HeaderOne() {
  const { t } = useTranslation(); 

  // JS FIX PARA COR (Mantido para garantir que o menu principal fique preto)
  useEffect(() => {
    const links = document.querySelectorAll('.main-menu ul li a');
    links.forEach(link => {
        link.style.color = '#1A1A1A'; 
        link.style.fontWeight = '500';
    });
  }, []);

  return (
    <>
      <header className="header-area p-relative"> 
        <HeaderStickyWrapper>
          <div className="container">
            <div className="row align-items-center">
              
              {/* Coluna 1: LOGO + BOTÃO CATEGORIA (3) */}
              <div className="col-xxl-3 col-xl-3 col-lg-6 col-md-6 col-6"> 
                <div className="tp-header-logo-1 tp-header-logo d-flex align-items-center">
                  
                  {/* Logo */}
                  <Link href="/">
                    <Image className="logo-1" src={logo} alt="Tutor 360 Logo" priority /> 
                    <Image
                      className="logo-2"
                      src={logo_black}
                      alt="Tutor 360 Logo Scroll"
                      priority
                    />
                  </Link>

                  {/* BOTÃO CATEGORIA: ALINHADO CORRETAMENTE AQUI */}
                  <div className="tp-header-category ml-20 d-none d-md-block">
                    <Link href="/course-category" className="tp-btn tp-category-btn">
                      <i className="fa-solid fa-grid"></i>
                      {t('category_button')} 
                    </Link>
                  </div>
                </div>
              </div>

              {/* Coluna 2: MENU PRINCIPAL (6) */}
              <div className="col-xxl-6 col-xl-6 d-none d-xl-block">
                <div className="main-menu">
                  <NavMenus />
                </div>
              </div>

              {/* Coluna 3: UTILITY / AVATAR / BUSCA (3) */}
              <div className="col-xxl-3 col-xl-3 col-lg-6 col-md-6 col-6">
                <div className="tp-header-contact d-flex align-items-center justify-content-end">
                  
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
                  
                  {/* Botão Offcanvas para Mobile/Hamburger */}
                  <div className="tp-header-bar ml-15"> 
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