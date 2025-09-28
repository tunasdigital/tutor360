'use client';
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import OffcanvasArea from "@/components/sidebar/offcanvas/offcanvas-area";

type Props = {
  children?: React.ReactNode;
  offcanvas_cls?: string;
  offcanvas_menu_2?: boolean;
};

export default function OffcanvasButton({
  children,
  offcanvas_cls = "",
  offcanvas_menu_2 = false,
}: Props) {
  const [isOpenOffcanvas, setIsOpenOffcanvas] = useState(false);
  const [mounted, setMounted] = useState(false);
  const modalRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      modalRef.current = document.getElementById("offcanvas-sidebar");
      setMounted(true);
    }
  }, []);

  const handleOffcanvasToggle = () => setIsOpenOffcanvas((s) => !s);

  return (
    <>
      <button onClick={handleOffcanvasToggle} className="offcanvas-open-btn" aria-label="Abrir menu">
        {children ? children : <i className="fa-solid fa-bars"></i>}
      </button>

      {mounted &&
        modalRef.current &&
        createPortal(
          <>
            <OffcanvasArea
              openOffCanvas={isOpenOffcanvas}
              onHandleOffCanvas={handleOffcanvasToggle}
              offcanvas_cls={offcanvas_cls}
              offcanvas_menu_2={offcanvas_menu_2}
            />
          </>,
          modalRef.current
        )}
    </>
  );
}
