import Image from "next/image";
import { RightSmArrow } from "@/components/svg";

const socialData = [
   {
      name: "Facebook",
      imgSrc: "/assets/img/dashboard/icon/facebook.png",
      placeholder: "https://facebook.com/seunome"
   },
   {
      name: "Twitter",
      imgSrc: "/assets/img/dashboard/icon/twetter.png",
      placeholder: "https://twitter.com/seunome"
   },
   {
      name: "Linkedin",
      imgSrc: "/assets/img/dashboard/icon/linkdin.png",
      placeholder: "https://linkedin.com/in/seunome"
   },
   {
      name: "Website",
      imgSrc: "/assets/img/dashboard/icon/website.png",
      placeholder: "https://seusite.com.br/"
   },
   {
      name: "Github",
      imgSrc: "/assets/img/dashboard/icon/git.png",
      placeholder: "https://github.com/seunome"
   }
];

export default function InstructorSettingProfileSocials() {
   return (
      <div className="tpd-course-area">
         <div className="container">
            <div className="row">
               <div className="col-12">
                  <div className="tpd-setting-box">
                     {/* Nacionalização do título da seção */}
                     <h3 className="tpd-setting-social-title">Links de Perfis Sociais</h3>
                     <div className="tpd-setting-social-content">
                        {socialData.map((social, index) => (
                           <div key={index} className="tpd-setting-social-wrap d-flex align-items-center">
                              <div className="tpd-setting-social-icon d-flex align-items-center">
                                 <Image src={social.imgSrc} alt={social.name} width={28} height={28} />
                                 <h4>{social.name} <span><RightSmArrow /></span></h4>
                              </div>
                              <div className="tp-setting-social-input">
                                 <div className="tpd-input">
                                    <input type="text" placeholder={social.placeholder} />
                                 </div>
                              </div>
                           </div>
                        ))}
                        <div className="tpd-setting-btn">
                           {/* Tradução do botão de ação */}
                           <button>Atualizar Perfil</button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}