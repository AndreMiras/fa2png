import React from 'react';
import {
  render, screen, fireEvent, waitFor,
} from '@testing-library/react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import IconInput from './IconInput';

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
heart:
  styles:
    - solid
`),
  }));
});

describe('IconInput', () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
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
    const onChange = jest.fn();
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
