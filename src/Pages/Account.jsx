import React, { useState } from "react";
import { Container, Card, Accordion, Button, Image, Row, Col, Form } from "react-bootstrap";
import { useOutletContext } from "react-router-dom";
import { useSelector } from "react-redux";

const Account = () => {
  const { darkMode, userData, setUserData } = useOutletContext();
  const [editMode, setEditMode] = useState(false);

  const { cartItems } = useSelector((state) => state.cart);

  const themeClasses = darkMode
    ? "bg-dark text-light border border-secondary"
    : "bg-light text-dark";

  if (!userData) {
    return (
      <Container
        className={`p-5 text-center ${
          darkMode ? "bg-dark text-light" : "bg-light text-dark"
        }`}
      >
        <h4>Please Register or Login to see account details</h4>
      </Container>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  return (
    <Container
      fluid
      className={`p-4 min-vh-100 d-flex flex-column align-items-center ${
        darkMode ? "bg-dark" : "bg-light"
      }`}
    >
      
      <Card
        className={`p-4 mb-4 shadow-sm w-100`}
        style={{ maxWidth: "900px" }}
      >
        <Row className="align-items-center">
          <Col xs="auto">
            <Image
              src={
                userData.profilePic ||
                "https://static.vecteezy.com/system/resources/previews/002/002/257/non_2x/beautiful-woman-avatar-character-icon-free-vector.jpg"
              }
              roundedCircle
              width="100"
              height="100"
            />
          </Col>
          <Col>
            {editMode ? (
              <>
                <Form.Group className="mb-2">
                  <Form.Label>✏️ Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={userData.name}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>📧 Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={userData.email}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>📍 Location</Form.Label>
                  <Form.Control
                    type="text"
                    name="location"
                    value={userData.location || ""}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>📦 Address</Form.Label>
                  <Form.Control
                    type="text"
                    name="address"
                    value={userData.address || ""}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>🔒 Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={userData.password || ""}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </>
            ) : (
              <>
                <h4>{userData.name}</h4>
                <p className="mb-1">📧 {userData.email}</p>
                <p>📍 {userData.location || "Not set"}</p>
                <p>📦 Address: {userData.address || "Not set"}</p>
                <p>🔒 {userData.password ? "********" : "Not set"}</p>
              </>
            )}
          </Col>
          <Col xs="auto">
            <Button
              variant={editMode ? "success" : darkMode ? "outline-light" : "outline-primary"}
              onClick={() => setEditMode(!editMode)}
            >
              {editMode ? "💾 Save" : "✏️ Edit Profile"}
            </Button>
          </Col>
        </Row>
      </Card>

      <Card
        className={`shadow-sm w-100 ${themeClasses}`}
        style={{ maxWidth: "900px" }}
      >
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0" className={themeClasses}>
            <Accordion.Header>✏️ Account Info</Accordion.Header>
            <Accordion.Body>
              Name: {userData.name} <br />
              Email: {userData.email} <br />
              Location: {userData.location || "Not set"} <br />
              Address: {userData.address || "Not set"} <br />
              Password: {userData.password ? "********" : "Not set"}
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="1" className={themeClasses}>
            <Accordion.Header>📦 Orders</Accordion.Header>
            <Accordion.Body>
              {userData.orders && userData.orders.length > 0 ? (
                <ul>
                  {userData.orders.map((order, i) => (
                    <li key={i}>
                      {order.title} - ₹{order.price} (x{order.quantity})
                    </li>
                  ))}
                </ul>
              ) : (
                "No orders yet"
              )}
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="2" className={themeClasses}>
            <Accordion.Header>💖 Wishlist</Accordion.Header>
            <Accordion.Body>
              {userData.wishlist && userData.wishlist.length > 0 ? (
                <ul>
                  {userData.wishlist.map((item, i) => (
                    <li key={i}>
                      {item.title} - ₹{item.price}
                    </li>
                  ))}
                </ul>
              ) : (
                "Empty"
              )}
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="3" className={themeClasses}>
            <Accordion.Header>🛒 Cart</Accordion.Header>
            <Accordion.Body>
              {cartItems.length > 0 ? (
                <ul>
                  {cartItems.map((item, i) => (
                    <li key={i}>
                      {item.title} - ₹{item.price} (x{item.quantity})
                    </li>
                  ))}
                </ul>
              ) : (
                "Empty"
              )}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Card>
    </Container>
  );
};

export default Account;
