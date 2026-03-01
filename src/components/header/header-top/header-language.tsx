'use client';
import React from "react";
import Image from "next/image";
// Nota: Recomendo futuramente trocar flag-1.png por uma bandeira do Brasil
import flag from "@/assets/img/flag/flag-1.png"; 
import { DownArrow } from "@/components/svg";


export default function HeaderLanguage() {
    const [openLang, setOpenLang] = React.useState(false);
    return (
        <li>
            <a onClick={() => setOpenLang(!openLang)} id="header-bottom__lang-toggle" href="#">
                <span>
                    <Image src={flag} alt="Bandeira" />
                    Português
                </span>
                <span>
                    <DownArrow />
                </span>
            </a>
            <ul className={`header-bottom__lang-submenu ${openLang ? "open" : ""}`}>
                <li><a href="#">Inglês</a></li>
                <li><a href="#">Espanhol</a></li>
            </ul>
        </li>
    )
}