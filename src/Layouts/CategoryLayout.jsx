import { useEffect, useState } from "react";
import { Card, Col, ListGroup, Row } from "react-bootstrap";
import { NavLink, Outlet } from "react-router-dom";


const CategoryLayout = () => {


    const [categories, setCategories] = useState([]);
    useEffect(() => {
        fetch('https://dummyjson.com/products/categories')
            .then(res => res.json())
            .then(data => setCategories(data));
    }, [])

    return (
        <div>
            <Row>
                <Col md={3}>
                    <Card>
                        <Card.Body>
                            <Card.Title className="mb-3">list of Categories</Card.Title>
                            <ListGroup>
                                {categories.slice(0, 10).map((category, index) => (
                                    <ListGroup.Item key={index}>

                                        <NavLink className={({ isActive }) => isActive ? "text-primary text-decoration-none" : "text-dark text-decoration-none"}
                                         to={`/products/category/${category.slug}`}>{category.name}</NavLink>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
                
                <Col md={9}>
                    <Outlet />
                </Col>


            </Row>
        </div>

    )
}

export default CategoryLayout