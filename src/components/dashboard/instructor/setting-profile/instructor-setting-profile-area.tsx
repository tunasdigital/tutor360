'use client';
import React from "react";
import Image from "next/image";
import profile_img from "@/assets/img/dashboard/profile/dashboard-profile.jpg";
import student_img from "@/assets/img/dashboard/profile/dashboard-profile-2.jpg";
import Certificate_img from "@/assets/img/dashboard/bg/certificate-2.png";
import { CameraSvg, CameraTwoSvg, UploadSvg } from "@/components/svg";

type IProps = {
  studentProfile?: boolean;
}

export default function InstructorSettingProfileArea({studentProfile}: IProps) {
  return (
    <div className="tpd-course-area">
      <div className="row">
        <div className="col-12">
          <div className="tp-dashboard-section mb-30">
            <h2 className="tp-dashboard-title">Configurações de Perfil</h2>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="tpd-setting-box profile">
            <div className="tp-dashboard-banner-bg profile mb-100" style={{ backgroundImage: "url(/assets/img/dashboard/bg/dashboard-bg-1.jpg)" }}>
              <div className="tp-instructor-wrap d-flex justify-content-between">
                <div className="tp-instructor-info d-flex">
                  <div className="tp-instructor-avatar p-relative profile">
                    <Image src={studentProfile?student_img:profile_img} alt="Foto de perfil" />
                    <span><CameraSvg /></span>
                  </div>
                </div>
                <div className="tp-instructor-course-btn profile">
                  <a className="tp-btn-add-course profile" href="#">
                    <span><CameraTwoSvg /></span> Editar Foto de Capa
                  </a>
                </div>
              </div>
            </div>
            <div className="tpd-setting-from">
              <div className="row">
                <div className="col-lg-6">
                  <div className="tpd-input">
                    <label>Nome</label>
                    <input type="text" placeholder="Seu nome" />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="tpd-input">
                    <label>Sobrenome</label>
                    <input type="text" placeholder="Seu sobrenome" />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="tpd-input">
                    <label>Nome de Usuário</label>
                    <input type="text" placeholder="Ex: tunas_dev" />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="tpd-input">
                    <label>Número de Telefone</label>
                    <input type="text" placeholder="+55 (47) 90000-0000" />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="tpd-input">
                    <label>Especialidade / Ocupação</label>
                    <input type="text" placeholder="Ex: Desenvolvedor Full Stack" />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="tpd-input">
                    <label>Exibir nome publicamente como</label>
                    <input type="text" placeholder="Ex: Tunas" />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="tpd-input">
                    <label>Sobre mim</label>
                    <textarea placeholder="Conte um pouco sobre sua trajetória profissional e paixões..."></textarea>
                  </div>
                </div>
              </div>
            </div>
            <div className="tpd-setting-cartificate">
              <h5 className="tpd-setting-cartificate-title">Assinatura do Certificado</h5>
              <div className="tpd-setting-cartificate-upload d-flex align-items-center">
                <div className="tpd-setting-cartificate-thumb">
                  <Image src={Certificate_img} alt="Assinatura do certificado" />
                </div>
                <div className="tpd-setting-cartificate-content">
                  <p>Tamanho recomendado: 700x430 pixels</p>
                  <span className="upload-btn">
                    <input id="tpd-setting-cartificate-input" type="file" accept="image/png, image/jpeg" />
                    <label htmlFor="tpd-setting-cartificate-input">
                      <span><UploadSvg /></span> Carregar Imagem
                    </label>
                  </span>
                </div>
              </div>
              <div className="tpd-setting-cartificate-btn">
                <button>Salvar Alterações</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}