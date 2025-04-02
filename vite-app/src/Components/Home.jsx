import React from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { FaWifi } from "react-icons/fa";
import { FaPersonSwimming } from "react-icons/fa6";
import { Ri24HoursFill } from "react-icons/ri";

const Home = () => {
  return (
    <Container fluid className="p-0">
      {/* Hero Section */}
      <div className="hero-section" style={{
        position: "relative",
        backgroundImage: "url(https://media.istockphoto.com/id/503016934/photo/entrance-of-luxury-hotel.jpg?s=612x612&w=0&k=20&c=DXFzucB2xWGf3PI6_yjhLKDvrFcGlOpOjXh6KDI8rqU=)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "800px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        textAlign: "center"
      }}>
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)"
        }}></div>
        <div style={{ position: "relative", zIndex: 1 }}>
          <h1>Welcome to Our Luxury Hotel</h1>
          <p>Experience the best hospitality with world-class amenities</p>
          <Button variant="dark" href="/rooms">View Rooms</Button>
        </div>
      </div>

      {/* Features Section */}
      <hr />
      <Container className="my-5">
        <h2 className="text-center mb-4">Our Facilities</h2>
        <Row>
          <Col md={4} className="text-center">
            <i className="fas fa-wifi fa-3x"></i>
            <h4>Free WiFi <FaWifi />
            </h4>
            <p>Stay connected with high-speed internet</p>
          </Col>
          <Col md={4} className="text-center">
            <i className="fas fa-swimming-pool fa-3x"></i>
            <h4>Swimming Pool <FaPersonSwimming />
            </h4>
            <p>Relax and enjoy in our luxury pool</p>
          </Col>
          <Col md={4} className="text-center">
            <i className="fas fa-concierge-bell fa-3x"></i>
            <h4>24/7 Room Service <Ri24HoursFill />
            </h4>
            <p>Enjoy delicious meals anytime, anywhere</p>
          </Col>
        </Row>
      </Container>

     

      {/* Hotel Images Section */}
      <Container className="my-5">
        <h2 className="text-center mb-4">Our Beautiful Hotel</h2>
        <Row>
          <Col md={6} className="mb-4">
            <Card>
              <Card.Img variant="top" src="https://live.staticflickr.com/3261/2797110030_53391833ec_b.jpg" />
              <Card.Body>
                <Card.Title>Grand Lobby</Card.Title>
                <Card.Text>Experience a majestic welcome with our luxurious grand lobby.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} className="mb-4">
            <Card>
              <Card.Img variant="top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBD62_RYy_2zK9CVN2gkcBuArQzcV4aktAtA&s" />
              <Card.Body>
                <Card.Title>Infinity Pool</Card.Title>
                <Card.Text>Relax and unwind at our infinity pool with a stunning view.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md={6} className="mb-4">
            <Card>
              <Card.Img variant="top" src="https://www.hotelieracademy.org/wp-content/uploads/2017/03/Restaurant-Bar-Design-Awards-Top-Europe-Restaurants-5.jpg" />
              <Card.Body>
                <Card.Title>Fine Dining</Card.Title>
                <Card.Text>Savor world-class cuisines prepared by top chefs.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} className="mb-4">
            <Card>
              <Card.Img variant="top" src="https://www.maxim.com/wp-content/uploads/2021/05/royal-suite1-scaled.jpg" />
              <Card.Body>
                <Card.Title>Luxury Suites</Card.Title>
                <Card.Text>Indulge in ultimate comfort in our elegantly designed suites.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <footer className="bg-dark text-light text-center py-3">
        <Container>
          <p>&copy; 2025 Luxury Hotel. All rights reserved.</p>
        </Container>
      </footer>
      
    </Container>

    
  );
};

export default Home;