import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import IconInput from './IconInput';

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
heart:
  styles:
    - solid
`),
  })) as unknown as typeof fetch;
});

describe('IconInput', () => {
  const mockOnChange = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders icon label', () => {
    render(<IconInput onChange={mockOnChange} value="paw" />);
    expect(screen.getByText('Icon')).toBeInTheDocument();
  });

  it('displays current icon value in input', () => {
    render(<IconInput onChange={mockOnChange} value="star" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('star');
  });

  it('renders icon button showing current icon', () => {
    render(<IconInput onChange={mockOnChange} value="paw" />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('calls onChange when input value changes', () => {
    const onChange = vi.fn();
    render(<IconInput onChange={onChange} value="paw" />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'heart' } });

    expect(onChange).toHaveBeenCalledWith('heart');
  });

  it('shows icon picker popover when button clicked', async () => {
    render(<IconInput onChange={mockOnChange} value="paw" />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByPlaceholderText('Type to filter')).toBeInTheDocument();
    });
  });

  it('updates when value prop changes', () => {
    const { rerender } = render(<IconInput onChange={mockOnChange} value="paw" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('paw');

    rerender(<IconInput onChange={mockOnChange} value="star" />);
    expect(input).toHaveValue('star');
  });
});
