import { useState } from "react";
import { useDispatch } from "react-redux";
import { addRoomAsync } from "../../Service/Actions/roomActions";
import { Form, Button, Spinner, Card, Container, Row, Col } from "react-bootstrap";
import uploadImage from "../../Service/ImageUpload";
import { useNavigate } from "react-router";

const AddRoomForm = () => {
  const [roomData, setRoomData] = useState({
    name: "",
    type: "",
    price: "",
    description: "",
    image: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [uploading, setUploading] = useState(false);
  const dispatch = useDispatch();

  // Room Types
  const roomTypes = [
    "Standard Room", "Deluxe Room", "Suite Room", "Executive Room", "Family Suite",
    "Ocean View Room", "Mountain View Room", "Luxury Villa", "Business Suite"
  ];

  // Input Change Handler
  const handleChange = (e) => {
    setRoomData({ ...roomData, [e.target.name]: e.target.value });
  };

  // Image Upload Handler
  const handleImageUpload = async (e) => {
    let file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      let imageUrl = await uploadImage(file);
      setRoomData({ ...roomData, image: imageUrl });
    } catch (error) {
      console.error("Image Upload Failed", error);
    }
    setUploading(false);
  };

  // Validation
  const validate = () => {
    let newErrors = {};
    if (!roomData.name) newErrors.name = "Room Name is required";
    if (!roomData.type) newErrors.type = "Room Type is required";
    if (!roomData.price || roomData.price <= 0) newErrors.price = "Valid price is required";
    if (!roomData.image) newErrors.image = "Image is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      dispatch(addRoomAsync(roomData));
      setRoomData({ name: "", type: "", price: "", description: "", image: "" });
      navigate("/admin-dashboard");
    }
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow-lg p-4">
            <Card.Body>
              <h3 className="text-center mb-4">Add New Room</h3>
              <Form onSubmit={handleSubmit}>

                {/* Room Name */}
                <Form.Group className="mb-3">
                  <Form.Label>Room Name</Form.Label>
                  <Form.Control type="text" name="name" value={roomData.name} onChange={handleChange} isInvalid={!!errors.name} />
                  <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                </Form.Group>

                {/* Room Type */}
                <Form.Group className="mb-3">
                  <Form.Label>Room Type</Form.Label>
                  <Form.Select name="type" value={roomData.type} onChange={handleChange} isInvalid={!!errors.type}>
                    <option value="">Select Room Type</option>
                    {roomTypes.map((type, index) => (
                      <option key={index} value={type}>{type}</option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">{errors.type}</Form.Control.Feedback>
                </Form.Group>

                {/* Price */}
                <Form.Group className="mb-3">
                  <Form.Label>Price</Form.Label>
                  <Form.Control type="number" name="price" value={roomData.price} onChange={handleChange} isInvalid={!!errors.price} />
                  <Form.Control.Feedback type="invalid">{errors.price}</Form.Control.Feedback>
                </Form.Group>

                {/* Image Upload */}
                <Form.Group className="mb-3">
                  <Form.Label>Room Image</Form.Label>
                  <Form.Control type="file" accept="image/*" onChange={handleImageUpload} isInvalid={!!errors.image} />
                  <Form.Control.Feedback type="invalid">{errors.image}</Form.Control.Feedback>
                </Form.Group>

                {/* Display Image Preview */}
                {roomData.image && (
                  <div className="text-center">
                    <img src={roomData.image} alt="Room" className="img-fluid rounded" style={{ maxWidth: "100%", maxHeight: "200px", objectFit: "cover" }} />
                  </div>
                )}

                {/* Submit Button */}
                <div className="text-center">
                  <Button type="submit" variant="primary" className="mt-3 w-100">Add Room</Button>
                </div>

              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AddRoomForm;
