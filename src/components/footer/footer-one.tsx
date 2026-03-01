import Link from "next/link";
import Image from "next/image";
import { Email } from "../svg";
import FooterSocial from "./footer-social";
import logo from "@/assets/img/logo/logo-red.png";
import logo_black from "@/assets/img/logo/logo-black-2.png";
import { footerLinks } from "@/data/footer-links";

type IProps = {
  style_2?: boolean;
};

export default function FooterOne({ style_2 = false }: IProps) {
  const year = new Date().getUTCFullYear();

  return (
    <footer>
      <div className={`tp-footer-main ${style_2 ? "" : "grey-bg"} pt-80 pb-55`}>
        <div className="container">
          <div className="row">
            <div className="col-xl-3 col-lg-3 col-sm-6">
              <div className="tp-footer-widget mb-30">
                <div className="tp-footer-widget-logo mb-20">
                  <Link href="/">
                    <Image
                      src={style_2 ? logo_black : logo}
                      alt="Tutor 360"
                      priority
                      width={250}
                      height={50}
                      style={{
                        width: "250px",
                        height: "50px",
                        objectFit: "contain",
                        imageRendering: "auto",
                      }}
                    />
                  </Link>
                </div>
                <div className="tp-footer-widget-content">
                  <p>
                    Plataforma de cursos especializada em empreendedorismo jovem,
                    oferecendo capacitação em habilidades práticas e conhecimentos
                    essenciais para o desenvolvimento pessoal e profissional.
                  </p>
                  <p className="mt-15">
                    <strong>CNPJ: 58.369.577/0001-55</strong>
                  </p>
                </div>
              </div>
            </div>

            <div className="col-xl-3 col-lg-3 col-sm-6">
              <div className="tp-footer-widget mb-30">
                <h4 className="tp-footer-widget-title mb-20">
                  Sobre a Tutor 360
                </h4>
                <div className="tp-footer-widget-link">
                  <ul>
                    {footerLinks.link_one.map((link) => (
                      <li
                        key={link.id}
                        className="d-flex align-items-center mb-10"
                      >
                        <i
                          className="fa-regular fa-chevron-right mr-10"
                          style={{ fontSize: "12px", color: "#FFB600" }}
                        ></i>
                        <Link href={link.link}>{link.title}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-xl-3 col-lg-3 col-sm-6">
              <div className="tp-footer-widget mb-30">
                <h4 className="tp-footer-widget-title mb-20">Fale Conosco</h4>
                <div className="tp-footer-contact-info">
                  <div className="tp-footer-contact-item d-flex align-items-center mb-15">
                    <span className="mr-15">
                      <i
                        className="fa-solid fa-headset"
                        style={{ color: "#0055FF" }}
                      ></i>
                    </span>
                    <Link href="/contact">Atendimento virtual</Link>
                  </div>
                  <div className="tp-footer-contact-item d-flex align-items-center mb-15">
                    <span className="mr-15">
                      <i
                        className="fa-solid fa-user-shield"
                        style={{ color: "#0055FF" }}
                      ></i>
                    </span>
                    <Link href="/contact">Suporte ao Usuário</Link>
                  </div>
                  <div className="tp-footer-contact-item d-flex align-items-center mb-15">
                    <span className="mr-15">
                      <i
                        className="fa-brands fa-whatsapp"
                        style={{ color: "#25D366", fontSize: "20px" }}
                      ></i>
                    </span>
                    <a
                      href="https://wa.me/5547984662948"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <strong>(47) 9 8466-2948</strong>
                    </a>
                  </div>
                  <div className="tp-footer-contact-item d-flex align-items-center">
                    <span className="mr-15">
                      <Email />
                    </span>
                    <a href="mailto:contato@tutor360.com.br">
                      contato@tutor360.com.br
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-3 col-lg-3 col-sm-6">
              <div className="tp-footer-widget mb-30">
                <h4 className="tp-footer-widget-title mb-20">Redes Sociais</h4>
                <div className="tp-footer-newsletter-social">
                  <FooterSocial />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="tp-footer-bottom">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="tp-footer-copyright text-center">
                <span>© {year} Tutor 360. Todos os direitos reservados.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}