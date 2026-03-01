'use client';
import { useState } from "react";
import { CalenderThreeSvg, DownloadTwoSvg } from "@/components/svg";
import DatePicker from "@/components/ui/date-picker";
import Pagination from "@/components/ui/pagination";
import usePagination from "@/hooks/use-pagination";

// Dados de pedidos de hoje traduzidos
const todayOrderData = [
   {
      orderId: "#4024",
      courseName: "Inscrição",
      date: "2 de Março, 2026",
      price: 50.00,
      status: "Aguardando",
      statusClass: "warning",
      downloadLink: "/assets/img/history.pdf",
   },
   {
      orderId: "#4056",
      courseName: "Sistema de Design no Figma",
      date: "2 de Junho, 2026",
      price: 100.00,
      status: "Sucesso",
      statusClass: "sucess",
      downloadLink: "/assets/img/history.pdf",
   }
]

// Dados de pedidos mensais traduzidos
const monthlyOrderData = [
   {
      orderId: "#4024",
      courseName: "Inscrição",
      date: "2 de Março, 2026",
      price: 50.00,
      status: "Aguardando",
      statusClass: "warning",
      downloadLink: "/assets/img/history.pdf",
   },
   {
      orderId: "#4056",
      courseName: "Sistema de Design no Figma",
      date: "2 de Junho, 2026",
      price: 100.00,
      status: "Sucesso",
      statusClass: "sucess",
      downloadLink: "/assets/img/history.pdf",
   },
   {
      orderId: "#4034",
      courseName: "Desenvolvimento de Apps",
      date: "2 de Maio, 2026",
      price: 76.00,
      status: "Processando",
      statusClass: "info",
      downloadLink: "/assets/img/history.pdf",
   },
   {
      orderId: "#4018",
      courseName: "Design Gráfico",
      date: "2 de Março, 2026",
      price: 40.00,
      status: "Cancelado",
      statusClass: "danger",
      downloadLink: "/assets/img/history.pdf",
   },
]

// Dados de pedidos anuais traduzidos
const yearlyOrderData = [
   {
      orderId: "#4024",
      courseName: "Inscrição",
      date: "2 de Março, 2026",
      price: 50.00,
      status: "Aguardando",
      statusClass: "warning",
      downloadLink: "/assets/img/history.pdf",
   },
   {
      orderId: "#4056",
      courseName: "Sistema de Design no Figma",
      date: "2 de Junho, 2026",
      price: 100.00,
      status: "Sucesso",
      statusClass: "sucess",
      downloadLink: "/assets/img/history.pdf",
   },
   {
      orderId: "#4034",
      courseName: "Desenvolvimento de Apps",
      date: "2 de Maio, 2026",
      price: 76.00,
      status: "Processando",
      statusClass: "info",
      downloadLink: "/assets/img/history.pdf",
   },
   {
      orderId: "#4018",
      courseName: "Design Gráfico",
      date: "2 de Março, 2026",
      price: 40.00,
      status: "Cancelado",
      statusClass: "danger",
      downloadLink: "/assets/img/history.pdf",
   },
   {
      orderId: "#4056",
      courseName: "Marketing Digital",
      date: "2 de Junho, 2026",
      price: 100.00,
      status: "Sucesso",
      statusClass: "sucess",
      downloadLink: "/assets/img/history.pdf",
   },
   {
      orderId: "#4067",
      courseName: "React Guia Avançado",
      date: "15 de Julho, 2026",
      price: 120.00,
      status: "Sucesso",
      statusClass: "sucess",
      downloadLink: "/assets/img/history.pdf",
   },
   {
      orderId: "#4078",
      courseName: "JavaScript Deep Dive",
      date: "10 de Agosto, 2026",
      price: 85.00,
      status: "Aguardando",
      statusClass: "warning",
      downloadLink: "/assets/img/history.pdf",
   },
   {
      orderId: "#4089",
      courseName: "Web Development Bootcamp",
      date: "5 de Setembro, 2026",
      price: 200.00,
      status: "Processando",
      statusClass: "info",
      downloadLink: "/assets/img/history.pdf",
   }
];


const tabs = ['Hoje', 'Mensal', 'Anual'];

