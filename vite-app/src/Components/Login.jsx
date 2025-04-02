import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Container, Alert } from "react-bootstrap";
import { LoginUserAsync, LoginWithGoogleAsync } from "../Service/Actions/authActions";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const { user, error } = useSelector((state) => state.userReducer);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(LoginUserAsync(formData));
  };

  const handleGoogleLogin = () => {
    dispatch(LoginWithGoogleAsync());
  };

  useEffect(() => {
    if (user) {
      if (user.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/");
      }
    }
  }, [user, navigate]);

  return (
    <Container className="mt-4">
      <h2>Login</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" name="email" onChange={handleChange} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password" onChange={handleChange} required />
        </Form.Group>
        <Button variant="success" type="submit" className="mt-2">Login</Button>
        <Button variant="danger" onClick={handleGoogleLogin} className="mt-2 ms-2">Login with Google</Button>
      </Form>
      <p className="text-center mt-3">
        New to Hotel Management? <Link to="/register" className="text-primary">Create an account</Link>
      </p>
    </Container>
  );
};

export default Login;
