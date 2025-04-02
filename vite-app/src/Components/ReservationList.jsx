import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReservations, updateReservation, cancelReservation } from "../Service/Actions/reservationActions";
import { Table, Button, Form, Spinner, Alert, InputGroup } from "react-bootstrap";

const ReservationList = () => {
  const dispatch = useDispatch();
  const { reservations = [], loading, error } = useSelector((state) => state.reservationReducer);
  const [editData, setEditData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");

  useEffect(() => {
    dispatch(fetchReservations());
  }, [dispatch]);

  const handleUpdate = (id) => {
    const updatedData = { ...editData, id };
    dispatch(updateReservation(updatedData));
    setEditData(null);
  };

  const handleCancel = (id) => {
    dispatch(cancelReservation(id));
  };

  const filteredReservations = reservations.filter((reservation) =>
    reservation.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedReservations = [...filteredReservations].sort((a, b) => {
    if (sortBy === "checkIn") {
      return new Date(a.checkIn) - new Date(b.checkIn);
    }
    return a[sortBy].localeCompare(b[sortBy]);
  });

  if (loading) return <Spinner animation="border" variant="primary" />;
  if (error) return <Alert variant="danger">Error: {error}</Alert>;

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Reservation List</h2>
      
      <div className="d-flex justify-content-between mb-3">
        <InputGroup className="w-50">
          <Form.Control
            type="text"
            placeholder="Search by Guest Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>

        <Form.Select className="w-25" onChange={(e) => setSortBy(e.target.value)}>
          <option value="name">Sort by Name</option>
          <option value="checkIn">Sort by Check-In Date</option>
          <option value="roomType">Sort by Room Type</option>
        </Form.Select>
      </div>

      {sortedReservations.length === 0 ? (
        <Alert variant="info">No reservations found.</Alert>
      ) : (
        <Table striped bordered hover responsive className="shadow-lg">
          <thead className="bg-dark text-white">
            <tr>
              <th>#</th>
              <th>Guest Name</th>
              <th>Room Type</th>
              <th>Check-In</th>
              <th>Check-Out</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedReservations.map((reservation, index) => (
              <tr key={reservation.id}>
                <td>{index + 1}</td>
                <td>
                  {editData?.id === reservation.id ? (
                    <Form.Control
                      type="text"
                      value={editData.name}
                      onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                    />
                  ) : (
                    reservation.name
                  )}
                </td>
                <td>{reservation.roomType}</td>
                <td>{reservation.checkIn}</td>
                <td>{reservation.checkOut}</td>
                <td>
                  {editData?.id === reservation.id ? (
                    <>
                      <Button variant="success" size="sm" onClick={() => handleUpdate(reservation.id)}>
                        Save
                      </Button>
                      <Button variant="secondary" size="sm" className="ms-2" onClick={() => setEditData(null)}>
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button variant="warning" size="sm" onClick={() => setEditData(reservation)}>
                        Edit
                      </Button>
                      <Button variant="danger" size="sm" className="ms-2" onClick={() => handleCancel(reservation.id)}>
                        Cancel
                      </Button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default ReservationList;