export default function InstructorOrderArea() {
   const [activeTab, setActiveTab] = useState(tabs[0]);
   const [date, setDate] = useState(new Date());
   
   // Lógica de paginação adaptada para as abas traduzidas
   const getOrderData = () => {
      if (activeTab === 'Hoje') return todayOrderData;
      if (activeTab === 'Mensal') return monthlyOrderData;
      return yearlyOrderData;
   };

   const { currentItems, handlePageClick, pageCount } = usePagination(getOrderData(), 5);

   return (
      <>
         <section className="tpd-order-area">
            <div className="row">
               <div className="col-lg-6">
                  <div className="tp-dashboard-section">
                     <h2 className="tp-dashboard-title">Histórico de Pedidos</h2>
                  </div>
               </div>
            </div>
            <div className="row">
               <div className="col-lg-7">
                  <div className="tpd-order-filter tpd-redio-style tmy-tab mb-30">
                     <ul className="nav nav-tabs">
                        {tabs.map((tab, index) => (
                           <li key={index} className="nav-item p-relative" role="presentation">
                              <button onClick={() => setActiveTab(tab)} className={`nav-link ${activeTab === tab ? 'active' : ''}`}>
                                 <span className="tpd-redio-style-span"> </span>
                                 <span>{tab}</span>
                              </button>
                           </li>
                        ))}
                     </ul>
                  </div>
               </div>
               <div className="col-lg-5">
                  <div className="tpd-order-date-input text-lg-end">
                     <form action="#">
                        <DatePicker date={date} setDate={setDate} />
                        <span>
                           <CalenderThreeSvg />
                        </span>
                     </form>
                  </div>
               </div>
            </div>
            <div className="row">
               <div className="tab-content" id="myTabContent">

                  <div className="tpd-table mb-45">
                     <ul>
                        <li className="tpd-table-head">
                           <div className="tpd-table-row">
                              <div className="tpd-order-id">
                                 <h4 className="tpd-table-title">ID do Pedido</h4>
                              </div>
                              <div className="tpd-order-name">
                                 <h4 className="tpd-table-title">Nome do Curso</h4>
                              </div>
                              <div className="tpd-order-date">
                                 <h4 className="tpd-table-title">Data</h4>
                              </div>
                              <div className="tpd-order-price">
                                 <h4 className="tpd-table-title">Preço</h4>
                              </div>
                              <div className="tpd-order-status">
                                 <h4 className="tpd-table-title">Status</h4>
                              </div>
                              <div className="tpd-order-action"></div>
                           </div>
                        </li>

                        {currentItems.map((order, index) => (
                           <li key={index}>
                              <div className="tpd-table-row">
                                 <div className="tpd-order-id">
                                    <h4 className="tpd-common-text">{order.orderId}</h4>
                                 </div>
                                 <div className="tpd-order-name">
                                    <h4 className="tpd-common-text">{order.courseName}</h4>
                                 </div>
                                 <div className="tpd-order-date">
                                    <h4 className="tpd-common-text">{order.date}</h4>
                                 </div>
                                 <div className="tpd-order-price">
                                    <h4 className="tpd-common-text">
                                       {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(order.price)}
                                    </h4>
                                 </div>
                                 <div className="tpd-order-status">
                                    <div className="tpd-badge-item">
                                       <span className={`tpd-badge ${order.statusClass}`}>
                                          {order.status}
                                       </span>
                                    </div>
                                 </div>
                                 <div className="tpd-order-action">
                                    <div className="tpd-action-btn">
                                       <a href={order.downloadLink} download="historico-vendas.pdf">
                                          <DownloadTwoSvg />
                                          <span className="tpd-action-tooltip">Baixar</span>
                                       </a>
                                    </div>
                                 </div>
                              </div>
                           </li>
                        ))}
                     </ul>
                  </div>

               </div>
            </div>

            <div className="row">
               <div className="col-12">
                  <div className="tp-dashboard-pagination">
                     <div className="tp-pagination">
                        <Pagination handlePageClick={handlePageClick} pageCount={pageCount} isCenter={true} />
                     </div>
                  </div>
               </div>
            </div>

         </section>
      </>
   )
}