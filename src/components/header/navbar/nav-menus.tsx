import React from "react";
import Link from "next/link";
import menu_data from "@/data/menu-data";
import NavPagesDropdown from "./dropdown/nav-pages-dropdown";
import NavHomeDropdown from "./dropdown/nav-home-dropdown";
import NavSmMegaMenus from "./dropdown/nav-sm-mega-menus";

// Definição do tipo para as propriedades do componente
type IProps = {
  sm_mega_title?: string;
}

export default function NavMenus({sm_mega_title}: IProps) {
  return (
    <nav id="menu-tutor360-blindado" className="tp-main-menu-content">
      
      {/* 🚀 TÁTICA DE CHOQUE: Injetando CSS de alta prioridade para esmagar as letras brancas do template */}
      <style dangerouslySetInnerHTML={{__html: `
        #menu-tutor360-blindado ul li > a {
          color: #1A1A1A !important;
          font-weight: 600 !important;
          font-size: 15px !important;
          transition: all 0.3s ease;
        }
        #menu-tutor360-blindado ul li > a:hover {
          color: #0055FF !important; /* Azul Tutor360 no destaque */
        }
        /* Ajuste para submenus */
        #menu-tutor360-blindado .tp-submenu li > a {
          color: #4F4F4F !important;
        }
      `}} />

      <ul>
        {menu_data.map((menu) => (
          <li
            key={menu.id}
            className={`has-dropdown ${
              menu.home_dropdown || menu.pages_dropdown ? "tp-static" : ""
            }`}
          >
            <Link href={menu.link}>
              {/* Lógica para exibir título dinâmico ou padrão do menu */}
              {menu.sm_mega_menus && sm_mega_title ? sm_mega_title : menu.title}
            </Link>

            {/* Renderiza o megamenu da Home se existir */}
            {menu.home_dropdown && (
              <div className="tp-megamenu-main tp-megamenu-container">
                <NavHomeDropdown home_dropdown={menu.home_dropdown} />
              </div>
            )}

            {/* Renderiza o megamenu compacto se existir */}
            {menu.sm_mega_menus && (
              <div className="tp-megamenu-main tp-megamenu-small">
                <NavSmMegaMenus dropdown_menus={menu.sm_mega_menus} />
              </div>
            )}

            {/* Renderiza o megamenu de largura total (Fullwidth) se existir */}
            {menu.pages_dropdown && (
              <div className="tp-megamenu-main tp-megamenu-fullwidth">
                <NavPagesDropdown pages_dropdown={menu.pages_dropdown} />
              </div>
            )}

            {/* Renderiza o submenu padrão se existir */}
            {menu.dropdown_menus && (
              <ul className="tp-submenu">
                {menu.dropdown_menus.map((dm) => (
                  <li key={dm.id}>
                    <Link href={dm.link}>{dm.title}</Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}