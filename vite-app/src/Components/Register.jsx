import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Form, Container, Alert } from "react-bootstrap";
import { registerUserAsync } from "../Service/Actions/authActions";

 const Register = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const { isCreated, error } = useSelector((state) => state.userReducer);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUserAsync(formData));
  };

  useEffect(() => {
    if (isCreated) {
      navigate("/login");
    }
  }, [isCreated, navigate]);

  return (
    <Container className="mt-4">
      <h2>Register</h2>
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
        <Button variant="primary" type="submit" className="mt-2">Sign Up</Button>
      </Form>
    </Container>
  );
};

export default Register;