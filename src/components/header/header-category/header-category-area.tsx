import { CategorySvg } from "@/components/svg";
import Link from "next/link";

export default function HeaderCategoryArea() {
  return (
    <div className="tp-header-2-category tp-header-inner-category home-2 d-none d-md-block">
      {/* Redirecionando o clique principal para a vitrine oficial de categorias */}
      <Link className="tp-header-2-category-icon" href="/course-categories">
        {/* Adicionado d-flex, align-items-center e gap para blindar o botão contra encavalamentos.
            Tática de Legibilidade: Forçando a cor escura e o peso da fonte diretamente no elemento. */}
        <p className="d-flex align-items-center" style={{ gap: '8px', marginBottom: 0, color: '#1A1A1A', fontWeight: 600 }}>
          <span>
            <CategorySvg/>
          </span>
          Categorias
        </p>
      </Link>
      <div className="tp-header-2-category-list">
        <ul>
          {/* Tática de Roteamento (God Mode): Conectando o menu rápido aos filtros reais da Tutor360 */}
          <li>
            <Link href="/course-with-filter?category=empreendedorismo">Empreendedorismo</Link>
          </li>
          <li>
            <Link href="/course-with-filter?category=marketing-digital">Marketing Digital</Link>
          </li>
          <li>
            <Link href="/course-with-filter?category=vendas-e-negociacao">Vendas e Negociação</Link>
          </li>
          <li>
            <Link href="/course-with-filter?category=gestao-e-lideranca">Gestão e Liderança</Link>
          </li>
          <li>
            <Link href="/course-with-filter?category=produtividade">Produtividade</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}