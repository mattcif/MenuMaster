import { Container } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React from 'react';
import { ScrollableCardList } from '../components/scrollable-card-list/ScrollableCardList';

interface WelcomeContentProps { }
interface WelcomeContentState { }

export default class WelcomeContent extends React.Component<WelcomeContentProps, WelcomeContentState> {
  render() {
    return (
      <Container fluid>
        <section>
          <Row>
            <Col>
              <ScrollableCardList />

            </Col>
            <Col>
              <h1>Aqui é onde vai ficar o calendário</h1>
            </Col>
          </Row>
        </section>


      </Container>
    );
  }
}
