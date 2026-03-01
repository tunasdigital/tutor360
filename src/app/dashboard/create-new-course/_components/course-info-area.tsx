import Image from "next/image";
import file_icon from '@/assets/img/dashboard/bg/select-file-icon.png';
import { InfoTwoSvg, PenThreeSvg, SettingTwoSvg } from "@/components/svg";
import CourseInfoSelectCategory from "./course-info-select-category";


export default function CourseInfoArea() {
   return (
      <div className="accordion-item">
         <h2 className="accordion-header">
            <button className="accordion-button tpd-new-course-heading-title" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
               Informações do Curso
            </button>
         </h2>
         <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show">
            <div className="accordion-body">
               <div className="tpd-new-course-box-1">
                  <div className="tpd-input">
                     <label>Título do Curso</label>
                     <input type="text" placeholder="Nome do seu novo curso" />
                  </div>
                  <div className="tpd-input">
                     <label>Slug do Curso (URL)</label>
                     <input type="text" placeholder="nome-do-curso" />
                  </div>
                  <p>Link Permanente: <a href="#">https://tutor360.com.br/curso/novo-curso</a></p>
                  <div className="tpd-input about-height">
                     <label>Sobre o Curso</label>
                     <textarea placeholder="Descreva brevemente o que os alunos aprenderão"></textarea>
                  </div>
               </div>
               <div className="tpd-new-course-box-2">
                  <h4 className="tpd-new-course-setting-title">Configurações do Curso</h4>
                  <div className="tp-dashboard-tab-list">
                     <ul>
                        <li>
                           <a className="active" href="#"><span><SettingTwoSvg /></span> Geral</a>
                        </li>
                        <li>
                           <a href="#"><span><PenThreeSvg /></span> Liberação Gradual (Drip)</a>
                        </li>
                     </ul>
                  </div>
                  <div className="tpd-input">
                     <label>Limite Máximo de Alunos</label>
                     <input type="number" placeholder="ex: 100" />
                     <p><span><InfoTwoSvg /></span>Número de alunos que podem se matricular. Defina 0 para ilimitado.</p>
                  </div>
                  <div className="tpd-input">
                     <label>Nível de Dificuldade</label>
                     <input type="text" placeholder="Iniciante, Intermediário ou Avançado" />
                     <p><span><InfoTwoSvg /></span>Nível de conhecimento exigido para o curso.</p>
                  </div>
                  <div className="tpd-input">
                     <label>Curso Público</label>
                     <div className="switcher">
                        <label htmlFor="toggle-0">
                           <input type="checkbox" id="toggle-0" />
                           <span><small></small></span>
                        </label>
                     </div>
                     <p><span><InfoTwoSvg /></span>Torna o curso público. Nenhuma matrícula será exigida para assistir.</p>
                  </div>
                  <div className="tpd-input">
                     <label>Seção de Perguntas e Respostas (Q&A)</label>
                     <div className="switcher">
                        <label htmlFor="toggle-1">
                           <input type="checkbox" id="toggle-1" />
                           <span><small></small></span>
                        </label>
                     </div>
                     <p className="m-0"><span><InfoTwoSvg /></span>Habilita a seção de dúvidas para os alunos do curso.</p>
                  </div>
               </div>
               <div className="tpd-new-course-box-3">
                  <div className="tpd-new-course-categories">
                     <div className="tpd-new-course-select2">
                        <div className="tpd-input">
                           <label>Escolha uma Categoria</label>
                           <CourseInfoSelectCategory/>
                        </div>
                     </div>
                     <div className="tpd-input mt-35">
                        <label className="font">Preço do Curso</label>
                        <div className="tpd-order-filter tpd-redio-style tmy-tab">
                           <ul className="nav nav-tabs" id="myTab" role="tablist">
                              <li className="nav-item p-relative" role="presentation">
                                 <button className="nav-link" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-selected="false" tabIndex={-1}>
                                    <span className="tpd-redio-style-span"></span>
                                    <span>Gratuito</span>
                                 </button>
                              </li>
                              <li className="nav-item p-relative" role="presentation">
                                 <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-selected="false" tabIndex={-1}>
                                    <span className="tpd-redio-style-span"></span>
                                    <span>Pago</span>
                                 </button>
                              </li>
                           </ul>
                        </div>
                     </div>
                     <div className="tpd-input-box d-flex">
                        <div className="tpd-input">
                           <label>Preço Regular (R$)</label>
                           <input type="text" placeholder="0.00" />
                        </div>
                        <div className="tpd-input">
                           <label>Preço com Desconto (R$)</label>
                           <input type="number" placeholder="0.00" />
                        </div>
                     </div>
                     <div className="tpd-input course-file">
                        <label>Miniatura do Curso (Thumbnail)</label>
                        <div className="tpd-new-course-file-content text-center" style={{ backgroundImage: "url(/assets/img/dashboard/bg/select-file.png)" }}>
                           <div className="tpd-new-course-file-thumb mb-15">
                              <Image src={file_icon} alt="Ícone de arquivo" />
                           </div>
                           <span className="upload-btn">
                              <input id="tpd-new-course-file-input" type="file" accept="image/png, image/jpeg" />
                              <label htmlFor="tpd-new-course-file-input">Escolha uma imagem para enviar</label>
                           </span>
                           <p>Tamanho sugerido: 700x430 pixels</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}