import React from 'react';
import { Container, Nav as ReactNav, Navbar } from 'react-bootstrap';

const Nav = () => (
  <Navbar bg="dark" variant="dark" expand="sm" className="mb-4">
    <Container>
      <Navbar.Brand href={process.env.PUBLIC_URL}>FontAwesome to PNG</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <ReactNav className="mr-auto">
          <ReactNav.Link href={process.env.PUBLIC_URL}>Home</ReactNav.Link>
          <ReactNav.Link href="https://github.com/AndreMiras/fa2png">About</ReactNav.Link>
        </ReactNav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

export default Nav;
