import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import IconPreview from './IconPreview';

library.add(fas);

describe('IconPreview', () => {
  it('renders card with header', () => {
    render(<IconPreview icon="paw" color="#333333" size={100} />);
    expect(screen.getByText('Icon preview')).toBeInTheDocument();
  });

  it('renders icon canvas container', () => {
    const { container } = render(<IconPreview icon="paw" color="#333333" size={100} />);
    const iconCanvas = container.querySelector('#icon-canvas');
    expect(iconCanvas).toBeInTheDocument();
    expect(iconCanvas).toHaveClass('text-center');
  });

  it('renders icon target element', () => {
    const { container } = render(<IconPreview icon="paw" color="#333333" size={100} />);
    const iconTarget = container.querySelector('#icon-target');
    expect(iconTarget).toBeInTheDocument();
  });

  it('applies correct size style', () => {
    const { container } = render(<IconPreview icon="paw" color="#333333" size={200} />);
    const iconTarget = container.querySelector('#icon-target');
    expect(iconTarget).toHaveStyle({ fontSize: '200px' });
  });

  it('applies correct color style', () => {
    const { container } = render(<IconPreview icon="paw" color="#ff0000" size={100} />);
    const iconTarget = container.querySelector('#icon-target');
    expect(iconTarget).toHaveStyle({ color: '#ff0000' });
  });

  it('updates when props change', () => {
    const { container, rerender } = render(<IconPreview icon="paw" color="#333333" size={100} />);
    const iconTarget = container.querySelector('#icon-target');

    expect(iconTarget).toHaveStyle({ fontSize: '100px', color: '#333333' });

    rerender(<IconPreview icon="star" color="#00ff00" size={50} />);

    expect(iconTarget).toHaveStyle({ fontSize: '50px', color: '#00ff00' });
  });
});
