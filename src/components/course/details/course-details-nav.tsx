'use client';
import React, { useState, useEffect } from "react";
import { Link } from "react-scroll"; // 🚀 Usamos react-scroll para animação suave

export default function CourseDetailsNav() {
  const [activeNav, setActiveNav] = useState("#info");

  // Tática de Mestre: Detecta qual seção está visível e pinta o botão
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["info", "curriculum", "instructors", "reviews"];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (currentSection) {
        setActiveNav(`#${currentSection}`);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Dados do Menu: Ícones Font Awesome 6 modernos
  const navItems = [
    { id: "info", label: "Sobre o Curso", icon: "fa-light fa-info-circle" },
    { id: "curriculum", label: "Grade", icon: "fa-light fa-books" },
    { id: "instructors", label: "Tutores", icon: "fa-light fa-user-chalkboard" },
    { id: "reviews", label: "Avaliações", icon: "fa-light fa-star-comment" },
  ];

  return (
    <div className="tp-course-details-2-nav-box" style={{ 
      backgroundColor: '#fff', 
      padding: '20px', 
      borderRadius: '16px', 
      boxShadow: '0 15px 40px rgba(0, 85, 255, 0.03)',
      border: '1px solid #f1f5f9'
    }}>
      <div className="tp-course-details-2-nav d-flex align-items-center justify-content-between">
        {navItems.map((item) => (
          <div key={item.id} className="tp-course-details-2-nav-item">
            {/* 🚀 TÁTICA DA USABILIDADE: Transformando links em Pills/Botões interativos */}
            <Link
              to={item.id}
              spy={true}
              smooth={true}
              offset={-100} // Compensa a NavBar fixa e o topo
              duration={500}
              onSetActive={() => setActiveNav(`#${item.id}`)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '12px 24px',
                borderRadius: '99px',
                fontSize: '15px',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                textDecoration: 'none',
                lineHeight: '1',
                border: activeNav === `#${item.id}` ? '2px solid transparent' : '2px solid #E2E8F0',
                
                // 🎨 Degradê no Hover e Ativo (Seguindo o degradê do Hero)
                backgroundImage: activeNav === `#${item.id}` 
                  ? 'linear-gradient(100deg, #F5F9FF 0%, #F0F4FF 50%, #F8F7FF 100%)' 
                  : 'none',
                color: activeNav === `#${item.id}` ? '#1d4ed8' : '#64748B',
                boxShadow: activeNav === `#${item.id}` 
                  ? '0 10px 20px rgba(0, 85, 255, 0.05)' 
                  : 'none'
              }}
              className="tutor360-nav-pill"
            >
              <i className={item.icon} style={{ 
                fontSize: '18px',
                color: activeNav === `#${item.id}` ? '#1d4ed8' : '#94A3B8'
              }}></i>
              {item.label}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}