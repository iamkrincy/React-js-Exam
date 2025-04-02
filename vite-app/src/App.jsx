import { Route, Routes } from "react-router-dom";
import NavigationBar from "./Components/Navbar";
import Login from "./Components/Login";
import Register from "./Components/Register";
import RoomList from "./Components/RoomList";
import RoomDetails from "./Components/RoomDetails";
import ReservationForm from "./Components/ReservationForm";
import ReservationList from "./Components/ReservationList";
import Home from "./Components/Home";
import AdminDashboard from "./Components/Admin/AdminDashboard"; // Add this
import AdminRoute from "./Components/Admin/AdminRoute";
import AddRoomForm from "./Components/Admin/AddRoom";
import EditRoom from "./Components/Admin/EditRoom";


function App() {
  return (
    <>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/rooms" element={<RoomList />} />
        <Route path="/rooms/:id" element={<RoomDetails />} />
        <Route path="/reservations" element={<ReservationList />} />
        <Route path="/book-room" element={<ReservationForm />} />
        <Route path="/admin-dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        <Route path="/add-room" element={<AddRoomForm />} />
        <Route path="/edit-room/:roomId" element={<EditRoom />} />
        </Routes>
    </>
  );
}

export default App;
