import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRooms } from "../Service/Actions/roomActions";
import RoomDetails from "./RoomDetails";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

const RoomList = () => {
  const dispatch = useDispatch();
  const { rooms } = useSelector((state) => state.roomReducer);
  const [selectedRoom, setSelectedRoom] = useState(null); // State to track selected room

  useEffect(() => {
    dispatch(fetchRooms());
  }, [dispatch]);

  return (
    <Container>
      <Row>
        {/* Left Side - Room List */}
        <Col md={6}>
          <h2>Room List</h2>
          <Row>
            {rooms.length === 0 ? (
              <p>No rooms available.</p>
            ) : (
              rooms.map((room) => (
                <Col md={6} key={room.id} className="mb-4">
                  <Card>
                    <Card.Img variant="top" src={room.image || "https://via.placeholder.com/150"} />
                    <Card.Body>
                      <Card.Title>{room.name}</Card.Title>
                      <Card.Text>Type: {room.type} <br /> Price: ${room.price}</Card.Text>
                      <Button variant="primary" onClick={() => setSelectedRoom(room)}>
                        View Details
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            )}
          </Row>
        </Col>

        {/* Right Side - Room Details */}
        <Col md={6}>
          {selectedRoom ? (
            <RoomDetails room={selectedRoom} />
          ) : (
            <p className="text-muted">Select a room to see details.</p>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default RoomList;
