import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { EventInput } from '@fullcalendar/core';
import { useRecipeCalendarData } from '../../hooks/useRecipeCalendarData';
import { useDeleteRecipeCalendar } from '../../hooks/useDeleteRecipeCalendar';
import './calendar.css';

interface RecipeEvent extends EventInput {
  title: string;
  start: string; // Format: YYYY-MM-DD
  extendedProps: {
    quantity: number;
    id: string; // ID do evento no calendário
  };
}

const Calendar: React.FC = () => {
  const { data, isLoading, error } = useRecipeCalendarData();
  const { mutate: deleteRecipeCalendar } = useDeleteRecipeCalendar(); // Usando o hook de exclusão

  const [selectedEventId, setSelectedEventId] = useState<string | null>(null); // Estado para armazenar o evento selecionado

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  console.log('Data received:', data);

  const events: RecipeEvent[] = data?.flatMap(recipe =>
    recipe.dates.map(date => ({
      title: recipe.name || 'No name',
      start: date,
      extendedProps: {
        quantity: recipe.quantity,
        id: recipe.recipeId // Adicionando o ID do evento
      }
    }))
  ) || [];

  const handleDateClick = (info: any) => {
    // Altera a visualização para a visão do dia clicado
    info.view.calendar.changeView('dayGridDay', info.dateStr); // 'dayGridDay' é a visão diária
  };

  const handleEventClick = (eventInfo: any) => {
    // Verifica se o evento clicado é o mesmo que o evento já selecionado
    if (selectedEventId === eventInfo.event.extendedProps.id) {
      // Se for o mesmo, desmarque o evento (remove o ID)
      setSelectedEventId(null);
    } else {
      // Se for diferente, marque o evento (armazene o ID)
      setSelectedEventId(eventInfo.event.extendedProps.id);
    }
  };

  const handleDeleteEvent = () => {
    if (selectedEventId) {
      // Chama o hook de mutação para excluir o evento
      deleteRecipeCalendar(selectedEventId);
      setSelectedEventId(null); // Limpa o evento selecionado após exclusão
    }
  };

  return (
    <div className="full-calendar-container">
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
          <div style={{ position: 'relative' }}>
            <b>{eventInfo.event.extendedProps.quantity}x {eventInfo.event.title}</b>
            {selectedEventId === eventInfo.event.extendedProps.id && (
              <button
                className="delete-btn" // Classe para estilizar o botão
                onClick={(e) => {
                  e.stopPropagation(); // Previne a propagação do clique para o evento
                  handleDeleteEvent(); // Chama a função para excluir o evento
                }}
              >
                Excluir Evento
              </button>
            )}
          </div>
        )}
        slotEventOverlap={false}
        height="100%"
        dateClick={handleDateClick}
        eventClick={handleEventClick} // Adiciona o evento de clique para armazenar o evento clicado
      />
    </div>
  );
};

export default Calendar;
