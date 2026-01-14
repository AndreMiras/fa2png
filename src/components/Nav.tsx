import { Container, Nav as ReactNav, Navbar } from 'react-bootstrap';

const Nav = () => (
  <Navbar bg="dark" variant="dark" expand="sm" className="mb-4">
    <Container>
      <Navbar.Brand href={import.meta.env.BASE_URL}>FontAwesome to PNG</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <ReactNav className="me-auto">
          <ReactNav.Link href={import.meta.env.BASE_URL}>Home</ReactNav.Link>
          <ReactNav.Link href="https://github.com/AndreMiras/fa2png">About</ReactNav.Link>
        </ReactNav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

export default Nav;
