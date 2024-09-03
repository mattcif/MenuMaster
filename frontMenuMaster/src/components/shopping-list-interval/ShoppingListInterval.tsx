import { useEffect, useState } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import "./shopping-list-interval.css"
import { useShoppingListMutate } from "../../hooks/useShoppingListMutate";
import { ShoppingListToSave } from "../../interface/ShoppingListToSave";

interface ShoppingListIntervalProps {
    onIntervalSelect: (startDate: Date, endDate: Date) => void;
    closeInterval(): void;
  }
  
  export const ShoppingListInterval: React.FC<ShoppingListIntervalProps> = ({ onIntervalSelect, closeInterval }) => {
    const [startDate, setStartDate] = useState<DateObject | null>(null);
    const [endDate, setEndDate] = useState<DateObject | null>(null);
    const {mutate, isSuccess }= useShoppingListMutate()
  
    const handleSaveIntervalClick = () => {
      if (startDate && endDate) {
        const shoppingListToSave: ShoppingListToSave = {
            startDate: startDate.toDate().toISOString().split('T')[0],
            endDate: endDate.toDate().toISOString().split('T')[0]
        };
        
        mutate(shoppingListToSave);
        onIntervalSelect(startDate.toDate(), endDate.toDate());
      }
    };

    useEffect(() => {
        if(isSuccess) {
            closeInterval();
        }
    }, [isSuccess, closeInterval])
  
    return (
      <div className="shopping-list-interval-container">
        <div className="calendar-header">
          <h2>Selecionar Intervalo de Datas</h2>
        </div>
        <div className="calendar-pickers">
          <div className="calendar-item">
            <label>Data de Início:</label>
            <DatePicker
              value={startDate}
              onChange={(date: DateObject) => setStartDate(date)}
              format="DD/MM/YYYY"
              weekDays={["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"]}
              months={["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]}
              className="date-picker"
            />
          </div>
          <div className="calendar-item">
            <label>Data Final:</label>
            <DatePicker
              value={endDate}
              onChange={(date: DateObject) => setEndDate(date)}
              format="DD/MM/YYYY"
              weekDays={["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"]}
              months={["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]}
              className="date-picker"
            />
          </div>
        </div>
        <div className="card-buttons-shopping-interval">
          <button className="save-btn" onClick={handleSaveIntervalClick}>
            Gerar Lista de Compras 
          </button>
          <button className="cancel-btn" onClick={closeInterval}>
            Cancelar
          </button>
        </div>
      </div>
    );
  };

  export default ShoppingListInterval;


