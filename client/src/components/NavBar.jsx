import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

function NavBar() {
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/');
  };

  const handleLogout = () => {
    localStorage.removeItem('userId');//Adding id as a dependency to the useEffect hook in the AllBlogs component means that the useEffect will re-run every time the value of id changes. This ensures that when the userId stored in localStorage is removed (i.e., when the user logs out), the component will fetch and display all blogs again instead of just the blogs for the logged-out user.
    navigate('/'); // Redirect to home page after logout
    window.location.reload(); // Refresh the page to update the state in AllBlogs component
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">Home</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/create-blog">
              <Button variant='primary' className="me-2">CreateBlog</Button>
            </Nav.Link>
          </Nav>
          <Nav>
            {userId ? (
              <Button variant="primary" className="me-2" onClick={handleLogout}>LogOut</Button>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">
                  <Button variant="primary" className="me-2" onClick={handleLogin}>Login</Button>
                </Nav.Link>
                <Nav.Link as={Link} to="/register">
                  <Button variant="secondary">Register</Button>
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
