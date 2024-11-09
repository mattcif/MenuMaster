import React, { useState } from 'react'
import { Button, Container, Card, Tooltip, OverlayTrigger } from 'react-bootstrap'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import { BsCalendar2Date } from "react-icons/bs";
import './cardRecipeHomePage.css'
import { useNavigate } from 'react-router-dom'
import MiniCalendar from '../calendar-mini/MiniCalendar'

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
        setIsCalendarVisible(false);
    }

    const handleDetailClick = () => {
        navigate(`/recipe/${id}`)
    }



    return (
        <div className='card-container '>
            <Card className='my-3 p-3 shadow card-recipe' style={{ backgroundColor: '#f8f9fa', width: '700px', maxWidth: '1000px', height: '250px', overflow: 'hidden', marginBottom: '16px' }}>
                <Container fluid className='card-container justify-content-center align-items-center'>
                    <Row className='justify-content-md-center align-items-center flex-nowrap'>

                        <Col sm={5} xs='auto' className='recipe-image'>
                            <Image src={image} rounded style={{ width: '250px', height:'120px', maxWidth: '250px',  objectFit: 'cover', }}></Image>
                        </Col>

                        <Col sm xs='auto' md={5} className='recipe-title' style={{  maxWidth: '150px', width: '126px', flex: '1' }}>
                            <OverlayTrigger
                                placement="top"
                                overlay={<Tooltip id="recipe-title-tooltip">{name}</Tooltip>}
                            >
                                <p className='truncate'>{name}</p>

                            </OverlayTrigger>

                        </Col>

                        <Col sm xs='auto' className='card-buttons'>
                            <Row>
                                <Button
                                    style={{ width: '200px' }}
                                    variant='dark'
                                    className='mb-2 button align-items-center d-flex'
                                    onClick={handleChooseDateClick}
                                >
                                    Choose date  <BsCalendar2Date style={{ marginLeft: '8px' }} />
                                </Button>
                            </Row>
                            <Row>
                                <Button
                                    style={{ width: '200px' }}
                                    variant='info'
                                    className='button'
                                    onClick={handleDetailClick}
                                >Details</Button>

                            </Row>
                        </Col>
                    </Row>
                    {isCalendarVisible && (
                        <div className="calendar-container">
                            <MiniCalendar
                                closeCalendar={handleChooseDateClick}
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