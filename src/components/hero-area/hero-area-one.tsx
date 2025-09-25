'use client';
import Link from "next/link";
import React from "react";
import { EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { SwiperOptions } from "swiper/types";
import { RightArrow } from "../svg";

// 
const heroSliderData = [
  {
    id: 1,
    subtitle: "Be apart of our history",
    title: "Landmark to Create the Future.",
    bgImg: "/assets/img/hero/hero-bg-1.jpg",
  },
  {
    id: 2,
    subtitle: "Be apart of our history",
    title: "Education to Create the Future.",
    bgImg: "/assets/img/hero/hero-bg-2.jpg",
  },
  {
    id: 3,
    subtitle: "Be apart of our history",
    title: "Discipline to Create the Future.",
    bgImg: "/assets/img/hero/hero-bg-3.jpg",
  },
];

const slider_options: SwiperOptions = {
  slidesPerView: 1,
  effect: "fade",
  autoplay: {
    delay: 3500,
  },
  pagination: {
    el: ".tp-program-dot",
    clickable: true,
  },
};

export default function HeroAreaOne() {
  return (
    <section className="tp-hero-area">
      <Swiper {...slider_options} modules={[EffectFade]} className="swiper tp-slider-active">
        {heroSliderData.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="tp-hero-item">
              <div className="container">
                <div className="row">
                  <div className="col-xxl-9 col-lg-11">
                    <div className="tp-hero-wrapper">
                      <span className="tp-hero-subtitle">
                        {item.subtitle}
                      </span>
                      <h2 className="tp-hero-title">
                        {item.title}
                      </h2>
                      <div className="tp-hero-btn">
                        <Link className="tp-btn" href="/university-program">
                          Enroll Now
                          <span>
                            <RightArrow/>
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="tp-hero-bg"
                style={{ backgroundImage: `url(${item.bgImg})` }}
              ></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
