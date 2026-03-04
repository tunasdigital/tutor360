'use client'; 
import { useState } from "react"; 
import Image from "next/image";
import file_icon from '@/assets/img/dashboard/bg/select-file-icon.png';

type IProps = {
   courseToEdit?: any; 
}

export default function CourseInfoArea({ courseToEdit }: IProps) {
   // 🚀 DESESTRUTURAÇÃO DE ELITE
   const { 
      title, 
      slug, 
      description, 
      price, 
      discountPrice, 
      level, 
      thumbnail,
      videoId, // F05 - ID do Vídeo de Introdução
      whatYouWillLearn // F04 - Tópicos de Aprendizado
   } = courseToEdit || {};

   // MOTOR DE PREVIEW: Guarda a foto
   const [previewUrl, setPreviewUrl] = useState<string | null>(thumbnail || null);

   // F02 - MOTOR DO SLUG
   const cleanInitialSlug = (slug || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '');
   const [liveSlug, setLiveSlug] = useState<string>(cleanInitialSlug);

   // F04 - MOTOR DE APRENDIZADO (Repetidor)
   const [learnList, setLearnList] = useState<string[]>(whatYouWillLearn || ["", "", ""]);

   const addLearnItem = () => setLearnList([...learnList, ""]);
   const removeLearnItem = (index: number) => setLearnList(learnList.filter((_, i) => i !== index));
   const handleLearnChange = (index: number, value: string) => {
      const newList = [...learnList];
      newList[index] = value;
      setLearnList(newList);
   };

   // GERADOR DE HOLOGRAMA (Thumbnail)
   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
         setPreviewUrl(URL.createObjectURL(file));
      }
   };

   // F02 - O SANITIZADOR DE URL
   const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const sanitized = e.target.value
         .toLowerCase()
         .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
         .replace(/\s+/g, '-')
         .replace(/[^a-z0-9\-]/g, '');
      setLiveSlug(sanitized);
   };

   return (
      // 🚀 FIX DO ERRO DE HYDRATION: Substituímos a tag <form> por um Fragmento React <>
      <>
         {/* 📁 BLOCO 1: INFORMAÇÕES BÁSICAS */}
         <div className="accordion-item mb-20">
            <h2 className="accordion-header">
               <button className="accordion-button tpd-new-course-heading-title" type="button" data-bs-toggle="collapse" data-bs-target="#collapseInfo">
                  1. Informações Básicas e Link
               </button>
            </h2>
            <div id="collapseInfo" className="accordion-collapse collapse show">
               <div className="accordion-body">
                  <div className="tpd-input mb-20">
                     <label>Título do Curso</label>
                     <input type="text" name="title" defaultValue={title || ""} required />
                  </div>
                  
                  <div className="tpd-input mb-0">
                     <label>Slug do Curso (URL)</label>
                     <input type="text" name="slug" value={liveSlug} onChange={handleSlugChange} required />
                  </div>
                  <p className="mb-20" style={{ fontSize: '13px', color: '#64748B' }}>
                     <strong>Link Permanente:</strong> https://tutor360.com.br/curso/{liveSlug || "novo-curso"}
                  </p>
                  
                  <div className="tpd-input about-height">
                     <label>Sobre o Curso (Descrição)</label>
                     <textarea name="description" defaultValue={description || ""} />
                  </div>
               </div>
            </div>
         </div>

         {/* 🎥 BLOCO 2: VÍDEO DE INTRODUÇÃO (F05) */}
         <div className="accordion-item mb-20">
            <h2 className="accordion-header">
               <button className="accordion-button tpd-new-course-heading-title" type="button" data-bs-toggle="collapse" data-bs-target="#collapseVideo">
                  2. Vídeo de Introdução (Pitch de Vendas)
               </button>
            </h2>
            <div id="collapseVideo" className="accordion-collapse collapse show">
               <div className="accordion-body">
                  <div className="tpd-input">
                     <label>ID do Vídeo no YouTube</label>
                     <input 
                        type="text" 
                        name="videoId" 
                        placeholder="Cole apenas o ID (ex: go7QYaQR494)" 
                        defaultValue={videoId || ""} 
                     />
                     <p className="mt-10" style={{ fontSize: '12px', color: '#64748B' }}>
                        O ID inserido aqui será persistido após salvar, alimentando o player da vitrine.
                     </p>
                  </div>
               </div>
            </div>
         </div>

         {/* 🚀 BLOCO 3: O QUE VOCÊ VAI APRENDER (F04) */}
         <div className="accordion-item mb-20">
            <h2 className="accordion-header">
               <button className="accordion-button tpd-new-course-heading-title" type="button" data-bs-toggle="collapse" data-bs-target="#collapseLearn">
                  3. O Que Você Vai Aprender (Benefícios)
               </button>
            </h2>
            <div id="collapseLearn" className="accordion-collapse collapse show">
               <div className="accordion-body">
                  {learnList.map((item, index) => (
                     <div key={index} className="d-flex align-items-center mb-10 gap-2">
                        <input 
                           type="text" 
                           name="whatYouWillLearn[]" 
                           value={item}
                           onChange={(e) => handleLearnChange(index, e.target.value)}
                           style={{ flex: 1 }}
                        />
                        <button type="button" onClick={() => removeLearnItem(index)} style={{ background: '#FFEDED', color: '#FF4444', border: 'none', borderRadius: '8px', padding: '10px 15px' }}>
                           <i className="fa-solid fa-trash-can"></i>
                        </button>
                     </div>
                  ))}
                  <button type="button" onClick={addLearnItem} style={{ background: '#EEF4FF', color: '#1D4ED8', border: '1px dashed #1D4ED8', borderRadius: '8px', padding: '10px 20px', width: '100%' }}>
                     + Adicionar Novo Tópico
                  </button>
               </div>
            </div>
         </div>

         {/* 💰 BLOCO 4: PREÇO E CONFIGURAÇÕES */}
         <div className="accordion-item mb-20">
            <h2 className="accordion-header">
               <button className="accordion-button tpd-new-course-heading-title" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSettings">
                  4. Preço e Configurações
               </button>
            </h2>
            <div id="collapseSettings" className="accordion-collapse collapse show">
               <div className="accordion-body">
                  <div className="tpd-input mb-20">
                     <label>Nível de Dificuldade</label>
                     <select name="level" defaultValue={level || ""}>
                        <option value="Iniciante">Iniciante</option>
                        <option value="Intermediário">Intermediário</option>
                        <option value="Avançado">Avançado</option>
                     </select>
                  </div>
                  <div className="d-flex gap-3">
                     <div className="tpd-input flex-fill">
                        <label>Preço Regular (R$)</label>
                        <input type="number" step="0.01" name="price" defaultValue={price || ""} />
                     </div>
                     <div className="tpd-input flex-fill">
                        <label>Preço com Desconto (R$)</label>
                        <input type="number" step="0.01" name="discountPrice" defaultValue={discountPrice || ""} />
                     </div>
                  </div>
                  
                  <div className="tpd-input mt-30">
                     <label>Capa do Curso (Miniatura)</label>
                     <div className="tpd-new-course-file-content text-center" style={{ backgroundImage: previewUrl ? 'none' : "url(/assets/img/dashboard/bg/select-file.png)", minHeight: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px dashed #e0e0e0', borderRadius: '8px', position: 'relative', overflow: 'hidden' }}>
                        {previewUrl && <img src={previewUrl} style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover' }} />}
                        <input type="file" name="thumbnail" accept="image/*" onChange={handleImageChange} style={{ opacity: 0, position: 'absolute', width: '100%', height: '100%', cursor: 'pointer', zIndex: 10 }} />
                        {!previewUrl && <span>Clique para fazer upload</span>}
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
}