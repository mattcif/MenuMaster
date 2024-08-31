import React, { useState } from 'react';
import DatePicker, { DateObject } from 'react-multi-date-picker';
import './mini-calendar.css'; // Inclua o arquivo CSS para estilização

interface MiniCalendarProps {
  onDateSelect: (date: Date) => void;
  recipeName: string;
  closeCalendar(): void
}

export const MiniCalendar: React.FC<MiniCalendarProps> = ({ onDateSelect, recipeName, closeCalendar }) => {
  const [selectedDates, setSelectedDates] = useState<DateObject[]>([]);
  const [isMultiSelect, setIsMultiSelect] = useState(false);
  const [quantity, setQuantity] = useState(1);


  const handleSaveDateClick = () => {

  }

  const handleCancelDateClick = () => {

  }

  const handleDateChange = (dates: DateObject[]) => {
    setSelectedDates(dates);

    if (!isMultiSelect && dates.length > 0) {
      onDateSelect(dates[0].toDate());
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(e.target.value));
  };

  return (
    <div className="mini-calendar-container">
      <div className="calendar-header">
        <h2>{recipeName}</h2>
      </div>
      <div className="toolbar">
        <div className="toolbar-item">
          <label>
            Quantity:
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={handleQuantityChange}
              className="quantity-input"
            />
          </label>
        </div>
        <div className="toolbar-item">
          <input
            type="checkbox"
            id="multi-select"
            checked={isMultiSelect}
            onChange={() => setIsMultiSelect(!isMultiSelect)}
            className="multi-select-checkbox"
          />
          <label htmlFor="multi-select">Multi Select</label>
        </div>
      </div>
      <DatePicker
        multiple={isMultiSelect} // Permite a seleção múltipla se o checkbox estiver marcado
        value={selectedDates}
        onChange={handleDateChange}
        mapDays={({ date }) => {
          const isSelected = selectedDates.some(
            (d) => d.toDate().toDateString() === date.toDate().toDateString()
          );
          return isSelected
            ? {
                style: { backgroundColor: 'red', color: 'white', borderRadius: '50%' },
              }
            : {};
        }}
        format="DD/MM/YYYY"
        weekDays={["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"]}
        months={["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]}
      />
      <div className="card-buttons-mini-calendar">
        <button className="save-btn" onClick={handleSaveDateClick}>
            Salvar Data
        </button>
        <button className="cancel-btn" onClick={closeCalendar}>
            Cancelar
        </button>
      </div>
    </div>
  );
};

export default MiniCalendar;
