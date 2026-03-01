import React from "react";
import Image from "next/image";
import calling from "@/assets/img/icon/calling.svg";
import HeaderLanguage from "./header-language";

export default function HeaderTopArea() {
  return (
    <div className="tp-header-top theme-bg">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="tp-heder-info d-flex justify-content-center justify-content-lg-start align-items-center">
              <div className="tp-header-info-item d-none d-md-block">
                <span>
                  <a href="#">
                    <i className="fa-brands fa-facebook-f"></i>
                  </a>
                  7500k Seguidores
                </span>
              </div>
              <div className="tp-header-info-item">
                <span>
                  <a href="https://wa.me/5547984662948" target="_blank">
                    <i>
                      <Image src={calling} alt="Ícone de telefone" />
                    </i>{" "}
                    (47) 9 8466-2948
                  </a>
                </span>
              </div>
              <div className="tp-header-info-item">
                <div className="header-bottom__lang">
                  <ul>
                    <HeaderLanguage/>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 d-none d-lg-block">
            <div className="tp-header-right-list d-flex justify-content-md-end">
              <a href="#">Cursos</a>
              <a href="#">Alunos</a>
              <a href="#">Instrutores</a>
              <a href="#">Institucional</a>
              <a href="#">Suporte</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}