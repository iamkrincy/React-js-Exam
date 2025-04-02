import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { logOutAsync } from "../Service/Actions/authActions";

const NavigationBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
const {user} = useSelector(state => state.userReducer);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(logOutAsync());
      navigate("/login");
    } catch (error) {
      console.error("Logout Error:", error.message);
    }
  };

  return (
    <Navbar bg="light"   expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/">
        <img width={60} src="https://png.pngtree.com/png-clipart/20230925/original/pngtree-1star-hotel-icon-in-cartoon-style-with-splash-effect-vector-png-image_12861575.png" alt="" />
        Hotel RadhaKrishn</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/rooms">Rooms</Nav.Link>
            <Nav.Link as={Link} to="/reservations">Reservations</Nav.Link>
            <Nav.Link as={Link} to="/book-room">Book Room</Nav.Link>
          </Nav>
          <Nav>
            {user ? (
              <>
                <Nav.Link as={Link} to="/profile">👤 {user.displayName || "Profile"}</Nav.Link>
                <Button variant="outline-light" onClick={handleLogout} className="ms-2">
                  🚪 Sign Out
                </Button>
              </>
            ) : (
              <Nav.Link as={Link} to="/login">🔑 Login</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
