import React from 'react';
import {
  render, screen, fireEvent, waitFor,
} from '@testing-library/react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import Container from './Container';

// Add FontAwesome icons to library
library.add(fas);

// Mock fetch for IconPicker's YAML loading
beforeEach(() => {
  global.fetch = jest.fn(() => Promise.resolve({
    text: () => Promise.resolve(`
paw:
  styles:
    - solid
star:
  styles:
    - solid
`),
  }));
});

// Mock dom-to-image to avoid errors from CaptureButton
jest.mock('dom-to-image', () => ({
  toPng: jest.fn(() => Promise.resolve('data:image/png;base64,mock')),
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
    const iconInput = inputs.find((input) => input.value === 'paw');
    expect(iconInput).toBeInTheDocument();
  });

  it('initializes with default color value', () => {
    render(<Container />);
    const inputs = screen.getAllByRole('textbox');
    const colorInput = inputs.find((input) => input.value === '#333333');
    expect(colorInput).toBeInTheDocument();
  });

  it('initializes with default size value', () => {
    render(<Container />);
    const inputs = screen.getAllByRole('textbox');
    const sizeInput = inputs.find((input) => input.value === '100');
    expect(sizeInput).toBeInTheDocument();
  });

  it('updates icon when icon input changes', async () => {
    render(<Container />);

    const inputs = screen.getAllByRole('textbox');
    const iconInput = inputs.find((input) => input.value === 'paw');
    fireEvent.change(iconInput, { target: { value: 'star' } });

    await waitFor(() => {
      expect(iconInput).toHaveValue('star');
    });
  });

  it('updates color when color input changes', async () => {
    render(<Container />);

    const inputs = screen.getAllByRole('textbox');
    const colorInput = inputs.find((input) => input.value === '#333333');
    fireEvent.change(colorInput, { target: { value: '#ff0000' } });

    await waitFor(() => {
      expect(colorInput).toHaveValue('#ff0000');
    });
  });

  it('updates size when size input changes', async () => {
    render(<Container />);

    const inputs = screen.getAllByRole('textbox');
    const sizeInput = inputs.find((input) => input.value === '100');
    fireEvent.change(sizeInput, { target: { value: '200' } });

    await waitFor(() => {
      expect(sizeInput).toHaveValue('200');
    });
  });

  it('updates IconPreview when color changes', async () => {
    const { container } = render(<Container />);

    const inputs = screen.getAllByRole('textbox');
    const colorInput = inputs.find((input) => input.value === '#333333');
    fireEvent.change(colorInput, { target: { value: '#ff0000' } });

    await waitFor(() => {
      const iconTarget = container.querySelector('#icon-target');
      expect(iconTarget).toHaveStyle({ color: '#ff0000' });
    });
  });

  it('updates IconPreview when size changes', async () => {
    const { container } = render(<Container />);

    const inputs = screen.getAllByRole('textbox');
    const sizeInput = inputs.find((input) => input.value === '100');
    fireEvent.change(sizeInput, { target: { value: '200' } });

    await waitFor(() => {
      const iconTarget = container.querySelector('#icon-target');
      expect(iconTarget).toHaveStyle({ fontSize: '200px' });
    });
  });
});
