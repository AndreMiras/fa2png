import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import ConfigureIcon from './ConfigureIcon';

// Add FontAwesome icons to library
library.add(fas);

// Mock fetch for IconPicker's YAML loading
beforeEach(() => {
  global.fetch = jest.fn(() => Promise.resolve({
    text: () => Promise.resolve(`
paw:
  styles:
    - solid
`),
  }));
});

// Mock dom-to-image to avoid errors from CaptureButton
jest.mock('dom-to-image', () => ({
  toPng: jest.fn(() => Promise.resolve('data:image/png;base64,mock')),
}));

describe('ConfigureIcon', () => {
  const mockOnIconChange = jest.fn();
  const mockOnColorChange = jest.fn();
  const mockOnSizeChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders card with header', () => {
    render(
      <ConfigureIcon
        onIconChange={mockOnIconChange}
        iconValue="paw"
        onColorChange={mockOnColorChange}
        colorValue="#333333"
        onSizeChange={mockOnSizeChange}
        sizeValue={100}
      />,
    );
    expect(screen.getByText('Configure icon')).toBeInTheDocument();
  });

  it('renders IconInput with correct value', () => {
    render(
      <ConfigureIcon
        onIconChange={mockOnIconChange}
        iconValue="paw"
        onColorChange={mockOnColorChange}
        colorValue="#333333"
        onSizeChange={mockOnSizeChange}
        sizeValue={100}
      />,
    );
    expect(screen.getByText('Icon')).toBeInTheDocument();
    const inputs = screen.getAllByRole('textbox');
    const iconInput = inputs.find((input) => input.value === 'paw');
    expect(iconInput).toBeInTheDocument();
  });

  it('renders ColorInput with correct value', () => {
    render(
      <ConfigureIcon
        onIconChange={mockOnIconChange}
        iconValue="paw"
        onColorChange={mockOnColorChange}
        colorValue="#333333"
        onSizeChange={mockOnSizeChange}
        sizeValue={100}
      />,
    );
    expect(screen.getByText('Color')).toBeInTheDocument();
    const inputs = screen.getAllByRole('textbox');
    const colorInput = inputs.find((input) => input.value === '#333333');
    expect(colorInput).toBeInTheDocument();
  });

  it('renders SizeInputWithSlider with correct value', () => {
    render(
      <ConfigureIcon
        onIconChange={mockOnIconChange}
        iconValue="paw"
        onColorChange={mockOnColorChange}
        colorValue="#333333"
        onSizeChange={mockOnSizeChange}
        sizeValue={100}
      />,
    );
    expect(screen.getByText('Size')).toBeInTheDocument();
    expect(screen.getByText('px')).toBeInTheDocument();
    const inputs = screen.getAllByRole('textbox');
    const sizeInput = inputs.find((input) => input.value === '100');
    expect(sizeInput).toBeInTheDocument();
  });

  it('renders CaptureButton', () => {
    render(
      <ConfigureIcon
        onIconChange={mockOnIconChange}
        iconValue="paw"
        onColorChange={mockOnColorChange}
        colorValue="#333333"
        onSizeChange={mockOnSizeChange}
        sizeValue={100}
      />,
    );
    expect(screen.getByText('Capture')).toBeInTheDocument();
  });

  it('calls onIconChange when icon input changes', () => {
    const onIconChange = jest.fn();
    render(
      <ConfigureIcon
        onIconChange={onIconChange}
        iconValue="paw"
        onColorChange={mockOnColorChange}
        colorValue="#333333"
        onSizeChange={mockOnSizeChange}
        sizeValue={100}
      />,
    );

    const inputs = screen.getAllByRole('textbox');
    const iconInput = inputs.find((input) => input.value === 'paw');
    fireEvent.change(iconInput, { target: { value: 'star' } });

    expect(onIconChange).toHaveBeenCalledWith('star');
  });

  it('calls onColorChange when color input changes', () => {
    const onColorChange = jest.fn();
    render(
      <ConfigureIcon
        onIconChange={mockOnIconChange}
        iconValue="paw"
        onColorChange={onColorChange}
        colorValue="#333333"
        onSizeChange={mockOnSizeChange}
        sizeValue={100}
      />,
    );

    const inputs = screen.getAllByRole('textbox');
    const colorInput = inputs.find((input) => input.value === '#333333');
    fireEvent.change(colorInput, { target: { value: '#ff0000' } });

    expect(onColorChange).toHaveBeenCalledWith('#ff0000');
  });

  it('calls onSizeChange when size input changes', () => {
    const onSizeChange = jest.fn();
    render(
      <ConfigureIcon
        onIconChange={mockOnIconChange}
        iconValue="paw"
        onColorChange={mockOnColorChange}
        colorValue="#333333"
        onSizeChange={onSizeChange}
        sizeValue={100}
      />,
    );

    const inputs = screen.getAllByRole('textbox');
    const sizeInput = inputs.find((input) => input.value === '100');
    fireEvent.change(sizeInput, { target: { value: '200' } });

    expect(onSizeChange).toHaveBeenCalledWith(200);
  });
});
