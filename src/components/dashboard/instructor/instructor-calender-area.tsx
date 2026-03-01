'use client';
import React from 'react';
import FullCalendar from '@fullcalendar/react'; 
import dayGridPlugin from '@fullcalendar/daygrid'; 
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction'; 
import timeGridPlugin from '@fullcalendar/timegrid'; 

export default function InstructorCalenderArea() {
    // Alerta de interação traduzido para feedback imediato
    const handleDateClick = (arg:DateClickArg) => {
        alert(`Data selecionada: ${arg.dateStr}`);
    };

    return (
        <div className="tpd-dashboard-calender-box">
            <FullCalendar
               plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]} 
               initialView="dayGridMonth" 
               height="600px" 
               expandRows={true} 
               slotMinTime="08:00" 
               slotMaxTime="20:00" 
               // Nacionalização da barra de ferramentas e botões
               headerToolbar={{
                   left: 'prev,next today', 
                   center: 'title', 
                   right: 'dayGridMonth,timeGridWeek,timeGridDay', 
               }}
               buttonText={{
                   today:    'Hoje',
                   month:    'Mês',
                   week:     'Semana',
                   day:      'Dia',
                   list:     'Lista'
               }}
               locale="pt-br" // Define o idioma para Português do Brasil
               initialDate={new Date()} 
               navLinks={true} 
               editable={true} 
               selectable={true} 
               dateClick={handleDateClick} 
            />
        </div>
    );
};