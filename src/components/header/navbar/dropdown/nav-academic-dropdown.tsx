import Link from "next/link";
import { RightArrowTwo } from "@/components/svg";
import { IAcademicDP } from "@/types/menu-d-t";
import shape from "@/assets/img/menu/menu-shape.png";
import shape_2 from "@/assets/img/menu/menu-shape-2.png";
import Image from "next/image";

type IProps = {
  academic_dropdown: IAcademicDP[];
};

export default function NavAcademicDropdown({ academic_dropdown }: IProps) {
  return (
      <div className="megamenu-demo-academics p-relative">
        <div className="tp-megamenu-academics-border">
          <div className="row tp-gx-50">
            {academic_dropdown.map((dp) => (
              <div key={dp.id} className="col-xl-3 col-12">
                <div className="tp-megamenu-academics-list">
                  <h4 className="tp-megamenu-academics-title">{dp.title}</h4>
                  {dp.dropdown_menus.map((dm) => (
                    <Link key={dm.id} href={dm.link}>
                      {dm.title}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
            <div className="col-xl-6 col-12">
              <div className="tp-megamenu-academics-banner p-relative d-none d-xl-block">
                {/* Tradução do cabeçalho do banner lateral */}
                <h4 className="tp-megamenu-academics-banner-title">Nossos Alunos</h4>
                <Image src={shape_2} alt="shape" />
                <p>
                  Tudo o que aprendi nos cursos da <br />
                  Tutor360 realmente me ajudou <br />
                  a me destacar no mercado de <br />
                  trabalho e a dominar as novas <br />
                  tecnologias do setor.
                </p>
                <a href="#">
                  Conheça Histórias de Sucesso{" "}
                  <span>
                    <RightArrowTwo clr="currentColor" />
                  </span>
                </a>
                <div className="tp-megamenu-academics-banner-shape">
                  <Image src={shape} alt="shape" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 d-none d-xl-block">
            <div className="tp-megamenu-academics-btns text-center">
              {/* Tradução dos botões de ação do megamenu */}
              <Link href="/university-request-info">Solicitar Informações</Link>
              <Link className="active" href="/university-application-form">
                Matricule-se Agora
              </Link>
              <Link href="/university-schedule">Conheça a Plataforma</Link>
            </div>
          </div>
        </div>
      </div>
  );
}