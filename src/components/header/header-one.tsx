'use client'; 

import React from "react"; 
import Link from "next/link";
import Image from "next/image";
import NavMenus from "./navbar/nav-menus";
import logo from "@/assets/img/logo/logo.png"; 
import SearchButton from "./button/search-button";

const user_avatar_img = "/favicon.ico"; 

export default function HeaderOne() {
  return (
    <>
      <header 
        className="header-area w-100" 
        style={{ 
          backgroundColor: '#FFFFFF', 
          position: 'relative', 
          zIndex: 999, 
          borderBottom: '1px solid #f0f0f0'
        }}
      > 
        <div className="container"> 
          <div className="row align-items-center">
            
            <div className="col-12">
              <div className="tp-header-main-wrapper d-flex align-items-center justify-content-between" style={{ padding: '2px 0' }}>
                
                {/* ESQUERDA: LOGO + CATEGORIAS */}
                <div className="tp-header-left d-flex align-items-center">
                  <div className="tp-header-logo">
                    <Link href="/">
                      <Image 
                        src={logo} 
                        alt="Tutor 360" 
                        priority 
                        width={200}
                        height={40} 
                        style={{ width: 'auto', height: '32px', objectFit: 'contain' }} 
                      /> 
                    </Link>
                  </div>

                  <div className="tp-header-category ml-20 d-none d-xl-block">
                    <Link href="/course-categories" className="tp-btn tp-category-btn" 
                      style={{ 
                        border: '1px solid #0055FF',
                        display: 'inline-flex',
                        alignItems: 'center',
                        backgroundColor: 'rgba(0, 85, 255, 0.05)',
                        color: '#0055FF',
                        fontSize: '12px',
                        fontWeight: '700',
                        padding: '4px 10px',
                        borderRadius: '6px'
                      }}>
                      <i className="fa-light fa-grid-2 mr-8" style={{ fontSize: '12px' }}></i>
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
                  
                  <div className="tp-header-login d-none d-lg-block mr-15">
                     <Link href="/dashboard/student-dashboard" 
                      style={{
                        backgroundColor: '#0055FF', 
                        color: '#FFFFFF', 
                        borderRadius: '50px', 
                        padding: '4px 14px', 
                        display: 'inline-flex',
                        alignItems: 'center',
                        fontWeight: '600',
                        fontSize: '12px',
                        textDecoration: 'none'
                      }}>
                        <i className="fa-light fa-user-circle mr-8" style={{ fontSize: '14px' }}></i>
                        Área do Aluno
                     </Link>
                  </div>

                  <div className="tp-header-user d-none d-lg-block">
                    <Link href="/dashboard/student-dashboard" className="tp-user-avatar">
                        <Image src={user_avatar_img} alt="Avatar" width={28} height={28} style={{borderRadius: '50%', border: '2px solid #FFB600', padding: '1px', backgroundColor: '#fff', objectFit: 'contain'}} />
                    </Link>
                  </div>

                  <div className="tp-header-search ml-10"> 
                    <SearchButton />
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </header>
    </>
  );
}