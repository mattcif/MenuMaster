import React, { useState } from 'react'
import { Button, Container, Card, Tooltip, OverlayTrigger } from 'react-bootstrap'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import { BsCalendar2Date } from "react-icons/bs";
import { useNavigate } from 'react-router-dom'
import MiniCalendar from '../calendar-mini/MiniCalendar'
import styles from './cardRecipeHomePage.module.css'

interface CardRecipeProps {
    id: string;
    name: string;
    image?: string
}

const CardRecipeHomePage: React.FC<CardRecipeProps> = ({ id, name, image }) => {
    const navigate = useNavigate();
    const [isCalendarVisible, setIsCalendarVisible] = useState(false);

    const handleChooseDateClick = () => {
        setIsCalendarVisible(prev => !prev);
    }

    const handleDateSelect = (date: Date) => {
        console.log(date);
    }

    const handleCalendarClose = () => {
        setIsCalendarVisible(false);
    }

    const handleDetailClick = () => {
        navigate(`/recipe/${id}`)
    }

    return (
        <div className={styles.cardContainer}>
            <Card className={`my-3 p-3 shadow ${styles.cardRecipe}`}>
                <Container className={`${styles.cardContainer} justify-content-center align-items-center`}>
                    <Row className='justify-content-md-center align-items-center flex-nowrap'>

                        <Col sm={5} xs='auto' className={styles.recipeImage}>
                            <Image src={image} rounded style={{ width: '250px', height: '120px', maxWidth: '250px', objectFit: 'cover' }}></Image>
                        </Col>

                        <Col sm xs='auto' md={5} className={styles.recipeTitle}>
                            <OverlayTrigger
                                placement="top"
                                overlay={<Tooltip id="recipe-title-tooltip">{name}</Tooltip>}
                            >
                                <p className={styles.truncate}>{name}</p>
                            </OverlayTrigger>
                        </Col>

                        <Col sm xs='auto' className={styles.cardButtons}>
                            <Row>
                                <Button
                                    variant='dark'
                                    className={`mb-2 ${styles.button} align-items-center d-flex`}
                                    onClick={handleChooseDateClick}
                                >
                                    Choose date  <BsCalendar2Date style={{ marginLeft: '8px' }} />
                                </Button>
                            </Row>
                            <Row>
                                <Button
                                    variant='info'
                                    className={styles.button}
                                    onClick={handleDetailClick}
                                >Details</Button>
                            </Row>
                        </Col>
                    </Row>
                    {isCalendarVisible && (
                        <div className={styles.calendarContainer}>
                            <MiniCalendar
                                closeCalendar={handleCalendarClose}
                                onDateSelect={handleDateSelect}
                                recipeName={name}
                                recipeId={id} />
                        </div>
                    )}
                </Container>
            </Card>
        </div>
    )
}

export default CardRecipeHomePage
