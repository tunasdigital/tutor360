'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Image from "next/image";
import { category_data_one } from "@/data/category-data";
import shape_line from "@/assets/img/shape/bottom-line/line-2-category.svg";
import category_shape from "@/assets/img/shape/category-2-shape-1.png";
import Link from "next/link";

// Componente para simular o carregamento (skeleton)
function CategoryAreaSkeleton() {
  return (
    <div className="tp-category-area pt-120 pb-120 fix">
      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            <h2 className="tp-section-title mb-50">
              <div className="bg-gray-300 h-8 w-64 mx-auto rounded animate-pulse"></div>
            </h2>
          </div>
        </div>
        <div className="row">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="col-lg-3 col-md-4 col-sm-6 text-center">
              <div className="tp-category-item p-4 rounded-lg animate-pulse bg-gray-200" style={{ minHeight: '180px' }}>
                <div className="h-10 w-10 bg-gray-300 rounded-full mx-auto mb-2"></div>
                <div className="h-4 w-24 bg-gray-300 mx-auto rounded mb-1"></div>
                <div className="h-3 w-16 bg-gray-300 mx-auto rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Componente principal
export default function CategoryArea() {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simula a busca de dados.
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <CategoryAreaSkeleton />;
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
          {category_data_one.map((item) => (
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
                      alt={t(`categories.items.${item.key}.name`)}
                      width={25}
                      height={25}
                    />
                  </span>
                </div>
                <div className="tp-category-content">
                  <h4 className="tp-category-title">{t(`categories.items.${item.key}.name`)}</h4>
                  <span>{t(`categories.items.${item.key}.count`)}</span>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <div className="row justify-content-center">
          <div className="col-xl-6 col-lg-8">
            <div
              className="tp-category-banner d-flex align-items-center justify-content-between tp-category-banner-bg mt-35"
              data-background="assets/img/bg/category-bg.jpg"
              style={{ backgroundImage: `url(/assets/img/bg/category-bg.jpg)` }}
            >
              <div className="tp-category-banner-content d-flex align-items-center">
                <div className="tp-category-banner-shape">
                  <Image src={category_shape} alt="category_shape" />
                </div>
                <div className="tp-category-banner-text">
                  <span>{t('banner.subtitle')}</span>
                  <h4 className="tp-category-banner-title">
                    {t('banner.title')}
                  </h4>
                </div>
              </div>
              <div className="tp-category-banner-btn">
                <Link className="tp-btn-2" href="/contact">
                  {t('banner.button')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}