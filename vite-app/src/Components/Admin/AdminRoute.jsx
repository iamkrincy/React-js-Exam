import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoute = ({ children }) => {
  const user = useSelector((state) => state.userReducer.user);

  if (!user || user.role !== "admin") {
    return <Navigate to="/login" />;
  }

  return children;
};

export default AdminRoute;
