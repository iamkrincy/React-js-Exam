import React from "react";
import { Card, Container, Row, Col, ListGroup } from "react-bootstrap";

const RoomDetails = ({ room }) => {
  if (!room) {
    return (
      <Container className="mt-4">
        <h4 className="text-center text-muted">Please select a room to view details</h4>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-3">{room.name}</h2>
      <Card className="shadow-lg">
        <Row className="g-0">
          {/* Left Side - Room Image */}
          <Col md={6}>
            <Card.Img
              variant="top"
              src={room.image || "https://via.placeholder.com/400"}
              alt={room.name}
              className="img-fluid rounded"
            />
          </Col>

          {/* Right Side - Room Details */}
          <Col md={6}>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <strong>Type:</strong> {room.type}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Price:</strong> ${room.price} / night
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Availability:</strong>{" "}
                  <span className={room.isAvailable ? "text-success" : "text-danger"}>
                    {room.isAvailable ? "Available" : "Booked"}
                  </span>
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Features:</strong> {room.features ? room.features.join(", ") : "No extra features"}
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default RoomDetails;
