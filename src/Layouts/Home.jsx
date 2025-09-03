import React from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Container, Button, Row, Col } from "react-bootstrap";

const Home = () => {
  const navigate = useNavigate();
  const { darkMode } = useOutletContext();

  return (
    <div
      className={`d-flex align-items-center justify-content-center text-center min-vh-100 ${
        darkMode ? "bg-dark text-light" : "bg-light text-dark"
      }`}
    >
    
      <Container>
        <Row className="justify-content-center">
          <Col lg={10}>
            <h1
              className="display-3 fw-bold mb-4"
              style={{
                color: darkMode ? "white" : "black",
                textShadow: "2px 2px 6px rgba(0,0,0,0.3)",
              }}
            >
              Welcome to INDITRONICS
            </h1>

            <p
              className="fs-4 mb-5"
              style={{
                color: darkMode ? "#ddd" : "black",
                maxWidth: "700px",
                margin: "0 auto",
              }}
            >
              Shop the latest trends with amazing offers and exclusive discounts.
              Discover gadgets, accessories, and more — all in one place!
            </p>

            <img
              src="https://cdn-icons-png.flaticon.com/512/3081/3081559.png"
              alt="Shopping"
              className="img-fluid mb-5"
              style={{ maxHeight: "250px" }}
            />

            <Button
              size="lg"
              variant={darkMode ? "light" : "dark"}
              onClick={() => navigate("/products")}
            >
              Start Shopping
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
