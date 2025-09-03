import { useState } from "react";
import { useSelector } from "react-redux";
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap";
import { useNavigate, useOutletContext } from "react-router-dom";

const Checkout = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const navigate = useNavigate();
  const { darkMode } = useOutletContext(); // ✅ Theme context

  const themeClasses = darkMode
    ? "bg-dark text-light border border-secondary"
    : "bg-light text-dark";

  const handleOrder = (e) => {
    e.preventDefault();
    setOrderPlaced(true); // ✅ Success message show karne ke liye
  };

  return (
    <div
      className={`min-vh-100 d-flex flex-column ${
        darkMode ? "bg-dark text-light" : "bg-light text-dark"
      }`}
    >
      <Container className="py-5 flex-grow-1">
        <Row>
          {/* Left Side: Billing Form */}
          <Col md={7}>
            <Card className={`p-4 shadow-sm mb-4 ${themeClasses}`}>
              <h3>Billing Details</h3>

              {!orderPlaced ? (
                <Form onSubmit={handleOrder}>
                  <Form.Group className="mb-3">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your name"
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter your email"
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your address"
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Payment Method</Form.Label>
                    <Form.Select required>
                      <option value="">Select...</option>
                      <option>Credit/Debit Card</option>
                      <option>UPI</option>
                      <option>Cash on Delivery</option>
                    </Form.Select>
                  </Form.Group>
                  <Button variant={darkMode ? "light" : "primary"} type="submit">
                    Place Order
                  </Button>
                </Form>
              ) : (
                <>
                  <Alert
                    variant="success"
                    className="fw-bold fs-5 text-center"
                  >
                    ✅ Thank you for your order!
                  </Alert>
                  <div className="text-center mt-3">
                    <Button
                      variant="success"
                      onClick={() => navigate("/products")}
                    >
                      Continue Shopping
                    </Button>
                  </div>
                </>
              )}
            </Card>
          </Col>

          {/* Right Side: Order Summary */}
          <Col md={5}>
            <Card className={`p-4 shadow-sm ${themeClasses}`}>
              <h3>Order Summary</h3>
              <ul className="list-unstyled">
                {cartItems.map((item, index) => (
                  <li
                    key={index}
                    className="d-flex justify-content-between mb-2"
                  >
                    <span>
                      {item.title} (x{item.quantity})
                    </span>
                    <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
              <hr />
              <h5>
                Total: ₹
                {cartItems
                  .reduce((sum, item) => sum + item.price * item.quantity, 0)
                  .toFixed(2)}
              </h5>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Checkout;
