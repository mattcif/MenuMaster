import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { EventInput } from '@fullcalendar/core';

interface RecipeEvent extends EventInput {
  title: string;
  start: string; // Format: YYYY-MM-DD
  extendedProps: {
    quantity: number;
  };
}

const Calendar = () => {
  // Exemplo de eventos (receitas)
  const events: RecipeEvent[] = [
    { title: 'Receita 1', start: '2024-08-25', extendedProps: { quantity: 3 } },
    { title: 'Receita 2', start: '2024-08-25', extendedProps: { quantity: 2 } },
    { title: 'Receita 3', start: '2024-08-26', extendedProps: { quantity: 1 } },
    // Adicione mais eventos conforme necessário
  ];

  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      events={events}
      headerToolbar={{
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,dayGridWeek,dayGridDay',
      }}
      eventContent={(eventInfo) => (
        <div>
          <b>{eventInfo.event.extendedProps.quantity}x {eventInfo.event.title}</b>
        </div>
      )}
      // Habilita o ajuste automático para evitar sobreposição
      slotEventOverlap={false}
      height={600}
    />
  );
};

export default Calendar;
