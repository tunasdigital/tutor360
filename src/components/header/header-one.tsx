'use client'; 

import React from "react"; 
import Link from "next/link";
import Image from "next/image";
import NavMenus from "./navbar/nav-menus";
import logo from "@/assets/img/logo/logo.png"; 
import HeaderStickyWrapper from "./header-sticky-provider/header-sticky-wrapper";
import SearchButton from "./button/search-button";

// TÁTICA DE BRANDING: Avatar com Favicon Tutor360
const user_avatar_img = "/favicon.ico"; 

export default function HeaderOne() {
  return (
    <>
      {/* TÁTICA DE CHOQUE: Forçando o fundo do cabeçalho como branco sólido para as páginas internas.
          Isso anula qualquer transparência que esteja "lavando" a cor das letras. */}
      <header className="header-area w-100" style={{ backgroundColor: '#FFFFFF', position: 'relative', zIndex: 9999, borderBottom: '1px solid #f0f0f0' }}> 
        <HeaderStickyWrapper>
          <div className="container"> 
            <div className="row align-items-center">
              
              <div className="col-12">
                <div className="tp-header-main-wrapper d-flex align-items-center justify-content-between" style={{ padding: '15px 0' }}>
                  
                  {/* ESQUERDA: LOGO + CATEGORIAS */}
                  <div className="tp-header-left d-flex align-items-center">
                    <div className="tp-header-logo">
                      <Link href="/">
                        <Image 
                          src={logo} 
                          alt="Tutor 360" 
                          priority 
                          width={280}
                          height={60} 
                          style={{ width: 'auto', height: '55px', objectFit: 'contain' }}
                        /> 
                      </Link>
                    </div>

                    <div className="tp-header-category ml-30 d-none d-xl-block">
                      <Link href="/course-categories" className="tp-btn tp-category-btn" 
                        style={{ 
                          border: '1px solid #0055FF',
                          display: 'inline-flex',
                          alignItems: 'center',
                          backgroundColor: 'rgba(0, 85, 255, 0.05)',
                          color: '#0055FF',
                          fontSize: '15px',
                          fontWeight: '700',
                          padding: '8px 20px',
                          borderRadius: '8px'
                        }}>
                        <i className="fa-light fa-grid-2 mr-10" style={{ fontSize: '18px' }}></i>
                        Categorias
                      </Link>
                    </div>
                  </div>

                  {/* CENTRO: MENU (Com estilo forçado via ID no CSS global ou inline no NavMenus) */}
                  <div className="main-menu d-none d-xl-block">
                    <NavMenus />
                  </div>

                  {/* DIREITA: ÁREA DO ALUNO */}
                  <div className="tp-header-right d-flex align-items-center">
                    
                    <div className="tp-header-login d-none d-lg-block mr-20">
                       <Link href="/dashboard/student-dashboard" 
                        style={{
                          backgroundColor: '#0055FF', 
                          color: '#FFFFFF', 
                          borderRadius: '50px', 
                          padding: '10px 25px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          fontWeight: '600',
                          textDecoration: 'none'
                        }}>
                          <i className="fa-light fa-user-circle mr-10" style={{ fontSize: '20px' }}></i>
                          Área do Aluno
                       </Link>
                    </div>

                    <div className="tp-header-user d-none d-lg-block">
                      <Link href="/dashboard/student-dashboard" className="tp-user-avatar">
                          <Image src={user_avatar_img} alt="Avatar" width={40} height={40} style={{borderRadius: '50%', border: '2px solid #FFB600', padding: '2px', backgroundColor: '#fff', objectFit: 'contain'}} />
                      </Link>
                    </div>

                    <div className="tp-header-search ml-15"> 
                      <SearchButton />
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </HeaderStickyWrapper>
      </header>
    </>
  );
}