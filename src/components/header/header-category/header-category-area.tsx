import { CategorySvg } from "@/components/svg";
import Link from "next/link";

export default function HeaderCategoryArea() {
  return (
    <div className="tp-header-2-category tp-header-inner-category home-2 d-none d-md-block">
      <Link className="tp-header-2-category-icon" href="/course-with-sidebar">
        {/* Adicionado d-flex, align-items-center e gap para blindar o botão contra encavalamentos */}
        <p className="d-flex align-items-center" style={{ gap: '8px', marginBottom: 0 }}>
          <span>
            <CategorySvg/>
          </span>
          Categorias
        </p>
      </Link>
      <div className="tp-header-2-category-list">
        <ul>
          <li>
            <Link href="/course-with-sidebar">Empreendedorismo</Link>
          </li>
          <li>
            <Link href="/course-with-sidebar">Marketing Digital</Link>
          </li>
          <li>
            <Link href="/course-with-sidebar">Vendas e Negociação</Link>
          </li>
          <li>
            <Link href="/course-with-sidebar">Gestão e Liderança</Link>
          </li>
          <li>
            <Link href="/course-with-sidebar">Produtividade</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}