import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const RoomCard = ({room}) => {
    return (  
        <Col className="mb-4" xs={12}>
            <div className="card" style={{width: '18rem'}}>
                <img src={`data:image/png;base64, ${room.photo}`} className="card-img-top card-img-size" alt="..."/>
                <div className="card-body">
                    <h5 className="card-title">{room.roomType}</h5>
                    <p className="card-text">{room.roomPrice}</p>
                    <Link to={`bookings/${room.id}`} className="btn btn-primary">Book now</Link>
                </div>
            </div>
        </Col>
    );
}

export default RoomCard;