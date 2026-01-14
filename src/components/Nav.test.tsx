import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Nav from './Nav';

describe('Nav', () => {
  it('renders brand text', () => {
    render(<Nav />);
    expect(screen.getByText('FontAwesome to PNG')).toBeInTheDocument();
  });

  it('renders Home link', () => {
    render(<Nav />);
    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  it('renders About link with correct href', () => {
    render(<Nav />);
    const aboutLink = screen.getByText('About');
    expect(aboutLink).toBeInTheDocument();
    expect(aboutLink).toHaveAttribute('href', 'https://github.com/AndreMiras/fa2png');
  });

  it('renders navbar with dark variant', () => {
    const { container } = render(<Nav />);
    const navbar = container.querySelector('.navbar');
    expect(navbar).toHaveClass('bg-dark');
    expect(navbar).toHaveClass('navbar-dark');
  });
});
