'use client'
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';

export default function Rescue() {
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
          <Container>
            <Image src="logo.png" alt="firescape" height="40px" width="40px" />
            <Navbar.Brand href="">Firescape</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="civilian">Civilian</Nav.Link>
                <Nav.Link href="rescue">Rescue</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      )
  }