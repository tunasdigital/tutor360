'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from "next/image";
import { category_data } from "@/data/category-data"; 
import shape_line from "@/assets/img/shape/bottom-line/line-2-category.svg";

// Componente principal
export default function CategoryArea() {
  // Condicional de Skeleton 
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => { setIsLoading(false); }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    // Retorna o skeleton
    return <div style={{height: '500px', backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>Carregando...</div>; 
  }

  return (
    // Tática de Design: Injeção de style inline para forçar o descolamento (paddingTop e marginTop)
    <section className="category-area mb-80" style={{ paddingTop: '80px', marginTop: '60px' }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-8 col-lg-10">
            <div
              className="tp-section mb-40 text-center wow fadeInUp"
              data-wow-delay=".4s"
            >
              {/* Títulos chumbados em Português para blindar a apresentação */}
              <h5 className="tp-section-3-subtitle">ESTUDE NO SEU RITMO</h5>
              <h3 className="tp-section-3-title">
                Categorias mais{" "}
                <span>
                  concorridas
                  <Image
                    className="tp-underline-shape-5 wow bounceIn"
                    data-wow-duration="1.5s"
                    data-wow-delay=".4s"
                    src={shape_line}
                    alt="shape"
                  />
                </span>
                .
              </h3>
            </div>
          </div>
        </div>
        <div className="row">
          {category_data.map((item) => (
            <div key={item.id} className="col-lg-3 col-md-4 col-sm-6">
              <Link
                href="/course-categories"
                className="tp-category-item mb-25 wow fadeInUp"
                data-wow-delay={`.${item.id}s`}
              >
                <div className="tp-category-icon">
                  <span className={item.color}>
                    <Image
                      src={item.icon}
                      alt={item.title}
                      width={25}
                      height={25}
                    />
                  </span>
                </div>
                <div className="tp-category-content">
                  {/* Tática de Choque: Injeção direta da nossa matriz de dados */}
                  <h4 className="tp-category-title">{item.title}</h4>
                  <span>{item.description}</span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}