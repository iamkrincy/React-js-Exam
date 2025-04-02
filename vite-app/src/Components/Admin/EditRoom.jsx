import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRoomById, editRoomAsync } from "../../Service/Actions/roomActions";
import { Form, Button, Spinner, Alert } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import uploadImage from "../../Service/ImageUpload";

const EditRoom = () => {
  const { roomId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentRoom, loading, error } = useSelector((state) => state.roomReducer);

  const [roomData, setRoomData] = useState({
    name: "",
    type: "",
    price: "",
    description: "",
    image: "",
  });

  const [uploading, setUploading] = useState(false);

  // Room Types
  const roomTypes = [
    "Standard Room", "Deluxe Room", "Suite Room", "Executive Room", "Family Suite",
    "Ocean View Room", "Mountain View Room", "Luxury Villa", "Business Suite"
  ];

  // Fetch Room Data
  useEffect(() => {
    console.log("Fetching room with ID:", roomId); // Debugging
    dispatch(fetchRoomById(roomId));
  }, [dispatch, roomId]);

  // Update State When Room Data is Available
  useEffect(() => {
    console.log("Current Room Data:", currentRoom); // Debugging
    if (currentRoom) {
      setRoomData({
        name: currentRoom.name || "",
        type: currentRoom.type || "",
        price: currentRoom.price || "",
        image: currentRoom.image || "",
      });
    }
  }, [currentRoom]);

  // Handle Input Change
  const handleChange = (e) => {
    setRoomData({ ...roomData, [e.target.name]: e.target.value });
  };

  // Handle Image Upload
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

  // Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editRoomAsync({ roomId, updatedData: roomData }));
    navigate("/admin-dashboard"); // Redirect after update
  };

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Form onSubmit={handleSubmit} className="shadow-lg p-4 rounded">
      <h3>Edit Room</h3>

      <Form.Group>
        <Form.Label>Room Name</Form.Label>
        <Form.Control type="text" name="name" value={roomData.name} onChange={handleChange} />
      </Form.Group>

      <Form.Group>
        <Form.Label>Room Type</Form.Label>
        <Form.Select name="type" value={roomData.type} onChange={handleChange}>
          <option value="">Select Room Type</option>
          {roomTypes.map((type, index) => (
            <option key={index} value={type}>{type}</option>
          ))}
        </Form.Select>
      </Form.Group>

      <Form.Group>
        <Form.Label>Price</Form.Label>
        <Form.Control type="number" name="price" value={roomData.price} onChange={handleChange} />
      </Form.Group>

      <Form.Group>
        <Form.Label>Room Image</Form.Label>
        <Form.Control type="file" accept="image/*" onChange={handleImageUpload} />
      </Form.Group>

      <Button type="submit" variant="success">Update Room</Button>
    </Form>
  );
};

export default EditRoom;
