'use client';
import { useState } from "react";


// Dados das abas de métodos de retirada traduzidos
const navItemData = [
   { id: 'home', title: 'Transferência Bancária', subTitle: 'Saque mín. R$ 20,00' },
   { id: 'profile', title: 'E-Check', subTitle: 'Saque mín. R$ 40,00' },
   { id: 'contact', title: 'PayPal', subTitle: 'Saque mín. R$ 30,00' }
];

// Dados dos campos de formulário traduzidos por método
const tabContentData = [
   {
      id: 'home',
      formFields: [
         { label: 'Nome do Titular', placeholder: 'Nome Completo' },
         { label: 'Número da Conta', placeholder: '0000 0000 0000 0000' },
         { label: 'Nome do Banco', placeholder: 'Ex: Banco do Brasil, Itaú...' },
         { label: 'Chave PIX / IBAN', placeholder: 'Sua chave ou código IBAN' },
         { label: 'BIC / SWIFT', placeholder: 'Código BIC ou SWIFT do banco' }
      ]
   },
   {
      id: 'profile',
      formFields: [
         { label: 'Titular da Conta (E-Check)', placeholder: 'Nome Completo' },
         { label: 'Número da Conta', placeholder: '0000 0000 0000 0000' },
         { label: 'Nome do Banco', placeholder: 'Nome da Instituição' },
         { label: 'IBAN', placeholder: '1234 5678 9087 6543' },
         { label: 'BIC / SWIFT', placeholder: 'Código BIC / SWIFT' }
      ]
   },
   {
      id: 'contact',
      formFields: [
         { label: 'E-mail do PayPal', placeholder: 'exemplo@paypal.com' },
         { label: 'Confirmar E-mail', placeholder: 'Repita o e-mail do PayPal' },
         { label: 'Nome Completo no PayPal', placeholder: 'Nome do Titular' },
         { label: 'ID do Vendedor (Opcional)', placeholder: 'Identificador' },
         { label: 'Observações', placeholder: 'Informações adicionais' }
      ]
   }
];


export default function InstructorSettingProfileWithdraw() {
   const [activeTab, setActiveTab] = useState('home'); 
   return (
      <div className="tpd-course-area">
         <div className="tpd-setting-box withdraw">
            <div className="tpd-setting-withdraw-content tpd-redio-style">
               {/* Nacionalização do título da seção */}
               <h5 className="tpd-setting-withdraw-title">Selecione um método de retirada</h5>

               <ul className="nav nav-tabs" id="myTab" role="tablist">
                  {navItemData.map((item) => (
                     <li className="nav-item" role="presentation" key={item.id}>
                        <button
                           className={`nav-link ${activeTab === item.id ? 'active' : ''}`}
                           id={`${item.id}-tab`}
                           data-bs-toggle="tab"
                           type="button"
                           role="tab"
                           aria-controls={item.id}
                           aria-selected={activeTab === item.id}
                           onClick={() => setActiveTab(item.id)}
                           tabIndex={activeTab === item.id ? 0 : -1}
                        >
                           <span className="tpd-setting-withdraw-content-box-title">{item.title}</span>
                           <span className="tpd-setting-withdraw-content-box-sub">{item.subTitle}</span>
                           <span className="tpd-redio-style-span"></span>
                        </button>
                     </li>
                  ))}
               </ul>

               <div className="tab-content" id="myTabContent">
                  {tabContentData.map((tab) => (
                     <div
                        key={tab.id}
                        className={`tab-pane fade ${activeTab === tab.id ? 'show active' : ''}`}
                        id={tab.id}
                        role="tabpanel"
                        aria-labelledby={`${tab.id}-tab`}
                     >
                        <div className="tpd-setting-from">
                           <div className="row">
                              {tab.formFields.map((field, index) => (
                                 <div className={`col-lg-${index % 2 === 0 ? '6' : '12'}`} key={field.label}>
                                    <div className="tpd-input">
                                       <label>{field.label}</label>
                                       <input type="text" placeholder={field.placeholder} />
                                    </div>
                                 </div>
                              ))}
                              <div className="col-lg-12">
                                 <div className="tpd-setting-cartificate-btn">
                                    {/* Tradução do botão de salvar conta */}
                                    <button>Salvar Conta para Retirada</button>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </div>
   )
}