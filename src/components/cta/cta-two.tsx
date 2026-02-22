"use client";
import Image from "next/image";
import shape_underline from "@/assets/img/unlerline/cta-2-svg-1.svg";

export default function CtaTwo() {
  return (
    <section className="cta-area tp-cta-2-bg pb-100 pt-100"> 
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xxl-8 col-lg-10">
            <div className="tp-cta-2-wrapper text-center">
              <h2 className="tp-cta-2-title" style={{ fontSize: '52px', fontWeight: '800', color: '#1A1A1A' }}>
                Pronto para transformar sua {" "}
                <span style={{ position: 'relative', display: 'inline-block' }}>
                  Carreira?
                  <Image
                    className="tp-underline-shape-12 wow bounceIn"
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
              </h2>
              <p style={{ fontSize: '20px', color: '#4A4A4A', marginTop: '25px', marginBottom: '40px' }}>
                Junte-se a mais de 85.000 alunos e tenha acesso aos melhores <br /> 
                cursos do mercado com os maiores especialistas.
              </p>
              
              <div className="tp-cta-2-btn">
                <a 
                  href="/register" 
                  className="tp-btn-round" 
                  style={{ 
                    padding: '20px 50px', 
                    fontSize: '18px', 
                    fontWeight: '700',
                    borderRadius: '50px',
                    backgroundColor: '#0055FF',
                    color: '#FFF',
                    display: 'inline-block',
                    transition: 'all 0.3s'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0044CC'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#0055FF'}
                >
                  Começar Agora Gratuitamente
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}