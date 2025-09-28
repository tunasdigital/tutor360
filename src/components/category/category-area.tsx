'use client';

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import Image from "next/image";
import { category_data } from "@/data/category-data"; 
import shape_line from "@/assets/img/shape/bottom-line/line-2-category.svg";
import category_shape from "@/assets/img/shape/category-2-shape-1.png";

// Componente para simular o carregamento (skeleton) - omitido para foco na correção

// Componente principal
export default function CategoryArea() {
  const { t } = useTranslation();
  // Corrigimos a importação de category_data para ser uma importação nomeada, por isso o { category_data }
  // O layout é o original que você nos forneceu.
  
  // Condicional de Skeleton (mantive simples para este teste)
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => { setIsLoading(false); }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    // Retorna o skeleton (que você pode ajustar depois)
    return <div style={{height: '500px', backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>Carregando...</div>; 
  }


  return (
    <section className="category-area mb-80 mt-95">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-8 col-lg-10">
            <div
              className="tp-section mb-40 text-center wow fadeInUp"
              data-wow-delay=".4s"
            >
              <h5 className="tp-section-3-subtitle">{t('categories.subtitle')}</h5>
              <h3 className="tp-section-3-title">
                {t('categories.title_part1')}{" "}
                <span>
                  {t('categories.title_part2')}
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
                  <h4 className="tp-category-title">{t(`categories.items.${item.key}.name`)}</h4>
                  <span>{t(`categories.items.${item.key}.description`)}</span>
                </div>
              </Link>
            </div>
          ))}
        </div>
        {/* Banner area aqui... */}
      </div>
    </section>
  );
}