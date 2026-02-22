'use client';
import Image from "next/image";
import shape_underline from "@/assets/img/unlerline/brand-2-svg-1.svg";
// brands
import brand_1 from "@/assets/img/brand/brand-2-logo-1.png";
import brand_2 from "@/assets/img/brand/brand-2-logo-2.png";
import brand_3 from "@/assets/img/brand/brand-2-logo-3.png";
import brand_4 from "@/assets/img/brand/brand-2-logo-4.png";
import brand_5 from "@/assets/img/brand/brand-2-logo-5.png";
import brand_6 from "@/assets/img/brand/brand-2-logo-6.png";
import brand_7 from "@/assets/img/brand/brand-2-logo-7.png";
import brand_8 from "@/assets/img/brand/brand-2-logo-8.png";
import brand_9 from "@/assets/img/brand/brand-2-logo-9.png";

const brands = [
  brand_1,
  brand_2,
  brand_3,
  brand_4,
  brand_5,
  brand_6,
  brand_7,
  brand_8,
  brand_9,
];

export default function BrandArea() {
  return (
    <section className="brand-area mb-80 mt-60"> {/* Aumentado o respiro vertical */}
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-4">
            <div className="tp-brand-2-content mb-40">
              <h4 className="tp-brand-2-title" style={{ fontSize: '34px', lineHeight: '1.2', fontWeight: '700' }}>
                Com quem você <br /> vai {" "}
                <span style={{ position: 'relative', display: 'inline-block' }}>
                  Aprender?
                  <Image
                    className="tp-underline-shape-10 wow bounceIn"
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
              </h4>
              <p style={{ color: '#666', marginTop: '15px', fontSize: '16px' }}>
                Nossos parceiros e instrutores vêm das <br /> 
                melhores empresas do mercado para garantir <br />
                sua evolução na Tutor 360.
              </p>
              <div className="tp-brand-2-btn mt-30">
                <a className="tp-btn-round" href="/contact" style={{ padding: '12px 25px', borderRadius: '50px' }}>
                  Seja um Parceiro
                </a>
              </div>
            </div>
          </div>
          <div className="col-lg-8">
            <div className="tp-brand-2-wrapper" style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(3, 1fr)', 
              gap: '30px', // O "respiro" entre os logos
              paddingLeft: '40px' 
            }}>
              {brands.map((brand, index) => (
                <div 
                  className="tp-brand-2-item" 
                  key={index}
                  style={{ 
                    filter: 'grayscale(100%)', 
                    opacity: '0.5', 
                    transition: '0.3s',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.filter = 'grayscale(0%)';
                    e.currentTarget.style.opacity = '1';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.filter = 'grayscale(100%)';
                    e.currentTarget.style.opacity = '0.5';
                  }}
                >
                  <Image src={brand} alt="parceiro tutor 360" style={{ maxWidth: '100%', height: 'auto' }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}