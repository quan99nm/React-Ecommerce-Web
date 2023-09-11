import React from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
const Header = (props) => {
  return (
    <Navbar bg="light" expand="lg" sticky="top" className="py-3">
      <Container>
        <NavLink className="navbar-brand fw-bold fs-4 px-2" to="/home">
          React Ecommerce
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="navbar-nav me-auto">
            <Nav.Item>
              <Nav.Link as={NavLink} to="/home" className="nav-link">
                Home
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={NavLink} to="/product" className="nav-link">
                Products
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={NavLink} to="/about" className="nav-link">
                About
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={NavLink} to="/contact" className="nav-link">
                Contact
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <Nav className="buttons ">
            <Button
              as={NavLink}
              to="/login"
              variant="secondary"
              className="m-2"
            >
              <i class="bi bi-box-arrow-left"></i> Login
            </Button>
            <Button
              as={NavLink}
              to="/register"
              variant="secondary"
              className="m-2"
            >
              <i class="bi bi-r-circle"></i> Register
            </Button>
            <Button as={NavLink} to="/cart" variant="secondary" className="m-2">
              <i class="bi bi-cart"></i> Cart ({1})
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
