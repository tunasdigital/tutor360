'use client';
import { DownloadTwoSvg } from "@/components/svg";
import Pagination from "@/components/ui/pagination";
import usePagination from "@/hooks/use-pagination";


// Dados de pedidos anuais traduzidos e localizados
const studentOrderData = [
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
      courseName: "Cursos de Marketing Digital",
      date: "2 de Junho, 2026",
      price: 100.00,
      status: "Sucesso",
      statusClass: "sucess",
      downloadLink: "/assets/img/history.pdf",
   },
   {
      orderId: "#4067",
      courseName: "Guia Avançado de React",
      date: "15 de Julho, 2026",
      price: 120.00,
      status: "Sucesso",
      statusClass: "sucess",
      downloadLink: "/assets/img/history.pdf",
   },
   {
      orderId: "#4078",
      courseName: "Imersão em JavaScript",
      date: "10 de Agosto, 2026",
      price: 85.00,
      status: "Aguardando",
      statusClass: "warning",
      downloadLink: "/assets/img/history.pdf",
   },
   {
      orderId: "#4089",
      courseName: "Bootcamp de Dev Web",
      date: "5 de Setembro, 2026",
      price: 200.00,
      status: "Processando",
      statusClass: "info",
      downloadLink: "/assets/img/history.pdf",
   }
];

export default function StudentOrderArea() {
   const { currentItems, handlePageClick, pageCount } = usePagination(studentOrderData, 6);
   return (
      <section className="tpd-order-area">
         <div className="row">
            <div className="col-lg-6">
               <div className="tp-dashboard-section">
                  <h2 className="tp-dashboard-title">Histórico de Pedidos</h2>
               </div>
            </div>
         </div>

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
                              <a href={order.downloadLink} download="historico.pdf">
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
   )
}