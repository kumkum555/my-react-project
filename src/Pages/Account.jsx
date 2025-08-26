import React, { useState } from "react";
import { Container, Card, Accordion, Button, Image, Row, Col, Form } from "react-bootstrap";
import { useOutletContext } from "react-router-dom";

const Account = () => {
  const { darkMode } = useOutletContext();
  const [user, setUser] = useState({
    name: "kumkum kapkoti",
    email: "kumkum88@gmail.com",
    location: "kapkot Bageshwar UK 263642, India",
    profilePic:
      "https://static.vecteezy.com/system/resources/previews/002/002/257/non_2x/beautiful-woman-avatar-character-icon-free-vector.jpg",
  });
  const [editMode, setEditMode] = useState(false);

  const themeClasses = darkMode
    ? "bg-dark text-light border border-secondary"
    : "bg-light text-dark";

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <Container fluid className={`p-4 min-vh-100 ${darkMode ? "bg-dark" : "bg-light"}`}>
      <Card className={`p-4 mb-4 shadow-sm ${themeClasses}`}>
        <Row className="align-items-center">
          <Col xs="auto">
            <Image src={user.profilePic} roundedCircle width="100" height="100" />
          </Col>
          <Col>
            {editMode ? (
              <>
                <Form.Group className="mb-2">
                  <Form.Label>✏️ Name</Form.Label>
                  <Form.Control type="text" name="name" value={user.name} onChange={handleInputChange} />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>📧 Email</Form.Label>
                  <Form.Control type="email" name="email" value={user.email} onChange={handleInputChange} />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>📍 Location</Form.Label>
                  <Form.Control type="text" name="location" value={user.location} onChange={handleInputChange} />
                </Form.Group>
              </>
            ) : (
              <>
                <h4>{user.name}</h4>
                <p className="mb-1">📧 {user.email}</p>
                <p>📍 {user.location}</p>
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

      <Accordion defaultActiveKey="0" className={`shadow-sm ${themeClasses}`}>
        <Accordion.Item eventKey="0" className={themeClasses}>
          <Accordion.Header>✏️ Account Info</Accordion.Header>
          <Accordion.Body>
            Name: {user.name} <br />
            Email: {user.email}
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1" className={themeClasses}>
          <Accordion.Header>🔒 Change Password</Accordion.Header>
          <Accordion.Body>Update your password here.</Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2" className={themeClasses}>
          <Accordion.Header>📍 Address</Accordion.Header>
          <Accordion.Body>{user.location}</Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="3" className={themeClasses}>
          <Accordion.Header>📦 Orders</Accordion.Header>
          <Accordion.Body>No orders yet.</Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="4" className={themeClasses}>
          <Accordion.Header>💖 Wishlist</Accordion.Header>
          <Accordion.Body>Wishlist is empty.</Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="5" className={themeClasses}>
          <Accordion.Header>🛒 Cart</Accordion.Header>
          <Accordion.Body>Cart is empty.</Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
};

export default Account;
