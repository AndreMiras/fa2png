import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import ConfigureIcon from './ConfigureIcon';

library.add(fas);

beforeEach(() => {
  global.fetch = vi.fn(() => Promise.resolve({
    text: () => Promise.resolve(`
paw:
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

describe('ConfigureIcon', () => {
  const mockOnIconChange = vi.fn();
  const mockOnColorChange = vi.fn();
  const mockOnSizeChange = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
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
    const iconInput = inputs.find((input) => (input as HTMLInputElement).value === 'paw');
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
    const colorInput = inputs.find((input) => (input as HTMLInputElement).value === '#333333');
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
    const sizeInput = inputs.find((input) => (input as HTMLInputElement).value === '100');
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
    const onIconChange = vi.fn();
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
    const iconInput = inputs.find((input) => (input as HTMLInputElement).value === 'paw');
    fireEvent.change(iconInput!, { target: { value: 'star' } });

    expect(onIconChange).toHaveBeenCalledWith('star');
  });

  it('calls onColorChange when color input changes', () => {
    const onColorChange = vi.fn();
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
    const colorInput = inputs.find((input) => (input as HTMLInputElement).value === '#333333');
    fireEvent.change(colorInput!, { target: { value: '#ff0000' } });

    expect(onColorChange).toHaveBeenCalledWith('#ff0000');
  });

  it('calls onSizeChange when size input changes', () => {
    const onSizeChange = vi.fn();
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
    const sizeInput = inputs.find((input) => (input as HTMLInputElement).value === '100');
    fireEvent.change(sizeInput!, { target: { value: '200' } });

    expect(onSizeChange).toHaveBeenCalledWith(200);
  });
});
