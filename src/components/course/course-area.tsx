'use client';

import Link from "next/link";
import Image from "next/image";
import shape_underline from "@/assets/img/unlerline/course-2-svg-1.svg";
import category_shape from "@/assets/img/shape/category-2-shape-1.png";
import CourseProvider from "../provider/course-provider";
import CourseTabBtn from "./course-tab-btn";
import CourseItems from "./course-items";

// Tradução das abas de navegação
const tab_navs = ["Todos", "Tendências", "Populares", "Destaques"];

export default function CourseArea() {
  return (
    <CourseProvider>
      <section className="course-area tp-course-wrapper mt-100 mb-100">
        <div className="container">
          <div className="row align-items-end">
            <div className="col-xxl-5 col-xl-5 col-lg-6">
              <div className="tp-section mb-40">
                <span 
                  className="tp-section-3-subtitle" 
                  style={{ color: '#0055FF', fontWeight: '600', marginBottom: '10px', display: 'block' }}
                >
                  CONHEÇA NOSSO CATÁLOGO
                </span>
                <h3 
                  className="tp-section-3-title"
                  style={{ 
                    fontSize: '40px', 
                    fontWeight: '700', 
                    lineHeight: '1.2', 
                    maxWidth: '480px', 
                    color: '#1A1A1A',
                    textTransform: 'none'
                  }}
                >
                  Encontre o curso ideal para sua {" "}
                  <span style={{ position: 'relative', display: 'inline-block' }}>
                    Carreira
                    <Image
                      className="tp-underline-shape-6 wow bounceIn"
                      data-wow-duration="1.5s"
                      data-wow-delay=".4s"
                      src={shape_underline}
                      alt="shape-underline"
                      style={{
                        position: 'absolute',
                        bottom: '-5px',
                        left: '0',
                        width: '100%',
                        height: 'auto'
                      }}
                    />
                  </span>
                </h3>
              </div>
            </div>
            
            {/* Ajustamos a coluna das abas para col-xl-7 para dar mais espaço horizontal */}
            <div className="col-xxl-7 col-xl-7 col-lg-6">
              <div className="tp-course-tab d-flex justify-content-lg-end mb-40">
                <nav>
                  <div 
                    className="nav" 
                    id="nav-tab" 
                    role="tablist"
                    style={{ 
                        flexWrap: 'nowrap', // Impede a quebra de linha forçada
                        whiteSpace: 'nowrap',
                        fontSize: '14px' // Redução sutil para caber tudo
                    }}
                  >
                    {tab_navs.map((tab) => (
                      <CourseTabBtn key={tab} tab={tab} />
                    ))}
                  </div>
                </nav>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12">
              <div className="tab-content wow fadeInUp" data-wow-delay=".3s">
                <div className="row">
                  <CourseItems />
                </div>
              </div>
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-xxl-6 col-lg-8">
              <div
                className="tp-category-banner d-flex align-items-center justify-content-between tp-category-banner-bg mt-35"
                style={{ 
                  backgroundImage: "url(/assets/img/bg/category-bg.jpg)",
                  borderRadius: '20px',
                  overflow: 'hidden'
                }}
              >
                <div className="tp-category-banner-content d-flex align-items-center">
                  <div className="tp-category-banner-shape">
                    <Image src={category_shape} alt="shape" />
                  </div>
                  <div className="tp-category-banner-text">
                    <span style={{ color: '#666', fontSize: '14px' }}>Nós te ajudamos</span>
                    <h4 className="tp-category-banner-title" style={{ fontSize: '20px', fontWeight: '700' }}>
                      Não sabe por onde começar?
                    </h4>
                  </div>
                </div>
                <div className="tp-category-banner-btn">
                  <Link className="tp-btn-2" href="/contact" style={{ borderRadius: '50px' }}>
                    Fale Conosco
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </CourseProvider>
  );
}