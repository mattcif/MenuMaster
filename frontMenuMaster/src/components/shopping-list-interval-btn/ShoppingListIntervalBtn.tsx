import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import DatePicker, { DateObject } from 'react-multi-date-picker';
import { useShoppingListMutate } from '../../hooks/useShoppingListMutate';
import { ShoppingListToSave } from '../../interface/ShoppingListToSave';
import './shopping-list-interval-btn.css';

interface ShoppingListIntervalBtnProps {
}

export const ShoppingListIntervalBtn: React.FC<ShoppingListIntervalBtnProps> = () => {
    const [isContentVisible, setIsContentVisible] = useState(false);
    const [isSuccessfullyCreated, setIsSuccessfullyCreated] = useState(false);
    const [startDate, setStartDate] = useState<DateObject | null>(null);
    const [endDate, setEndDate] = useState<DateObject | null>(null);
    const { mutate, isSuccess } = useShoppingListMutate();

    const toggleContentVisibility = () => {
        setIsContentVisible(!isContentVisible);
    };

    const handleGenerateShoppingClick = () => {
        if (startDate && endDate) {
            const shoppingListToSave: ShoppingListToSave = {
                startDate: startDate.toDate().toISOString().split('T')[0],
                endDate: endDate.toDate().toISOString().split('T')[0]
            };

            console.log(shoppingListToSave);
            mutate(shoppingListToSave);
        }
    };

    useEffect(() => {
        if (isSuccess) {
            setIsSuccessfullyCreated(true);  // Marca o sucesso de criação da lista
        }
    }, [isSuccess]);

    return (
        <Container fluid className="d-flex flex-column justify-content-center align-items-center">
            {!isContentVisible && (
                <Button size="lg" onClick={toggleContentVisibility}>
                    Gerar Lista de Compras
                </Button>
            )}

            {isContentVisible && (
                <div className="shopping-list-select-interval-container">
                    <button className="close-button" onClick={toggleContentVisibility}>✕</button>
                    <h1 className="mb-4">Selecione o Intervalo para a Lista de Compras</h1>
                    <div className="calendar-pickers-container">
                        <Container fluid>
                            <Row>
                                <Col className="text-start">
                                    <label htmlFor="">Data de Início:</label>
                                </Col>
                                <Col>
                                    <DatePicker
                                        placeholder="Início"
                                        value={startDate}
                                        onChange={(date: DateObject) => setStartDate(date)}
                                        format="DD/MM/YYYY"
                                        weekDays={["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"]}
                                        months={["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]}
                                        className="date-picker"
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col className="text-start">
                                    <label htmlFor="">Data de Fim:</label>
                                </Col>
                                <Col>
                                    <DatePicker
                                        placeholder="Fim"
                                        value={endDate}
                                        onChange={(date: DateObject) => setEndDate(date)}
                                        format="DD/MM/YYYY"
                                        weekDays={["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"]}
                                        months={["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]}
                                        className="date-picker"
                                    />
                                </Col>
                            </Row>
                        </Container>

                        {!isSuccessfullyCreated && (
                            <Button className="mt-3" onClick={handleGenerateShoppingClick}>
                                Confirmar Intervalo
                            </Button>
                        )}
                        {isSuccessfullyCreated && (
                            <Button className="mt-3" onClick={handleGenerateShoppingClick}>
                                Ver Lista de Compras
                            </Button>
                        )}
                    </div>
                </div>
            )}
        </Container>
    );
};

export default ShoppingListIntervalBtn;
