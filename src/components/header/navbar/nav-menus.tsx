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
    <nav className="tp-main-menu-content">
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