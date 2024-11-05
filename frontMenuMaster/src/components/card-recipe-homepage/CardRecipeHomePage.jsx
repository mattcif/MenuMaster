import React from 'react'
import { Button, Container, Card, Tooltip, OverlayTrigger } from 'react-bootstrap'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import { BsCalendar2Date } from "react-icons/bs";
import './cardRecipeHomePage.css'


const CardRecipeHomePage = () => {
    return (
        <div className='card-container'>
            <Card className='my-3 p-3 shadow card-recipe' style={{ backgroundColor: '#f8f9fa', width: '600px', minHeight: '200px' }}>
                <Container className='cardContainer'>
                    <Row className='justify-content-md-center align-items-center flex-nowrap'>
                        <Col xs='auto' className='recipe-image'>
                            <Image src='/images/xlombada.jpg' style={{ width: '250px', height: 'auto' }} rounded></Image>
                        </Col>

                        <Col xs='auto' md={5} className='recipe-title' style={{ maxWidth: '150px', flex: '1' }}>
                            <OverlayTrigger
                                placement="top"
                                overlay={<Tooltip id="recipe-title-tooltip">Lanche com tudo que existe no planeta </Tooltip>}
                            >
                                <p className='truncate'>Lanche com tudo que existe no planeta </p>

                            </OverlayTrigger>

                        </Col>

                        <Col xs='auto' className='card-buttons'>
                            <Row>
                                <Button style={{ width: '200px' }} variant='dark' className='mb-2 button align-items-center d-flex' >
                                    Choose date  <BsCalendar2Date style={{ marginLeft: '8px' }}/>
                                </Button>
                            </Row>
                            <Row>
                                <Button style={{ width: '200px' }} variant='info' className='button'>Details</Button>

                            </Row>
                        </Col>
                    </Row>
                </Container>
            </Card>

        </div>
    )
}

export default CardRecipeHomePage