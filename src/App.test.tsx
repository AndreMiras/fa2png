import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

describe('App', () => {
  it('renders title', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    const linkElement = screen.getByText(/FontAwesome to PNG/);
    expect(linkElement).toBeInTheDocument();
  });
});
