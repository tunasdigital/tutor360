'use client'; 
import { useState } from "react"; // 🚀 TÁTICA NOVA: Importando a memória de estado do React
import Image from "next/image";
import file_icon from '@/assets/img/dashboard/bg/select-file-icon.png';
import { InfoTwoSvg, PenThreeSvg, SettingTwoSvg } from "@/components/svg";
import CourseInfoSelectCategory from "./course-info-select-category";

// Importação da Action
import { publishCourseAction } from "@/actions/course-actions"; 

type IProps = {
   courseToEdit?: any; 
}

export default function CourseInfoArea({ courseToEdit }: IProps) {
   // Desestruturando os dados, incluindo a 'thumbnail' que já possa existir no banco
   const { id, title, slug, description, price, discountPrice, level, maxStudents, thumbnail } = courseToEdit || {};

   // 🚀 O MOTOR DE PREVIEW: Guarda a foto atual do banco ou a nova foto selecionada
   const [previewUrl, setPreviewUrl] = useState<string | null>(thumbnail || null);

   // 🚀 O GERADOR DE HOLOGRAMA: Lê o arquivo local e mostra na tela antes do upload
   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
         setPreviewUrl(URL.createObjectURL(file));
      }
   };

   return (
      <div className="accordion-item">
         <h2 className="accordion-header">
            <button className="accordion-button tpd-new-course-heading-title" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
               Informações do Curso
            </button>
         </h2>
         <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show">
            <div className="accordion-body">
               
               <form id="course-publish-form" action={publishCourseAction}>
                  <input type="hidden" name="courseId" value={id || ""} />

                  <div className="tpd-new-course-box-1">
                     <div className="tpd-input">
                        <label>Título do Curso</label>
                        <input type="text" name="title" placeholder="Nome do seu novo curso" defaultValue={title || ""} required />
                     </div>
                     <div className="tpd-input">
                        <label>Slug do Curso (URL)</label>
                        <input type="text" name="slug" placeholder="nome-do-curso" defaultValue={slug || ""} required />
                     </div>
                     <p>Link Permanente: <a href="#">https://tutor360.com.br/curso/{slug || "novo-curso"}</a></p>
                     
                     <div className="tpd-input about-height">
                        <label>Sobre o Curso</label>
                        <textarea name="description" placeholder="Descreva brevemente o que os alunos aprenderão" defaultValue={description || ""} />
                     </div>
                  </div>

                  <div className="tpd-new-course-box-2">
                     <h4 className="tpd-new-course-setting-title">Configurações do Curso</h4>
                     <div className="tpd-input">
                        <label>Nível de Dificuldade</label>
                        <input type="text" name="level" placeholder="Iniciante, Intermediário ou Avançado" defaultValue={level || ""} />
                     </div>
                  </div>

                  <div className="tpd-new-course-box-3">
                     <div className="tpd-new-course-categories">
                        <div className="tpd-input-box d-flex mt-35">
                           <div className="tpd-input">
                              <label>Preço Regular (R$)</label>
                              <input type="number" step="0.01" name="price" placeholder="ex: 199.00" defaultValue={price || ""} />
                           </div>
                           <div className="tpd-input">
                              <label>Preço com Desconto (R$)</label>
                              <input type="number" step="0.01" name="discountPrice" placeholder="ex: 157.00" defaultValue={discountPrice || ""} />
                           </div>
                        </div>
                        
                        {/* 🖼️ ÁREA DA FOTO COM PREVIEW VISUAL */}
                        <div className="tpd-input course-file mt-35">
                           <label>Miniatura do Curso (Thumbnail)</label>
                           
                           <div 
                              className="tpd-new-course-file-content text-center" 
                              style={{ 
                                 backgroundImage: previewUrl ? 'none' : "url(/assets/img/dashboard/bg/select-file.png)",
                                 position: 'relative',
                                 minHeight: '220px',
                                 display: 'flex',
                                 flexDirection: 'column',
                                 justifyContent: 'center',
                                 alignItems: 'center',
                                 overflow: 'hidden',
                                 border: previewUrl ? '2px dashed #e0e0e0' : 'none',
                                 borderRadius: '8px'
                              }}
                           >
                              {/* O Espelho: Mostra a imagem de fundo preenchendo o espaço se ela existir */}
                              {previewUrl ? (
                                 <img 
                                    src={previewUrl} 
                                    alt="Preview da Capa" 
                                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }}
                                 />
                              ) : (
                                 <div className="tpd-new-course-file-thumb mb-15">
                                    <Image src={file_icon} alt="Ícone de arquivo" />
                                 </div>
                              )}

                              {/* O Botão de Upload: Fica por cima da imagem */}
                              <span className="upload-btn" style={{ position: 'relative', zIndex: 10 }}>
                                 <input 
                                    id="tpd-new-course-file-input" 
                                    type="file" 
                                    name="thumbnail" 
                                    accept="image/png, image/jpeg, image/webp"
                                    onChange={handleImageChange} // Gatilho do Preview
                                 />
                                 <label 
                                    htmlFor="tpd-new-course-file-input" 
                                    style={previewUrl ? { backgroundColor: 'rgba(0,0,0,0.7)', color: '#fff', border: '1px solid #fff' } : {}}
                                 >
                                    {previewUrl ? "Trocar Imagem da Capa" : "Escolha uma imagem para enviar"}
                                 </label>
                              </span>
                              {!previewUrl && <p>Tamanho sugerido: 700x430 pixels</p>}
                           </div>
                        </div>

                     </div>
                  </div>
               </form>

            </div>
         </div>
      </div>
   )
}