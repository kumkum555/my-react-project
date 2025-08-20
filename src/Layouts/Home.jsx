import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Button } from "react-bootstrap";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div
      className="d-flex align-items-center justify-content-center text-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #fff0f6, #f8a5c2, #d63384)",
      }}
    >
      <Container>
     
        <h1 className="display-3 fw-bold mb-4" style={{ color: "white", textShadow: "2px 2px 6px rgba(0,0,0,0.3)" }}>
          Welcome to INDITRONICS
        </h1>

       
        <p className="fs-4 mb-5" style={{ color: "white", maxWidth: "700px", margin: "0 auto" }}>
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
          className="px-5 py-3 fw-semibold shadow"
          style={{ backgroundColor: "white", color: "#d63384", border: "none" }}
          onClick={() => navigate("/products")}
        >
          Start Shopping
        </Button>
      </Container>
    </div>
  );
};

export default Home;
