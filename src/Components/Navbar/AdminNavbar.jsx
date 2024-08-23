import React from 'react';
import { Container, Nav, Navbar, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './Navbar.css';
import { sellerLogout } from '../../redux/sellerAuthentication';
import { useDispatch } from 'react-redux';
import ThemeToggle from '../theme/ThemeToggle';



const AdminNavbar = () => {
  const navigate = useNavigate();
  const dispatch=useDispatch()

  const handleLogout = () => {
    dispatch(sellerLogout)
    
    // Remove the token from cookies
    Cookies.remove("token");

    // Redirect to the seller dashboard
    navigate("/sellerdashboard");
  };

  return (
    <Navbar expand="lg" className="bg-dark navbar-dark">
      <Container>
        <Navbar.Brand as={Link} to="/">Shopytrends</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/admin/userview" className="text-white">User</Nav.Link>
            <Nav.Link as={Link} to="/admin/sellerview" className="text-white">Seller</Nav.Link>
            <Nav.Link as={Link} to="/admin/selleritemview" className="text-white">Seller Product</Nav.Link>
            <Nav.Link as={Link} to="/admin/orderview" className="text-white">User Order View</Nav.Link>
            <Button
              onClick={handleLogout}
              className="ml-3 text-white bg-green-600 hover:bg-green-700 font-semibold py-2 px-4 rounded"
            >
              Logout
            </Button>
            <ThemeToggle className="ml-3 " />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AdminNavbar;
