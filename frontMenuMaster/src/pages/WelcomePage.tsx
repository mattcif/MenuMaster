import { Container } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React from 'react';
import { ScrollableCardList } from '../components/scrollable-card-list/ScrollableCardList';
import Calendar from '../components/calendar/Calendar';
import ShoppingListIntervalBtn from '../components/shopping-list-interval-btn/ShoppingListIntervalBtn';

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
              <Row className="flex-grow-1" style={{ minHeight: '70vh' }}>
                <Calendar />
              </Row>
              <Row className="mt-3" style={{ minHeight: '20vh' }}>
                <ShoppingListIntervalBtn />
              </Row>
            </Col>
          </Row>
        </section>
      </Container>
    );
  }
}
