import { useState } from "react";
import { Form, Button, Card, Container, Alert } from "react-bootstrap";
import { useNavigate, useOutletContext } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("kumkum@gmail.com");
  const [password, setPassword] = useState("123456");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { setIsLoggedIn, darkMode } = useOutletContext(); 

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === "kumkum@gmail.com" && password === "123456") {
      setError("");
      setIsLoggedIn(true); 
      navigate("/");      
    } else {
      setError("Invalid email or password!");
    }
  };

  const themeClasses = darkMode
    ? "bg-dark text-light border border-secondary"
    : "bg-light text-dark";

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Card
        className={`p-4 shadow rounded ${themeClasses}`}
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <h3 className="text-center mb-3">Login</h3>
        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={darkMode ? "bg-dark text-light" : ""}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={darkMode ? "bg-dark text-light" : ""}
            />
          </Form.Group>

          <Button
            type="submit"
            variant={darkMode ? "light" : "primary"}
            className="w-100"
          >
            Login
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default Login;
