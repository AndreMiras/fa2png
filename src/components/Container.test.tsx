import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import Container from './Container';

library.add(fas);

beforeEach(() => {
  global.fetch = vi.fn(() => Promise.resolve({
    text: () => Promise.resolve(`
paw:
  styles:
    - solid
star:
  styles:
    - solid
`),
  })) as unknown as typeof fetch;
});

vi.mock('dom-to-image', () => ({
  default: {
    toPng: vi.fn(() => Promise.resolve('data:image/png;base64,mock')),
  },
}));

describe('Container', () => {
  it('renders ConfigureIcon section', () => {
    render(<Container />);
    expect(screen.getByText('Configure icon')).toBeInTheDocument();
  });

  it('renders IconPreview section', () => {
    render(<Container />);
    expect(screen.getByText('Icon preview')).toBeInTheDocument();
  });

  it('initializes with default icon value', () => {
    render(<Container />);
    const inputs = screen.getAllByRole('textbox');
    const iconInput = inputs.find((input) => (input as HTMLInputElement).value === 'paw');
    expect(iconInput).toBeInTheDocument();
  });

  it('initializes with default color value', () => {
    render(<Container />);
    const inputs = screen.getAllByRole('textbox');
    const colorInput = inputs.find((input) => (input as HTMLInputElement).value === '#333333');
    expect(colorInput).toBeInTheDocument();
  });

  it('initializes with default size value', () => {
    render(<Container />);
    const inputs = screen.getAllByRole('textbox');
    const sizeInput = inputs.find((input) => (input as HTMLInputElement).value === '100');
    expect(sizeInput).toBeInTheDocument();
  });

  it('updates icon when icon input changes', async () => {
    render(<Container />);

    const inputs = screen.getAllByRole('textbox');
    const iconInput = inputs.find((input) => (input as HTMLInputElement).value === 'paw');
    fireEvent.change(iconInput!, { target: { value: 'star' } });

    await waitFor(() => {
      expect(iconInput).toHaveValue('star');
    });
  });

  it('updates color when color input changes', async () => {
    render(<Container />);

    const inputs = screen.getAllByRole('textbox');
    const colorInput = inputs.find((input) => (input as HTMLInputElement).value === '#333333');
    fireEvent.change(colorInput!, { target: { value: '#ff0000' } });

    await waitFor(() => {
      expect(colorInput).toHaveValue('#ff0000');
    });
  });

  it('updates size when size input changes', async () => {
    render(<Container />);

    const inputs = screen.getAllByRole('textbox');
    const sizeInput = inputs.find((input) => (input as HTMLInputElement).value === '100');
    fireEvent.change(sizeInput!, { target: { value: '200' } });

    await waitFor(() => {
      expect(sizeInput).toHaveValue('200');
    });
  });

  it('updates IconPreview when color changes', async () => {
    const { container } = render(<Container />);

    const inputs = screen.getAllByRole('textbox');
    const colorInput = inputs.find((input) => (input as HTMLInputElement).value === '#333333');
    fireEvent.change(colorInput!, { target: { value: '#ff0000' } });

    await waitFor(() => {
      const iconTarget = container.querySelector('#icon-target');
      expect(iconTarget).toHaveStyle({ color: '#ff0000' });
    });
  });

  it('updates IconPreview when size changes', async () => {
    const { container } = render(<Container />);

    const inputs = screen.getAllByRole('textbox');
    const sizeInput = inputs.find((input) => (input as HTMLInputElement).value === '100');
    fireEvent.change(sizeInput!, { target: { value: '200' } });

    await waitFor(() => {
      const iconTarget = container.querySelector('#icon-target');
      expect(iconTarget).toHaveStyle({ fontSize: '200px' });
    });
  });
});
