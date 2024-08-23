

import React, { useEffect, useState } from 'react';
import { Container, Nav, Navbar, Button, Form, InputGroup } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import "./Navbar.css";
import { useDispatch, useSelector } from 'react-redux';
import { authUserSuccess, userLogout } from '../../redux/userAuthentication';
import Cookies from 'js-cookie';
import { FiShoppingCart, FiSearch } from "react-icons/fi";
import ThemeToggle from '../theme/ThemeToggle';
import axios from 'axios';


const HomeNavbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  // const [type, setType] = useState('category');
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);



  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      dispatch(authUserSuccess(token));
    }
  }, [dispatch]);

  useEffect(() => {
    const fetchCartCount = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/v1/cart/count', {
          withCredentials: true,
        });
        setCartCount(response.data.cartCount || 0);
      } catch (error) {
        console.error('Error fetching cart count:', error);
        setCartCount(0);
      }
    };
    fetchCartCount();
  }, [isAuthenticated]);
 


  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${searchQuery}`);
    }
  };

  const handleLogout = () => {
    dispatch(userLogout());
    Cookies.remove("token");
    setCartCount(0);
    navigate("/user/signup");
  };

  return (
    <div>
      <Navbar expand="lg" className="bg-dark navbar-dark">
        <Container>
          <Navbar.Brand as={Link} to="/">Shopytrends</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/sellerdashboard">Become a Seller</Nav.Link>
              {isAuthenticated && (
                <Nav.Link as={Link} to="/user/orders">Orders</Nav.Link>
              )}
            </Nav>

            <Form onSubmit={handleSearch} className="d-flex align-items-center mx-auto">
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="Search....."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="mr-2"
                />

              </InputGroup>

            </Form>

            <Nav className="ml-auto align-items-center">
              <Nav.Link as={Link} to="/user/cart" className="position-relative mb-1 mt-2">
                <FiShoppingCart size={24} className="text-white" />
                {cartCount > 0 && (
                  <span className="cart-count">{cartCount}</span>
                )}
              </Nav.Link>

              {isAuthenticated ? (
                <Button variant="outline-light" onClick={handleLogout} className='mb-1'>Logout</Button>
              ) : (
                <Nav.Link as={Link} to="/user/signin">
                  <Button variant="outline-light">Signup</Button>
                </Nav.Link>
              )}

              <ThemeToggle className="ml-3 mb-5" />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default HomeNavbar;


