
import React, { useEffect } from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { authSellerSuccess, sellerLogout } from '../../redux/sellerAuthentication';
import ThemeToggle from '../theme/ThemeToggle';

const SellerNavbar = () => {
  const isAuthenticated = useSelector((state) => state.sellerAuth.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      dispatch(authSellerSuccess(token));
    }
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(sellerLogout());
    Cookies.remove('token');
    navigate('seller/signup');
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/seller/login');
    }
  }, [isAuthenticated, navigate]);

  return (
    <Navbar expand="lg" className="bg-dark navbar-dark">
      <Container>
        <Navbar.Brand as={Link} to="/">Shopytrends</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
           
          </Nav>
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/seller/productsadd">Start Selling</Nav.Link>
            <Nav.Link as={Link} to="/seller/productsview">Products View</Nav.Link>
          </Nav>
          <Nav className="ms-auto d-flex align-items-center">
            {isAuthenticated ? (
              <Button variant="outline-light" onClick={handleLogout}>Logout</Button>
            ) : (
              <Nav.Link as={Link} to="/seller/signup">
                <Button variant="outline-light">Login</Button>
              </Nav.Link>
            )}
            <div className="theme-toggle-container">
              <ThemeToggle />
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default SellerNavbar;
