'use client';

import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/img/logo/logo-black-1.png";

type Props = {
  openOffCanvas: boolean;
  onHandleOffCanvas: () => void;
  offcanvas_cls?: string;
  offcanvas_menu_2?: boolean;
};

export default function OffcanvasArea({
  openOffCanvas,
  onHandleOffCanvas,
  offcanvas_cls = "",
}: Props) {
  // trava o scroll do body quando aberto
  useEffect(() => {
    if (openOffCanvas) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [openOffCanvas]);

  if (!openOffCanvas) return null;

  return (
    <div className={`tp-offcanvas-overlay ${openOffCanvas ? "opened" : ""}`} onClick={onHandleOffCanvas} aria-hidden>
      <aside
        className={`tp-offcanvas ${offcanvas_cls}`}
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabeçalho */}
        <div className="tp-offcanvas-head">
          <Link href="/" aria-label="Página inicial" className="tp-offcanvas-logo" onClick={onHandleOffCanvas}>
            <Image src={logo} alt="Tutor360" height={28} />
          </Link>
          <button className="tp-offcanvas-close" aria-label="Fechar" onClick={onHandleOffCanvas}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        {/* Corpo (conteúdo parecido com o demo da Acadia) */}
        <div className="tp-offcanvas-body">
          <h4 className="tp-offcanvas-title">Hello There!</h4>
          <p className="tp-offcanvas-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. A few quick links and contact details live here.
          </p>

          <nav className="tp-offcanvas-links">
            <Link href="/university-about" onClick={onHandleOffCanvas}>About</Link>
            <Link href="/course" onClick={onHandleOffCanvas}>Courses</Link>
            <Link href="/admissions" onClick={onHandleOffCanvas}>Admissions</Link>
            <Link href="/blog" onClick={onHandleOffCanvas}>Blog</Link>
            <Link href="/contact" onClick={onHandleOffCanvas}>Contact</Link>
          </nav>

          <div className="tp-offcanvas-info">
            <h5>INFORMATION</h5>
            <ul>
              <li>+ 402 763 282 46</li>
              <li>hello@tutor360.com</li>
              <li>Avenue de Roma 158b, Lisboa</li>
            </ul>
          </div>
        </div>
      </aside>
    </div>
  );
}
