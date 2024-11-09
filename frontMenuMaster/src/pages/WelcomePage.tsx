import { Container } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React from 'react';
import { ScrollableCardList } from '../components/scrollable-card-list/ScrollableCardList';
import Calendar  from '../components/calendar/Calendar'

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
              <Row>
              <Calendar/>

              </Row>
              <Row>
                Botão para gerar lista de compras
              </Row>
            </Col>
          </Row>
        </section>


      </Container>
    );
  }
}
