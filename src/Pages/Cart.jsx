import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  clearCart,
  incrementQuantity,
  decrementQuantity,
} from "../Store/Slice/CartSlice";
import {
  Container,
  Row,
  Col,
  Table,
  Button,
  Card,
  Badge,
  Form,
  Alert,
} from "react-bootstrap";
import { useOutletContext, useNavigate, NavLink } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const { darkMode } = useOutletContext();
  const navigate = useNavigate();

  const [coupon, setCoupon] = useState("");
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [couponMessage, setCouponMessage] = useState("");
  const [couponVariant, setCouponVariant] = useState("danger");

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shipping = cartItems[0] ? 50 : 0;
  const tax = subtotal * 0.18;
  const baseDiscount = subtotal > 100 ? 20 : 0;
  const totalDiscount = baseDiscount + couponDiscount;
  const orderTotal = subtotal + shipping + tax - totalDiscount;
  const totalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const themeClasses = darkMode
    ? "bg-dark text-light border border-secondary shadow-lg rounded-4"
    : "bg-light text-dark border border-warning shadow rounded-4";

  const tableClasses = darkMode
    ? "table-dark table-striped"
    : "table-light table-hover";

  const handleApplyCoupon = () => {
    const code = coupon.trim().toUpperCase();
    if (code === "SAVE10") {
      setCouponDiscount(10);
      setCouponMessage(" 🎉 Coupon applied! ₹10 off");
      setCouponVariant("success");
    } else if (code === "SAVE20") {
      setCouponDiscount(20);
      setCouponMessage(" 🎉 Coupon applied! ₹20 off");
      setCouponVariant("success");
    } else if (code === "NEWUSER10") {
      setCouponDiscount(10);
      setCouponMessage(" 👋 Welcome! NEWUSER10 applied. ₹10 off");
      setCouponVariant("success");
    } else {
      setCouponDiscount(0);
      setCouponMessage(" ❌ Invalid coupon code");
      setCouponVariant("danger");
    }

    setTimeout(() => {
      setCouponMessage("");
    }, 2000);
  };

  return (
    <Container
      fluid
      className={`py-5 min-vh-100 d-flex justify-content-center ${
        darkMode ? "bg-dark" : "bg-light"
      }`}
    >
      <Row
        className="w-100 g-4"
        style={{ maxWidth: "1200px" }}
      >
        {/* Cart Items */}
        <Col md={8}>
          <Card className={themeClasses + " p-3 h-100"}>
            <h3 className="mb-3 text-primary">
              🛒 My Cart <Badge bg="success">{totalCount}</Badge>
            </h3>

            {!cartItems[0] ? (
              <div className="text-center py-4">
                <p className="text-muted fst-italic">Your cart is empty.</p>
                <NavLink to="/" className="btn btn-primary">
                  Shop Now
                </NavLink>
              </div>
            ) : (
              <>
                <Table bordered responsive className={tableClasses}>
                  <thead className="table-secondary">
                    <tr>
                      <th>Product</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Total</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => (
                      <tr key={item.id}>
                        <td className="d-flex align-items-center">
                          <img
                            src={item.thumbnail}
                            alt={item.title}
                            style={{
                              width: "60px",
                              height: "60px",
                              objectFit: "contain",
                              marginRight: "10px",
                              borderRadius: "8px",
                              border: darkMode
                                ? "1px solid #fff"
                                : "1px solid #ddd",
                            }}
                          />
                          <span className="fw-semibold">{item.title}</span>
                        </td>
                        <td>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => dispatch(decrementQuantity(item.id))}
                            disabled={item.quantity === 1}
                            className="me-1"
                          >
                            -
                          </Button>
                          <span className="mx-2 fw-bold">{item.quantity}</span>
                          <Button
                            variant="outline-success"
                            size="sm"
                            onClick={() => dispatch(incrementQuantity(item.id))}
                            className="ms-1"
                          >
                            +
                          </Button>
                        </td>
                        <td className="text-warning fw-bold">₹{item.price}</td>
                        <td className="text-info fw-bold">
                          ₹{(item.price * item.quantity).toFixed(2)}
                        </td>
                        <td>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => dispatch(removeFromCart(item.id))}
                          >
                            Remove
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>

                <div className="mt-2">
                  <Button
                    variant={darkMode ? "outline-light" : "outline-danger"}
                    onClick={() => dispatch(clearCart())}
                  >
                    Clear Cart
                  </Button>
                </div>
              </>
            )}
          </Card>
        </Col>

        {/* Order Summary */}
        <Col md={4}>
          <Card className={themeClasses + " p-3 h-100"}>
            <Card.Body>
              <h4
                className={
                  darkMode ? "text-warning fw-bold" : "text-primary fw-bold"
                }
              >
                📦 Order Summary
              </h4>
              <hr className={darkMode ? "border-light" : "border-dark"} />

              {!cartItems[0] ? (
                <p className="text-muted fst-italic">Your cart is empty.</p>
              ) : (
                <>
                  {/* Coupon */}
                  <Card className={themeClasses + " p-2 mb-3"}>
                    <Form className="d-flex">
                      <Form.Control
                        type="text"
                        placeholder="Enter coupon code"
                        value={coupon}
                        onChange={(e) => setCoupon(e.target.value)}
                        className="me-2"
                      />
                      <Button
                        variant={
                          darkMode ? "outline-light" : "outline-success"
                        }
                        onClick={handleApplyCoupon}
                      >
                        Apply
                      </Button>
                    </Form>

                    {couponMessage && (
                      <Alert
                        variant={couponVariant}
                        className="mt-2 py-2 mb-0 text-center"
                      >
                        {couponMessage}
                      </Alert>
                    )}
                  </Card>

                  {/* Price Details */}
                  <p>
                    Total items: <Badge bg="secondary">{totalCount}</Badge>
                  </p>
                  <p>
                    Subtotal:{" "}
                    <span className="text-success">
                      ₹{subtotal.toFixed(2)}
                    </span>
                  </p>
                  <p>
                    Shipping:{" "}
                    <span className="text-info">₹{shipping.toFixed(2)}</span>
                  </p>
                  <p>
                    Tax (18%):{" "}
                    <span className="text-danger">₹{tax.toFixed(2)}</span>
                  </p>

                  {baseDiscount > 0 && (
                    <p>
                      Base Discount:{" "}
                      <span className="text-warning">-₹{baseDiscount}</span>{" "}
                      <span className="text-muted">
                        ({((baseDiscount / subtotal) * 100).toFixed(0)}% off)
                      </span>
                    </p>
                  )}

                  {couponDiscount > 0 && (
                    <p>
                      Coupon ({coupon.toUpperCase()}):{" "}
                      <span className="text-warning">-₹{couponDiscount}</span>{" "}
                      <span className="text-muted">
                        ({((couponDiscount / subtotal) * 100).toFixed(0)}% off)
                      </span>
                    </p>
                  )}

                  <hr className={darkMode ? "border-light" : "border-dark"} />
                  <h5 className="fw-bold text-success">
                    Grand Total: ₹{orderTotal.toFixed(2)}
                  </h5>

                  {/* Buttons */}
                  <Button
                    className="mt-3 w-100"
                    variant="primary"
                    onClick={() => navigate("/checkout")}
                  >
                    Proceed to Checkout
                  </Button>

                  <Button
                    className="mt-2 w-100"
                    variant="success"
                    onClick={() => navigate("/products")}
                  >
                    Continue Shopping
                  </Button>
                </>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Cart;
