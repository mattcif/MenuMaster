import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { EventInput } from '@fullcalendar/core';
import { useRecipeCalendarData } from '../../hooks/useRecipeCalendarData';

interface RecipeEvent extends EventInput {
  title: string;
  start: string; // Format: YYYY-MM-DD
  extendedProps: {
    quantity: number;
  };
}

const Calendar: React.FC = () => {
  const { data, isLoading, error } = useRecipeCalendarData();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  console.log('Data received:', data);

  const events: RecipeEvent[] = data?.flatMap(recipe => 
    recipe.dates.map(date => ({
      title: recipe.name || 'No name', 
      start: date,
      extendedProps: {
        quantity: recipe.quantity
      }
    }))
  ) || [];

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
      slotEventOverlap={false}
      height={600}
    />
  );
};

export default Calendar;