'use client';
import Image from "next/image";
import icon_1 from '@/assets/img/dashboard/icon/fact/teacher.svg';
import icon_2 from '@/assets/img/dashboard/icon/fact/enroll-icon.svg';
import icon_3 from '@/assets/img/dashboard/icon/fact/cup.svg';
import icon_4 from '@/assets/img/dashboard/icon/fact/students.svg';
import icon_5 from '@/assets/img/dashboard/icon/fact/course-total.svg';
import icon_6 from '@/assets/img/dashboard/icon/fact/card-pos.svg';

// Matriz de dados financeiros e de volume nacionalizada - Tutor360
const factItemData = [
   {
      id: 1,
      count: 20,
      label: 'Cursos Ativos',
      iconSrc: icon_1,
      iconAlt: 'Ícone de Cursos Ativos',
   },
   {
      id: 2,
      count: 84,
      label: 'Matrículas Realizadas',
      iconSrc: icon_2,
      iconAlt: 'Ícone de Matrículas',
      iconClass: 'common-pale-yellow',
   },
   {
      id: 3,
      count: 42,
      label: 'Cursos Concluídos',
      iconSrc: icon_3,
      iconAlt: 'Ícone de Cursos Concluídos',
      iconClass: 'common-pale-pacific',
   },
   {
      id: 4,
      count: 145,
      label: 'Total de Alunos',
      iconSrc: icon_4,
      iconAlt: 'Ícone de Total de Alunos',
      iconClass: 'common-pale-green',
   },
   {
      id: 5,
      count: 65,
      label: 'Total de Cursos',
      iconSrc: icon_5,
      iconAlt: 'Ícone de Total de Cursos',
      iconClass: 'common-pale-blue',
   },
   {
      id: 6,
      count: 26,
      label: 'Ganhos Totais',
      iconSrc: icon_6,
      iconAlt: 'Ícone de Ganhos Totais',
      iconClass: 'common-pale-purple',
   },
];

export default function InstructorAnalyticsEarningArea() {
   return (
      <div className="dashboader-area mb-25">
         <div className="row">
            {factItemData.map(({ id, count, label, iconSrc, iconAlt, iconClass }) => (
               <div key={id} className="col-lg-4">
                  <div className="tp-fact-item d-flex align-items-center justify-content-between">
                     <div className="tp-fact-content">
                        <h4 className="tp-fact-count">{count}</h4>
                        {/* Rótulo traduzido para o usuário final */}
                        <span>{label}</span>
                     </div>
                     <div className="tp-fact-icon">
                        <span className={iconClass ? iconClass : ''}>
                           <Image src={iconSrc} alt={iconAlt} />
                        </span>
                     </div>
                  </div>
               </div>
            ))}
         </div>
      </div>
   )
}