import React, { useEffect, useState } from 'react';
import DatePicker, { DateObject } from 'react-multi-date-picker';
import styles from './miniCalendar.module.css'; 
import { RecipeDate } from '../../interface/RecipeDate';
import { useRecipeCalendarMutate } from '../../hooks/useRecipeCalendarMutate';
import { Button, Form } from 'react-bootstrap';

import { AiOutlineClear } from "react-icons/ai";

interface MiniCalendarProps {
  onDateSelect: (date: Date) => void;
  recipeId: string;
  recipeName: string;
  closeCalendar(): void;
}

export const MiniCalendar: React.FC<MiniCalendarProps> = ({ onDateSelect, recipeId, recipeName, closeCalendar }) => {
  const [selectedDates, setSelectedDates] = useState<DateObject[]>([]);
  const [quantity, setQuantity] = useState(1);
  const { mutate, isSuccess, isPending } = useRecipeCalendarMutate();

  const handleSaveDateClick = () => {
    const formattedDates = selectedDates.map(dateObj =>
      dateObj.toDate().toISOString().split('T')[0]
    );

    const recipeDate: RecipeDate = {
      recipeId,
      dates: formattedDates,
      quantity
    };

    // Salva os dados da receita e só fecha o calendário após sucesso
    mutate(recipeDate);
  };

  useEffect(() => {
    if (isSuccess) {
      // Fechar o calendário apenas após sucesso
      closeCalendar();
    }
  }, [isSuccess, closeCalendar]);

  const handleDateChange = (dates: DateObject[]) => {
    setSelectedDates(dates);
    if (dates.length > 0) {
      onDateSelect(dates[0].toDate()); // Marca a primeira data
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    if (newValue >= 1 && newValue <= 10) {
      setQuantity(newValue);
    }
  };

  const handleClearDates = () => {
    setSelectedDates([]); // Limpa as datas selecionadas
  };

  return (
    <>
      {/* Camada de fundo escurecido */}
      <div className={styles.miniCalendarOverlay} onClick={closeCalendar}></div>

      <div className={styles.miniCalendarContainer}>
        <div className={styles.miniCalendarHeader}>
          <h1>{recipeName}</h1>
        </div>
        <div className={styles.toolbar}>
          <div data-mdb-input-init className={styles.formOutline}>
            <Form.Group className="mb-3" style={{ width: '25vw', height: '5vh', backgroundColor: '#f8f9fa' }}>
              <Form.Floating>
                <Form.Control
                  as="input"
                  type="number"
                  id="typeNumber"
                  min={1}
                  max={10}
                  placeholder="Selecione a quantidade"
                  required
                  value={quantity}
                  onChange={handleQuantityChange}
                />
                <Form.Label htmlFor="typeNumber">Quantidade</Form.Label>
              </Form.Floating>
            </Form.Group>
          </div>
        </div>

        <div className={styles.datepickerContainer}>
          <DatePicker
            multiple={true}
            placeholder="Selecione às Datas"
            value={selectedDates}
            onChange={handleDateChange}
            format="DD/MM/YYYY"
            weekDays={["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"]}
            months={["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]}
          />
          <Button variant="secondary" onClick={handleClearDates} style={{ background: "none", border: "none" }}>
            <AiOutlineClear color="black" size={25} />
          </Button>
        </div>

        <div className={styles.cardButtonsMiniCalendar}>
          <button className={styles.saveBtn} onClick={handleSaveDateClick} disabled={isPending}>
            {isPending ? "Salvando..." : "Salvar Data"}
          </button>
          <button className={styles.cancelBtn} onClick={closeCalendar}>
            Cancelar
          </button>
        </div>
      </div>
    </>
  );
};

export default MiniCalendar;