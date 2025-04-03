import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRooms, deleteRoomAsync } from "../../Service/Actions/roomActions";
import { Card, Button, Spinner, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { rooms, loading, error } = useSelector(state => state.roomReducer);

  useEffect(() => {
    dispatch(fetchRooms());
  }, [dispatch]);
  
  return (
    <Container>
      <h2 className="text-center mt-4">Admin Dashboard</h2>
      
      <div className="text-center mb-3">
        <Button variant="dark" onClick={() => navigate("/add-room")}>Add Room</Button>
      </div>
      
      {loading && <Spinner animation="border" />} 
      {error && <p className="text-danger">Error: {error}</p>}
      
      <Row>
        {rooms.map((room) => (
          <Col md={4} key={room.id} className="mb-4">
            <Card>
              <Card.Img variant="top" src={room.image} alt={room.name} />
              <Card.Body>
                <Card.Title>{room.name}</Card.Title>
                <Card.Text>
                  Type: {room.type} <br />
                  Price: ${room.price}
                </Card.Text>
                <Button 
                  variant="dark" 
                  className="me-2"
                  onClick={() => navigate(`/edit-room/${room.id}`)}
                >
                  Edit
                </Button>
                <Button 
                  variant="dark" 
                  onClick={() => dispatch(deleteRoomAsync(room.id))}
                >
                  Delete
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default AdminDashboard;