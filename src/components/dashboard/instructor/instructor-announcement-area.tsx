'use client';
import { useState } from "react";
import Image from "next/image";
import { CalenderThreeSvg, DeleteSvg, DotsTwoSvg, PenTwoSvg } from "@/components/svg";
import DatePicker from "@/components/ui/date-picker";
import NiceSelect from "@/components/ui/nice-select";
import announce_icon from '@/assets/img/dashboard/icon/announcement-icon.svg';
import useGlobalContext from "@/hooks/use-global-context";
import useClickOutside from "@/hooks/use-click-outside";


const announcementData = [
   {
      id:1,
      date: "27 de Agosto, 2026",
      time: "06:01",
      announcement: "Sistema de Web Design no Figma",
      courseName: "Curso:",
      courseTitle: "Masterclass de Design",
   },
   {
      id:2,
      date: "27 de Agosto, 2026",
      time: "06:01",
      announcement: "Sistema de Web Design no Figma",
      courseName: "Curso:",
      courseTitle: "Masterclass de Design",
   },
   {
      id:3,
      date: "27 de Agosto, 2026",
      time: "06:01",
      announcement: "Sistema de Web Design no Figma",
      courseName: "Curso:",
      courseTitle: "Masterclass de Design",
   },
   {
      id:4,
      date: "27 de Agosto, 2026",
      time: "06:01",
      announcement: "Sistema de Web Design no Figma",
      courseName: "Curso:",
      courseTitle: "Masterclass de Design",
   },
   {
      id:5,
      date: "27 de Agosto, 2026",
      time: "06:01",
      announcement: "Sistema de Web Design no Figma",
      courseName: "Curso:",
      courseTitle: "Masterclass de Design",
   }
];


export default function InstructorAnnouncementArea() {
   const [date, setDate] = useState(new Date());
   const {handleAnnounceAddEditModal,handleAnnounceDetailsModal} = useGlobalContext();
   const [openActionId, setOpenActionId] = useState<number | null>(null);
   const actionButtonRef = useClickOutside(setOpenActionId);
   function toggleAction(id: number) {
      if (openActionId === id) {
         setOpenActionId(null);
      } else {
         setOpenActionId(id);
      }
   }
   function handleCourseFilter(item: { value: string, label: string }) {
      console.log(item);
   }
   function handleCourseSorting(item: { value: string, label: string }) {
      console.log(item);
   }
   return (
      <>
         <section className="tpd-order-area">
            <div className="row">
               <div className="col-lg-6">
                  <div className="tp-dashboard-section">
                     <h2 className="tp-dashboard-title">Anúncios</h2>
                  </div>
               </div>
            </div>
            <div className="row">
               <div className="col-12">
                  <div className="tpd-announcement tpd-common-shadow d-flex align-items-center justify-content-between mb-70">
                     <div className="tpd-announcement-info d-flex align-items-center">
                        <div className="tpd-announcement-icon">
                           <span><Image src={announce_icon} alt="ícone" /></span>
                        </div>
                        <div className="tp-announcement-notification">
                           <span>Criar Anúncio</span>
                           <h4 className="tpd-announcement-notification-title">Notifique todos os alunos do seu curso</h4>
                        </div>
                     </div>
                     <div className="text-lg-end">
                        <button className="tpd-border-btn active" onClick={()=>handleAnnounceAddEditModal()}>Novo Anúncio</button>
                     </div>
                  </div>
               </div>
            </div>
            <div className="row">
               <div className="col-lg-6">
                  <div className="tpd-dashboard-select-course">
                     <div className="tp-course-filter-select">
                        <NiceSelect
                           options={[
                              { value: "", label: "Todos os Cursos" },
                              { value: "latest", label: "Novos Cursos 2026" },
                              { value: "web-d", label: "Web Design no Figma" },
                              { value: "interior", label: "Masterclass em Design de Interiores" },
                              { value: "graphic", label: "Masterclass em Design Gráfico" },
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
                  <div className="tpd-dashboard-select-calender d-flex align-items-center justify-content-end">
                     <div className="tpd-order-short-list mb-30">
                        <div className="tp-course-filter-select">
                           <NiceSelect
                              options={[
                                 { value: "desc", label: "Decrescente" },
                                 { value: "asc", label: "Crescente" },
                                 { value: "popularity", label: "Popularidade" },
                              ]}
                              defaultCurrent={0}
                              cls="wide"
                              onChange={handleCourseSorting}
                              name="sorting"
                           />
                        </div>
                     </div>
                     <div className="tpd-order-date-input mb-30 ml-10">
                        <form action="#">
                           <DatePicker date={date} setDate={setDate} />
                           <span><CalenderThreeSvg /></span>
                        </form>
                     </div>
                  </div>
               </div>
            </div>
            <div className="row">
               <div className="col-12">
                  <div className="tpd-table tpd-announcement-table mb-45">
                     <ul>
                        <li className="tpd-table-head">
                           <div className="tpd-table-row">
                              <div className="tpd-announcement-date">
                                 <h4 className="tpd-table-title">Data</h4>
                              </div>
                              <div className="tpd-announcement-announcement">
                                 <h4 className="tpd-table-title">Anúncios</h4>
                              </div>
                              <div className="tpd-announcement-btn"></div>
                              <div className="tpd-announcement-action"></div>
                           </div>
                        </li>

                        {announcementData.map((item, index) => (
                           <li key={index}>
                              <div className="tpd-table-row">
                                 <div className="tpd-announcement-date">
                                    <h4 className="tpd-common-text">{item.date}</h4>
                                    <span className="tpd-announcement-time">{item.time}</span>
                                 </div>
                                 <div className="tpd-announcement-announcement">
                                    <h4 className="tpd-common-text">{item.announcement}</h4>
                                    <div className="tpd-course-wrap">
                                       <span className="tpd-course-name">{item.courseName}</span>
                                       <span className="tpd-course-title">{item.courseTitle}</span>
                                    </div>
                                 </div>
                                 <div
                                    className="tpd-announcement-btn"
                                    onClick={handleAnnounceDetailsModal}
                                 >
                                    <button className="tpd-btn-details">Detalhes</button>
                                 </div>
                                 <div className="tpd-announcement-action" ref={actionButtonRef}>
                                    <div className={`tpd-action-inexact-btn ${openActionId === item.id ? 'active' : ''}`}>
                                       <button className="click" onClick={() => toggleAction(item.id)}>
                                          <DotsTwoSvg />
                                       </button>
                                       <div className="tpd-action-click-tooltip bundle">
                                          <button onClick={()=> handleAnnounceAddEditModal(item)}>
                                             <span>
                                                <PenTwoSvg />
                                             </span>
                                             Editar
                                          </button>
                                          <button>
                                             <span>
                                                <DeleteSvg />
                                             </span>
                                             Excluir
                                          </button>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </li>
                        ))}
                     </ul>
                  </div>
               </div>
            </div>
         </section>
      </>
   )
}