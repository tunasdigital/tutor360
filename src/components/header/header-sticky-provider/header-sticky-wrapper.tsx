"use client";

import React, { useEffect, useRef } from "react";

type Props = {
  children: React.ReactNode;
};

export default function HeaderStickyWrapper({ children }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onScroll = () => {
      const sticky = window.scrollY > 10;
      if (sticky) {
        el.classList.add("is-sticky");
      } else {
        el.classList.remove("is-sticky");
      }
    };

    onScroll(); // estado inicial
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div ref={ref} className="tp-header-sticky">
      {children}
    </div>
  );
}
