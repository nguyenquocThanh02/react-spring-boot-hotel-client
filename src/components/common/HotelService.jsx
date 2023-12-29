import {Container, Header} from 'react'
import { Card, Col, Row } from 'react-bootstrap';

function HotelService() {
    return (  
        <Container className="mb-2">
            <Header title={"Our service"}/>

            <Row>
                <h4 className='text-center'>
                    Service at My Hotel
                    <span className="gap-2">
                        24 - Hour Front Desk
                    </span>
                </h4>
            </Row>

            <hr/>

            <Row xs={1} md={2} lg={3} className='g-4 mt-2'>
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title>
                                <i className="fa-solid fa-wifi"></i>Wifi
                            </Card.Title>
                            <Card.Text>Stay connected with high-speed internet access</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default HotelService;