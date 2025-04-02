import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  useLocation } from "react-router";
import { makeReservation } from "../Service/Actions/reservationActions";
import { Button, Container, Form } from "react-bootstrap";

const ReservationForm = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { roomType } = location.state || {};
  const { user } = useSelector
  ((state) => state.userReducer);
  const [reservationData, setReservationData] = useState({
    name: user ? user.name : "",
    email: user ? user.email : "",
    roomType: roomType || "",
    checkIn: "",
    checkOut: "",
  });

  const handleChange = (e) => {
    setReservationData({ ...reservationData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(makeReservation(reservationData));
    alert("Reservation successful!");
  };

  return (
    <Container>
      <h2>Book a Room</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Name:</Form.Label>
          <Form.Control type="text" name="name" value={reservationData.name} onChange={handleChange} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Email:</Form.Label>
          <Form.Control type="email" name="email" value={reservationData.email} onChange={handleChange} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Room Type:</Form.Label>
          <Form.Control as="select" name="roomType" value={reservationData.roomType} onChange={handleChange} required>
            <option value="">Select Room Type</option>
            <option value="Deluxe">Deluxe</option>
            <option value="Suite">Suite</option>
            <option value="Standard">Standard</option>
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Check-in Date:</Form.Label>
          <Form.Control type="date" name="checkIn" onChange={handleChange} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Check-out Date:</Form.Label>
          <Form.Control type="date" name="checkOut" onChange={handleChange} required />
        </Form.Group>
        <Button type="submit" variant="success" className="mt-3">Reserve</Button>
      </Form>
    </Container>
  );
};

export default ReservationForm;