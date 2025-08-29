import { Container, Navbar, Nav, Badge, Button } from "react-bootstrap";
import { Outlet, NavLink, Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { FaShoppingCart, FaHeart, FaSun, FaMoon, FaUser, FaSignInAlt } from "react-icons/fa";

const RootLayout = () => {
  const { totalItems } = useSelector((state) => state.cart);   
  const { wishlistItems } = useSelector((state) => state.wishlist);

  const [darkMode, setDarkMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  const navigate = useNavigate();

  const toggleTheme = () => setDarkMode(!darkMode);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserData(null);
    navigate("/login");
  };

  return (
    <div className={`min-vh-100 w-100 ${darkMode ? "bg-dark text-light" : "bg-light text-dark"}`}>
      <Navbar expand="lg" className={`shadow-sm ${darkMode ? "bg-dark navbar-dark" : "bg-white navbar-light"}`}>
        <Container fluid>
          <Navbar.Brand as={Link} to="/">
            <b>
              <span style={{ color: darkMode ? "#4a90e2" : "#336cd6ff" }}>INDI</span>
              <span style={{ color: darkMode ? "#fff" : "black" }}>TRONICS</span>
            </b>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="navbarScroll" className="bg-light" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0" navbarScroll />

            <div className="d-flex align-items-center">
            
              <Button
                variant={darkMode ? "outline-light" : "outline-dark"}
                className="me-2 d-flex align-items-center"
                onClick={toggleTheme}
              >
                {darkMode ? <FaSun className="me-2" /> : <FaMoon className="me-2" />}
                {darkMode ? "Light Mode" : "Dark Mode"}
              </Button>

        
              <NavLink
                to="/cart"
                className={`btn ${darkMode ? "btn-outline-light" : "btn-light"} me-2 fw-semibold d-flex align-items-center`}
              >
                <FaShoppingCart className="me-1" />
                Cart <Badge bg="secondary" className="ms-1">{totalItems}</Badge>
              </NavLink>

          
              <NavLink
                to="/wishlist"
                className={`btn ${darkMode ? "btn-outline-light" : "btn-light"} me-2 fw-semibold d-flex align-items-center`}
              >
                <FaHeart className="me-1 text-danger" />
                Wishlist <Badge bg="secondary" className="ms-1">{wishlistItems.length}</Badge>
              </NavLink>

            
              {isLoggedIn ? (
                <Button
                  onClick={handleLogout}
                  className={`btn ${darkMode ? "btn-outline-light" : "btn-light"} me-2 fw-semibold d-flex align-items-center`}
                >
                  <FaSignInAlt className="me-1" /> Logout
                </Button>
              ) : (
                <>
                  <NavLink
                    to="/login"
                    className={`btn ${darkMode ? "btn-outline-light" : "btn-light"} me-2 fw-semibold d-flex align-items-center`}
                  >
                    <FaSignInAlt className="me-1" /> Login
                  </NavLink>

                  <NavLink
                    to="/register"
                    className={`btn ${darkMode ? "btn-outline-light" : "btn-light"} me-2 fw-semibold d-flex align-items-center`}
                  >
                    <FaUser className="me-1" /> Register
                  </NavLink>
                </>
              )}

              
              <NavLink
                to="/account"
                className={`btn ${darkMode ? "btn-outline-light" : "btn-light"} fw-semibold d-flex align-items-center`}
              >
                <FaUser className="me-1" />
                {isLoggedIn && userData ? userData.name : "Account"}
              </NavLink>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container fluid className="mt-3">
        <Outlet context={{ darkMode, setIsLoggedIn, userData, setUserData }} />
      </Container>
    </div>
  );
};

export default RootLayout;
