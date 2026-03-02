import Image from "next/image";
import { Metadata } from "next";
import DashboardContentWrapper from "@/components/dashboard/dashboard-content-wrapper";
import { InfoSvg } from "@/components/svg";
import announce_icon from '@/assets/img/dashboard/icon/announcement-icon.svg';
import no_data_bg from '@/assets/img/dashboard/bg/withdrawal-bg.png';

export const metadata: Metadata = {
   title: "Aprovação de Saques (Root) - Tutor360",
}

export default function AdminWithdrawalPage() {
   return (
      // Classe pt-50 adicionada para manter a consistência do Layout SaaS (Sem Banner)
      <main className="tp-dashboard-body-bg pt-50">

         {/* Abertura do wrapper com o Menu Exclusivo do God Mode (adminSidebar={true}) */}
         <DashboardContentWrapper adminSidebar={true}>
            <section className="tpd-order-area">
               <div className="row">
                  <div className="col-lg-6">
                     <div className="tp-dashboard-section">
                        {/* Título Nacionalizado e adaptado para a Governança */}
                        <h2 className="tp-dashboard-title">Aprovação de Saques</h2>
                     </div>
                  </div>
               </div>
               <div className="row">
                  <div className="col-12">
                     <div className="tpd-withdraw-wrap mb-85">
                        <div className="tpd-announcement tpd-common-shadow d-flex align-items-center justify-content-between mb-25">
                           <div className="tpd-announcement-info d-flex align-items-center">
                              <div className="tpd-announcement-icon">
                                 <span><Image src={announce_icon} alt="ícone de aviso financeiro" /></span>
                              </div>
                              <div className="tpd-announcement-notification">
                                 {/* Painel macro simulando o saldo a pagar aos instrutores */}
                                 <span>Saldo Global Pendente: R$ 0,00</span>
                                 <h4 className="tpd-withdraw-title">Você possui <span>0</span> solicitações de saque aguardando aprovação.</h4>
                              </div>
                           </div>
                        </div>
                        <div className="tpd-withdraw-notification">
                           <p>
                              <span>
                                 <InfoSvg />
                              </span>
                              {/* Texto informativo adaptado para as políticas da Tutor360 */}
                              As transferências são realizadas via PIX ou TED. Você pode configurar as <a href="/dashboard/admin-settings"> Regras de Repasse</a> globais.
                           </p>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="row">
                  <div className="col-12">
                     <div className="tpd-withdraw-bg text-center">
                        <Image src={no_data_bg} alt="sem solicitações" style={{height:'auto'}} />
                        <p>Nenhuma solicitação de saque pendente no momento.</p>
                     </div>
                  </div>
               </div>
            </section>
         </DashboardContentWrapper>

      </main>
   )
}