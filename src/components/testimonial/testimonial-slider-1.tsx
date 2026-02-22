"use client";
import Image from "next/image";
import React from "react";
import { Navigation, Autoplay } from "swiper/modules"; // Adicionado Autoplay nos módulos
import { Swiper, SwiperSlide } from "swiper/react";
import { SwiperOptions } from "swiper/types";
import { NextArrow, PrevArrow } from "../svg";
import { testimonial_one_data } from "@/data/testimonial-data";

const swiper_options: SwiperOptions = {
  slidesPerView: 1,
  spaceBetween: 20,
  loop: true,
  navigation: {
    nextEl: ".tp-testimonial-next",
    prevEl: ".tp-testimonial-prev",
  },
  autoplay: {
    delay: 4000, // Aumentei para 4s para dar tempo de ler o comentário real
    disableOnInteraction: false,
  },
};

export default function TestimonialSliderOne() {
  return (
    <>
      <Swiper
        {...swiper_options}
        modules={[Navigation, Autoplay]}
        className="swiper tp-testimonial-active"
      >
        {testimonial_one_data.map((item) => (
          <SwiperSlide
            key={item.id}
            className="tp-testimonial-item"
          >
            <div className="tp-testimonial-avatar" style={{ marginBottom: '20px' }}>
              <Image
                src={item.img}
                alt={item.name}
                width={70}
                height={70}
                style={{ borderRadius: '50%', border: '2px solid #0055FF' }}
              />
            </div>
            <div className="tp-testimonial-content">
              <p style={{ 
                fontSize: '18px', 
                lineHeight: '1.6', 
                color: '#4A4A4A', 
                fontStyle: 'italic',
                marginBottom: '20px' 
              }}>
                "{item.content || item.testimonial}" 
              </p>
            </div>
            <div className="tp-testimonial-avatar-info">
              <h4 className="tp-testimonial-avatar-title" style={{ fontSize: '20px', fontWeight: '700', color: '#1A1A1A' }}>
                {item.name}
              </h4>
              <span style={{ color: '#0055FF', fontWeight: '500', fontSize: '14px' }}>
                {item.position || 'Aluno Tutor 360'}
              </span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      
      <div className="tp-testimonial-arrow text-md-end" style={{ marginTop: '20px' }}>
        <div className="tp-testimonial-prev pointer" style={{ marginRight: '10px', display: 'inline-block' }}>
          <span>
            <PrevArrow />
          </span>
        </div>
        <div className="tp-testimonial-next pointer" style={{ display: 'inline-block' }}>
          <span>
            <NextArrow />
          </span>
        </div>
      </div>
    </>
  );
}