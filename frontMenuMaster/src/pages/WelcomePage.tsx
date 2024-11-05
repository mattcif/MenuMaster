import { Container } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React from 'react';
import CardRecipeHomePage from '../components/card-recipe-homepage/CardRecipeHomePage';
import ScrollableCardList from '../components/scrollable-card-list/ScrollableCardList';

interface WelcomeContentProps {}
interface WelcomeContentState {}

export default class WelcomeContent extends React.Component<WelcomeContentProps, WelcomeContentState> {
  render() {
    return (
        <Container>
          <Row>
            <Col> 
              <ScrollableCardList/>
              
            </Col>
          </Row>
        </Container>          
    );
  }
}
