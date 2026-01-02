import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';
import { version } from '../../package.json';

describe('Footer', () => {
  it('renders copyright text', () => {
    render(<Footer />);
    expect(screen.getByText(/Copyright/)).toBeInTheDocument();
  });

  it('renders author name', () => {
    render(<Footer />);
    expect(screen.getByText(/Andre Miras/)).toBeInTheDocument();
  });

  it('renders version from package.json', () => {
    render(<Footer />);
    expect(screen.getByText(new RegExp(`fa2png v${version}`))).toBeInTheDocument();
  });

  it('is hidden on small screens', () => {
    const { container } = render(<Footer />);
    const footer = container.querySelector('footer');
    expect(footer).toHaveClass('d-none');
    expect(footer).toHaveClass('d-md-block');
  });
});
