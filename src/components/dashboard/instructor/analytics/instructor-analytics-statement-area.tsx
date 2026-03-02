import { useState } from "react";
import { CalenderThreeSvg, DownloadTwoSvg } from "@/components/svg";
import DatePicker from "@/components/ui/date-picker";
import NiceSelect from "@/components/ui/nice-select";
import { formatPrice } from "@/lib/format-price";

// Dados de extrato nacionalizados - Tutor360
const statementData = [
   {
      id: "#4024",
      courseName: "Desenvolvimento de Aplicações",
      date: "2 de Março de 2024",
      price: 50.00,
      status: "Retido",
      statusClass: "warning",
   },
   {
      id: "#4056",
      courseName: "Design System no Figma",
      date: "2 de Junho de 2024",
      price: 100.00,
      status: "Sucesso",
      statusClass: "sucess",
   },
   {
      id: "#4034",
      courseName: "Desenvolvimento Mobile",
      date: "2 de Maio de 2024",
      price: 76.00,
      status: "Processando",
      statusClass: "info",
   },
   {
      id: "#4018",
      courseName: "Design Gráfico",
      date: "2 de Março de 2024",
      price: 10,
      status: "Cancelado",
      statusClass: "danger",
   },
   {
      id: "#4056",
      courseName: "Cursos de Marketing Digital",
      date: "2 de Junho de 2024",
      price: 100.00,
      status: "Sucesso",
      statusClass: "sucess",
   },
   {
      id: "#4018",
      courseName: "Desenvolvimento de Aplicações",
      date: "2 de Junho de 2024",
      price: 100.00,
      status: "Retido",
      statusClass: "warning",
   },
];


export default function InstructorAnalyticsStatementArea() {
   const [date, setDate] = useState(new Date());
   function handleCourseFilter(item: { value: string, label: string }) {
      console.log(item);
   }
   return (
      <>
         <div className="row">
            <div className="col-lg-6">
               <div className="tpd-dashboard-select-course mb-30">
                  <div className="tp-course-filter-select">
                     <NiceSelect
                        options={[
                           { value: "", label: "Todos os Cursos" },
                           { value: "latest", label: "Novos Cursos 2024" },
                           { value: "web-d", label: "Sistema de Web Design no Figma" },
                           { value: "interior", label: "Masterclass de Design de Interiores" },
                           { value: "graphic", label: "Masterclass de Design Gráfico" },
                           { value: "bootstrap", label: "Bootstrap 5 do Zero" },
                        ]}
                        defaultCurrent={0}
                        cls="wide"
                        onChange={handleCourseFilter}
                        name="courseSort"
                     />
                  </div>
               </div>
            </div>
            <div className="col-lg-6">
               <div className="tpd-order-date-input text-lg-end mb-30">
                  <form action="#">
                     <DatePicker date={date} setDate={setDate} />
                     <span><CalenderThreeSvg /></span>
                  </form>
               </div>
            </div>
         </div>


         <div className="row">
            <div className="col-lg-12">
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

                     {statementData.map((statement, index) => (
                        <li key={index}>
                           <div className="tpd-table-row">
                              <div className="tpd-order-id">
                                 <h4 className="tpd-common-text">{statement.id}</h4>
                              </div>
                              <div className="tpd-order-name">
                                 <h4 className="tpd-common-text">{statement.courseName}</h4>
                              </div>
                              <div className="tpd-order-date">
                                 <h4 className="tpd-common-text">{statement.date}</h4>
                              </div>
                              <div className="tpd-order-price">
                                 {/* formatPrice garante a moeda R$ configurada no sistema */}
                                 <h4 className="tpd-common-text">{formatPrice(statement.price,true)}</h4>
                              </div>
                              <div className="tpd-order-status">
                                 <div className="tpd-badge-item">
                                    <span className={`tpd-badge ${statement.statusClass}`}>
                                       {statement.status}
                                    </span>
                                 </div>
                              </div>
                              <div className="tpd-order-action">
                                 <div className="tpd-action-btn">
                                    <button>
                                       <DownloadTwoSvg />
                                       <span className="tpd-action-tooltip">Baixar</span>
                                    </button>
                                 </div>
                              </div>
                           </div>
                        </li>
                     ))}
                  </ul>
               </div>
            </div>
         </div>
      </>
   )
}