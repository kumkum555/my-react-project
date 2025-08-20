import { Container, Navbar, Nav, Badge } from "react-bootstrap";
import { Outlet, NavLink, Link } from "react-router-dom";
import { useSelector } from "react-redux";

const RootLayout = () => {
  const cart = useSelector((state) => state.cart);
  const { wishlistItems } = useSelector((state) => state.wishlist);

  return (
    <div
      className="min-vh-100 w-100"
      style={{
        background: "linear-gradient(135deg, #fff0f6, #f8a5c2, #d63384)", 
      }}
    >
      
      <Navbar
        expand="lg"
        style={{
          background: "linear-gradient(90deg, #e2bfd1ef, #f06292)", 
        }}
        className="shadow-sm"
      >
        <Container fluid>
          
          <Navbar.Brand as={Link} to="/">
            <b>
              <span style={{ color: "#d63384" }}>INDI</span>
              <span style={{ color: "white" }}>TRONICS</span>
            </b>
          </Navbar.Brand>


          <Navbar.Toggle aria-controls="navbarScroll" className="bg-light" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0" navbarScroll>
              <NavLink
                to={"/products"}
                className={({ isActive }) =>
                  isActive
                    ? "fw-bold text-white text-decoration-underline"
                    : "text-white text-decoration-none"
                }
              >
                Products Category
              </NavLink>
            </Nav>

            <div className="d-flex">
              <NavLink
                to="/cart"
                className="btn btn-light me-2 fw-semibold"
                style={{ color: "#d63384" }}
              >
                Cart <Badge bg="secondary">{cart.length}</Badge>
              </NavLink>

              <NavLink
                to="/wishlist"
                className="btn btn-light fw-semibold"
                style={{ color: "#d63384" }}
              >
                Wishlist <Badge bg="secondary">{wishlistItems.length}</Badge>
              </NavLink>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      
      <Container fluid className="mt-3">
        <Outlet />
      </Container>
    </div>
  );
};

export default RootLayout;
