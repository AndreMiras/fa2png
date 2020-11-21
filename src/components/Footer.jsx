import React from 'react';
import { Container } from 'react-bootstrap';
import { version } from '../../package.json';

const Footer = () => (
  <footer className="footer">
    <Container className="text-center">
      <span>
        Copyright &copy; Andre Miras 2020 - fa2png v
        {version}
      </span>
    </Container>
  </footer>
);

export default Footer;
