import React, { useState } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import { useNavigate, useOutletContext } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    dob: "",
    gender: ""
  });

  const navigate = useNavigate();

  const { setIsLoggedIn, setUserData, darkMode } = useOutletContext();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setUserData(formData);
    setIsLoggedIn(true);

    alert("Registration Successful!");
    navigate("/account");
  };

  return (
    <Container className="d-flex justify-content-center mt-5">
      <Card
        style={{ width: "400px" }}
        className={`p-4 shadow ${darkMode ? "bg-dark text-light" : "bg-light text-dark"}`}
      >
        <h3 className="text-center mb-3">Register</h3>

        <Form onSubmit={handleSubmit}>
          
          <Form.Group className="mb-3">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
              className={darkMode ? "bg-secondary text-light" : ""}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              className={darkMode ? "bg-secondary text-light" : ""}
            />
          </Form.Group>

         
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              className={darkMode ? "bg-secondary text-light" : ""}
            />
          </Form.Group>

      
          <Form.Group className="mb-3">
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
              className={darkMode ? "bg-secondary text-light" : ""}
            />
          </Form.Group>

          
          <Form.Group className="mb-3">
            <Form.Label>Gender</Form.Label>
            <Form.Select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className={darkMode ? "bg-secondary text-light" : ""}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </Form.Select>
          </Form.Group>

          <Button type="submit" variant="primary" className="w-100">
            Register
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default Register;
