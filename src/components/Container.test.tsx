import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { BrowserRouter } from 'react-router-dom';
import Container from './Container';

library.add(fas);

beforeEach(() => {
  window.history.pushState({}, '', '/');
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

const renderContainer = (search = '') => {
  window.history.pushState({}, '', `/${search}`);
  return render(
    <BrowserRouter>
      <Container />
    </BrowserRouter>,
  );
};

describe('Container', () => {
  it('renders ConfigureIcon section', () => {
    renderContainer();
    expect(screen.getByText('Configure icon')).toBeInTheDocument();
  });

  it('renders IconPreview section', () => {
    renderContainer();
    expect(screen.getByText('Icon preview')).toBeInTheDocument();
  });

  it('initializes with default icon value', () => {
    renderContainer();
    const inputs = screen.getAllByRole('textbox');
    const iconInput = inputs.find((input) => (input as HTMLInputElement).value === 'paw');
    expect(iconInput).toBeInTheDocument();
  });

  it('initializes with default color value', () => {
    renderContainer();
    const inputs = screen.getAllByRole('textbox');
    const colorInput = inputs.find((input) => (input as HTMLInputElement).value === '#333333');
    expect(colorInput).toBeInTheDocument();
  });

  it('initializes with default size value', () => {
    renderContainer();
    const inputs = screen.getAllByRole('textbox');
    const sizeInput = inputs.find((input) => (input as HTMLInputElement).value === '100');
    expect(sizeInput).toBeInTheDocument();
  });

  it('updates icon when icon input changes', async () => {
    renderContainer();

    const inputs = screen.getAllByRole('textbox');
    const iconInput = inputs.find((input) => (input as HTMLInputElement).value === 'paw');
    fireEvent.change(iconInput!, { target: { value: 'star' } });

    await waitFor(() => {
      expect(iconInput).toHaveValue('star');
    });
  });

  it('updates color when color input changes', async () => {
    renderContainer();

    const inputs = screen.getAllByRole('textbox');
    const colorInput = inputs.find((input) => (input as HTMLInputElement).value === '#333333');
    fireEvent.change(colorInput!, { target: { value: '#ff0000' } });

    await waitFor(() => {
      expect(colorInput).toHaveValue('#ff0000');
    });
  });

  it('updates size when size input changes', async () => {
    renderContainer();

    const inputs = screen.getAllByRole('textbox');
    const sizeInput = inputs.find((input) => (input as HTMLInputElement).value === '100');
    fireEvent.change(sizeInput!, { target: { value: '200' } });

    await waitFor(() => {
      expect(sizeInput).toHaveValue('200');
    });
  });

  it('updates IconPreview when color changes', async () => {
    const { container } = renderContainer();

    const inputs = screen.getAllByRole('textbox');
    const colorInput = inputs.find((input) => (input as HTMLInputElement).value === '#333333');
    fireEvent.change(colorInput!, { target: { value: '#ff0000' } });

    await waitFor(() => {
      const iconTarget = container.querySelector('#icon-target');
      expect(iconTarget).toHaveStyle({ color: '#ff0000' });
    });
  });

  it('updates IconPreview when size changes', async () => {
    const { container } = renderContainer();

    const inputs = screen.getAllByRole('textbox');
    const sizeInput = inputs.find((input) => (input as HTMLInputElement).value === '100');
    fireEvent.change(sizeInput!, { target: { value: '200' } });

    await waitFor(() => {
      const iconTarget = container.querySelector('#icon-target');
      expect(iconTarget).toHaveStyle({ fontSize: '200px' });
    });
  });

  it('initializes from valid query params', () => {
    renderContainer('?icon=star&color=%23ff0000&size=200');

    const inputs = screen.getAllByRole('textbox') as HTMLInputElement[];
    expect(inputs[0]).toHaveValue('star');
    expect(inputs[1]).toHaveValue('#ff0000');
    expect(inputs[2]).toHaveValue('200');
  });

  it('falls back to defaults on invalid query params', () => {
    renderContainer('?icon=&color=bad&size=abc');

    const inputs = screen.getAllByRole('textbox') as HTMLInputElement[];
    expect(inputs[0]).toHaveValue('paw');
    expect(inputs[1]).toHaveValue('#333333');
    expect(inputs[2]).toHaveValue('100');
  });

  it('syncs query params when icon/color/size change', async () => {
    renderContainer();
    const inputs = screen.getAllByRole('textbox');
    const iconInput = inputs.find((input) => (input as HTMLInputElement).value === 'paw');
    const colorInput = inputs.find((input) => (input as HTMLInputElement).value === '#333333');
    const sizeInput = inputs.find((input) => (input as HTMLInputElement).value === '100');

    fireEvent.change(iconInput!, { target: { value: 'star' } });
    fireEvent.change(colorInput!, { target: { value: '#ff0000' } });
    fireEvent.change(sizeInput!, { target: { value: '200' } });

    await waitFor(() => {
      expect(window.location.search).toEqual('?icon=star&color=%23ff0000&size=200');
    });
  });

  it('uses history replace semantics while syncing query params', async () => {
    const replaceStateSpy = vi.spyOn(window.history, 'replaceState');
    renderContainer();
    const initialCallCount = replaceStateSpy.mock.calls.length;

    const inputs = screen.getAllByRole('textbox');
    const sizeInput = inputs.find((input) => (input as HTMLInputElement).value === '100');
    fireEvent.change(sizeInput!, { target: { value: '200' } });

    await waitFor(() => {
      expect(replaceStateSpy.mock.calls.length).toBeGreaterThan(initialCallCount);
    });
  });
});
