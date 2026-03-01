'use client';
import { useState } from "react";
import InstructorSettingContentWrapper from "./instructor-setting-content-wrapper";
import InstructorSettingProfilePage from "./instructor-setting-profile-area";
import InstructorSettingPassword from "./instructor-setting-password";
import InstructorSettingProfileWithdraw from "./instructor-setting-profile-withdraw";
import InstructorSettingProfileSocials from "./instructor-setting-profile-socials";

// Garimpo das abas: Tradução dos nomes que aparecem no menu de navegação superior
const tabs = ['Perfil', 'Senha', 'Retiradas', 'Redes Sociais'];

type IProps = {
   studentProfile?: boolean;
}
export default function InstructorSettingProfileMainArea({studentProfile=false}: IProps) {
   const [activeTab, setActiveTab] = useState(tabs[0]);
   return (
      <>
         <div className="row">
            <div className="col-12">
               <div className="tp-dashboard-tab mb-25">
                  {/* Nacionalização do título da página */}
                  <h2 className="tp-dashboard-tab-title">Configurações</h2>
                  <div className="tp-dashboard-tab-list">
                     <ul>
                        {tabs.map((tab) => (
                           <li
                              key={tab}
                              onClick={() => setActiveTab(tab)}
                           >
                              <a className={`${tab === activeTab ? 'active' : ''} pointer`}>
                                 {tab}
                              </a>
                           </li>
                        ))}
                     </ul>
                  </div>
               </div>
            </div>
         </div>

         {/* Conteúdo das configurações do instrutor/aluno */}
         <InstructorSettingContentWrapper>
            {activeTab === 'Perfil' && <InstructorSettingProfilePage studentProfile={studentProfile} />}
            {activeTab === 'Senha' && <InstructorSettingPassword />}
            {activeTab === 'Retiradas' && <InstructorSettingProfileWithdraw />}
            {activeTab === 'Redes Sociais' && <InstructorSettingProfileSocials/>}
         </InstructorSettingContentWrapper>
      </>
   )
}