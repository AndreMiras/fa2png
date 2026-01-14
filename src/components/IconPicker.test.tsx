import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import IconPicker from './IconPicker';

library.add(fas);

const mockYamlContent = `
paw:
  styles:
    - solid
star:
  styles:
    - solid
heart:
  styles:
    - solid
moon:
  styles:
    - regular
`;

describe('IconPicker', () => {
  const mockOnChange = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    global.fetch = vi.fn(() => Promise.resolve({
      text: () => Promise.resolve(mockYamlContent),
    })) as unknown as typeof fetch;
  });

  it('renders popover with title', async () => {
    render(<IconPicker onChange={mockOnChange} />);

    await waitFor(() => {
      expect(screen.getByPlaceholderText('Type to filter')).toBeInTheDocument();
    });
  });

  it('fetches icons on mount', async () => {
    render(<IconPicker onChange={mockOnChange} />);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
    });
  });

  it('displays solid style icons', async () => {
    render(<IconPicker onChange={mockOnChange} />);

    await waitFor(() => {
      const buttons = screen.getAllByRole('button');
      expect(buttons.length).toBe(3);
    });
  });

  it('filters out non-solid icons', async () => {
    render(<IconPicker onChange={mockOnChange} />);

    await waitFor(() => {
      const buttons = screen.getAllByRole('button');
      expect(buttons.length).toBe(3);
    });
  });

  it('filters icons when typing in search', async () => {
    render(<IconPicker onChange={mockOnChange} />);

    await waitFor(() => {
      expect(screen.getAllByRole('button').length).toBe(3);
    });

    const searchInput = screen.getByPlaceholderText('Type to filter');
    fireEvent.change(searchInput, { target: { value: 'star' } });

    await waitFor(() => {
      const buttons = screen.getAllByRole('button');
      expect(buttons.length).toBe(1);
    });
  });

  it('calls onChange when icon is clicked', async () => {
    const onChange = vi.fn();
    render(<IconPicker onChange={onChange} />);

    await waitFor(() => {
      expect(screen.getAllByRole('button').length).toBe(3);
    });

    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[0]);

    expect(onChange).toHaveBeenCalled();
  });

  it('shows all icons when search is cleared', async () => {
    render(<IconPicker onChange={mockOnChange} />);

    await waitFor(() => {
      expect(screen.getAllByRole('button').length).toBe(3);
    });

    const searchInput = screen.getByPlaceholderText('Type to filter');

    fireEvent.change(searchInput, { target: { value: 'star' } });
    await waitFor(() => {
      expect(screen.getAllByRole('button').length).toBe(1);
    });

    fireEvent.change(searchInput, { target: { value: '' } });
    await waitFor(() => {
      expect(screen.getAllByRole('button').length).toBe(3);
    });
  });

  it('shows no icons when filter matches nothing', async () => {
    render(<IconPicker onChange={mockOnChange} />);

    await waitFor(() => {
      expect(screen.getAllByRole('button').length).toBe(3);
    });

    const searchInput = screen.getByPlaceholderText('Type to filter');
    fireEvent.change(searchInput, { target: { value: 'nonexistent' } });

    await waitFor(() => {
      expect(screen.queryAllByRole('button').length).toBe(0);
    });
  });
});
