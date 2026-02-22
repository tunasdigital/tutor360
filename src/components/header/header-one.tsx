'use client'; 

import React, { useEffect } from "react"; 
import Link from "next/link";
import Image from "next/image";
import NavMenus from "./navbar/nav-menus";
import logo from "@/assets/img/logo/logo.png"; 
import HeaderStickyWrapper from "./header-sticky-provider/header-sticky-wrapper";
import SearchButton from "./button/search-button";
import user_avatar_img from "@/assets/img/logo/logo.png"; 

export default function HeaderOne() {

  useEffect(() => {
    const links = document.querySelectorAll('.main-menu ul li a');
    links.forEach(link => {
        (link as HTMLElement).style.color = '#1A1A1A'; 
        (link as HTMLElement).style.fontWeight = '600';
        (link as HTMLElement).style.fontSize = '15px';
    });
  }, []);

  return (
    <>
      <header className="header-area p-relative"> 
        <HeaderStickyWrapper>
          <div className="container"> 
            <div className="row align-items-center">
              
              <div className="col-12">
                <div className="tp-header-main-wrapper d-flex align-items-center justify-content-between">
                  
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
                      <Link href="/course-with-filter" className="tp-btn tp-category-btn" 
                        style={{ 
                          border: '1px solid rgba(0, 85, 255, 0.2)',
                          display: 'inline-flex',
                          alignItems: 'center',
                          backgroundColor: 'transparent',
                          color: '#1A1A1A',
                          fontSize: '15px',
                          fontWeight: '600'
                        }}>
                        {/* Trocado para fa-light ou fa-regular para ser fino/chique */}
                        <i className="fa-light fa-grid-2 mr-10" style={{ fontSize: '18px', color: '#0055FF' }}></i>
                        Categorias
                      </Link>
                    </div>
                  </div>

                  {/* CENTRO: MENU */}
                  <div className="main-menu d-none d-xl-block">
                    <NavMenus />
                  </div>

                  {/* DIREITA: ÁREA DO ALUNO */}
                  <div className="tp-header-right d-flex align-items-center">
                    
                    <div className="tp-header-login d-none d-lg-block mr-20">
                       <Link href="/dashboard/student-dashboard" className="tp-btn tp-category-btn"
                        style={{
                          backgroundColor: 'rgba(0, 85, 255, 0.06)', 
                          color: '#0055FF', 
                          borderRadius: '50px', 
                          padding: '10px 25px',
                          border: '1px solid rgba(0, 85, 255, 0.2)',
                          display: 'inline-flex',
                          alignItems: 'center',
                          fontWeight: '600',
                          transition: 'all 0.3s ease'
                        }}>
                          {/* Ícone da Área do Aluno também ajustado para harmonia */}
                          <i className="fa-light fa-user-circle mr-10" style={{ fontSize: '20px' }}></i>
                          Área do Aluno
                       </Link>
                    </div>

                    <div className="tp-header-user d-none d-lg-block">
                      <Link href="/dashboard/student-dashboard" className="tp-user-avatar">
                          <Image src={user_avatar_img} alt="Avatar" width={40} height={40} style={{borderRadius: '50%', border: '2px solid #FFB600'}} />
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
      <div id="offcanvas-sidebar"/>
    </>
  );
}