'use client';
import { useState } from "react";
import Image from "next/image";

// O caminho aqui (../instructor) funciona perfeitamente quando o arquivo está isolado na pasta 'admin'
import InstructorAnalyticsTopArea from "../instructor/analytics/instructor-analytics-top-area";
import ProgressEarningsGraph from "../instructor/analytics/instructor-analytics-progress-area";
import InstructorAnalyticsPopularCourses from "../instructor/analytics/instructor-analytics-popular-courses";
import InstructorAnalyticsRecentReviews from "../instructor/analytics/instructor-analytics-recent-reviews";
import InstructorAnalyticsCourseArea from "../instructor/analytics/instructor-analytics-course-area";
import InstructorAnalyticsEarningArea from "../instructor/analytics/instructor-analytics-earning-area";
import InstructorAnalyticsStatementArea from "../instructor/analytics/instructor-analytics-statement-area";
import InstructorAnalyticsStudentArea from "../instructor/analytics/instructor-analytics-student-area";
import no_data_bg from '@/assets/img/dashboard/bg/withdrawal-bg.png';

// Dicionário de abas nacionalizado para a governança do Admin
const tabData = ['Visão Geral', 'Cursos', 'Receitas', 'Extratos', 'Alunos', 'Exportar'];

export default function AdminAnalyticsArea() {
   const [activeTab, setActiveTab] = useState(tabData[0]);
   
   return (
      <>
         <div className="tp-dashboard-tab mb-60">
            <h2 className="tp-dashboard-tab-title">Análise de Plataforma (Global)</h2>
            <div className="tp-dashboard-tab-list">
               <ul>
                  {tabData.map((tab) => (
                     <li key={tab}>
                        <a className={`${activeTab === tab ? 'active' : ''} pointer`} onClick={() => setActiveTab(tab)}>
                           {tab}
                        </a>
                     </li>
                  ))}
               </ul>
            </div>
         </div>

         {activeTab === 'Visão Geral' && (
            <>
               <InstructorAnalyticsTopArea />
               <ProgressEarningsGraph />
               <InstructorAnalyticsPopularCourses />
               <InstructorAnalyticsRecentReviews />
            </>
         )}

         {activeTab === 'Cursos' && (
            <InstructorAnalyticsCourseArea />
         )}

         {activeTab === 'Receitas' && (
            <InstructorAnalyticsEarningArea />
         )}

         {activeTab === 'Extratos' && (
            <InstructorAnalyticsStatementArea />
         )}

         {activeTab === 'Alunos' && (
            <InstructorAnalyticsStudentArea />
         )}

         {activeTab === 'Exportar' && (
            <div className="tpd-withdraw-bg text-center mt-100">
               <Image src={no_data_bg} alt="sem-dados" style={{ height: 'auto' }} />
               <p>Nenhum dado disponível para exportação no momento.</p>
            </div>
         )}
      </>
   )
}