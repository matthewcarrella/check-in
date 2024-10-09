import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function MyNav() {
	return (
		  <Navbar bg="light" data-bs-theme="light">
        <Container>

          <Nav className="me-auto">
            <Nav.Link href="/">User</Nav.Link>
            <Nav.Link href="about">Organizer</Nav.Link>
            <Nav.Link href="#">About</Nav.Link>
          </Nav>
        </Container>
      </Navbar>);
}


export default MyNav;