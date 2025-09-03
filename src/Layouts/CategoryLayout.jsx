import { useEffect, useState } from "react";
import { Card, Col, ListGroup, Row, Container } from "react-bootstrap";
import { NavLink, Outlet, useOutletContext } from "react-router-dom";

const CategoryLayout = () => {
  const [categories, setCategories] = useState([]);
  const { darkMode } = useOutletContext();

  useEffect(() => {
    fetch("https://dummyjson.com/products/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  return (
    <div
      className={
        darkMode
          ? "bg-dark text-light min-vh-100"
          : "bg-light text-dark min-vh-100"
      }
    >
      
      <Container className="py-4">
        <Row className="g-3">
          <Col xs={12} md={3}>
            <Card className={darkMode ? "bg-dark text-light" : ""}>
              <Card.Body>
                <Card.Title className="mb-3">List of Categories</Card.Title>
                <ListGroup>
                  {categories.slice(0, 10).map((category, index) => (
                    <ListGroup.Item
                      key={index}
                      className={
                        darkMode ? "bg-dark text-light" : "bg-light text-dark"
                      }
                    >
                      <NavLink
                        className={({ isActive }) =>
                          isActive
                            ? "text-primary text-decoration-none"
                            : darkMode
                            ? "text-light text-decoration-none"
                            : "text-dark text-decoration-none"
                        }
                        to={`/products/category/${category.slug || category}`}
                      >
                        {category.name || category}
                      </NavLink>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} md={9}>
            <Outlet />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CategoryLayout;
