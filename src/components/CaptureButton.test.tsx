import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import domtoimage from 'dom-to-image';
import CaptureButton from './CaptureButton';

library.add(fas);

vi.mock('dom-to-image', () => ({
  default: {
    toPng: vi.fn(),
  },
}));

describe('CaptureButton', () => {
  let mockIconCanvas: HTMLDivElement;
  let originalGetElementById: typeof document.getElementById;
  let mockWindowOpen: { document: { write: ReturnType<typeof vi.fn>; close: ReturnType<typeof vi.fn> } };

  beforeEach(() => {
    vi.clearAllMocks();

    originalGetElementById = document.getElementById;

    mockIconCanvas = document.createElement('div');
    mockIconCanvas.id = 'icon-canvas';
    document.getElementById = vi.fn((id) => {
      if (id === 'icon-canvas') return mockIconCanvas;
      return originalGetElementById.call(document, id);
    });

    mockWindowOpen = {
      document: {
        write: vi.fn(),
        close: vi.fn(),
      },
    };
    window.open = vi.fn(() => mockWindowOpen as unknown as Window);

    vi.mocked(domtoimage.toPng).mockResolvedValue('data:image/png;base64,mockdata');
  });

  afterEach(() => {
    document.getElementById = originalGetElementById;
  });

  it('renders capture button', () => {
    render(<CaptureButton />);
    expect(screen.getByText('Capture')).toBeInTheDocument();
  });

  it('renders dropdown toggle', () => {
    const { container } = render(<CaptureButton />);
    const toggle = container.querySelector('.dropdown-toggle-split');
    expect(toggle).toBeInTheDocument();
  });

  it('calls dom-to-image when capture button clicked', async () => {
    render(<CaptureButton />);

    const captureButton = screen.getByText('Capture').closest('button');
    fireEvent.click(captureButton!);

    await waitFor(() => {
      expect(domtoimage.toPng).toHaveBeenCalledWith(mockIconCanvas);
    });
  });

  it('opens new window with image after capture', async () => {
    render(<CaptureButton />);

    const captureButton = screen.getByText('Capture').closest('button');
    fireEvent.click(captureButton!);

    await waitFor(() => {
      expect(window.open).toHaveBeenCalled();
      expect(mockWindowOpen.document.write).toHaveBeenCalled();
      expect(mockWindowOpen.document.close).toHaveBeenCalled();
    });
  });

  it('shows dropdown menu with download option', () => {
    const { container } = render(<CaptureButton />);

    const toggle = container.querySelector('.dropdown-toggle-split');
    fireEvent.click(toggle!);

    expect(screen.getByText('Capture & Download')).toBeInTheDocument();
  });

  it('calls dom-to-image when capture & download clicked', async () => {
    const { container } = render(<CaptureButton />);

    const toggle = container.querySelector('.dropdown-toggle-split');
    fireEvent.click(toggle!);

    const downloadButton = screen.getByText('Capture & Download').closest('button');
    fireEvent.click(downloadButton!);

    await waitFor(() => {
      expect(domtoimage.toPng).toHaveBeenCalledWith(mockIconCanvas);
    });
  });

  it('handles dom-to-image error gracefully', async () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.mocked(domtoimage.toPng).mockRejectedValue(new Error('Capture failed'));

    render(<CaptureButton />);

    const captureButton = screen.getByText('Capture').closest('button');
    fireEvent.click(captureButton!);

    await waitFor(() => {
      expect(consoleError).toHaveBeenCalledWith(
        'oops, something went wrong!',
        expect.any(Error),
      );
    });

    consoleError.mockRestore();
  });

  it('renders wand-magic icon on capture button', () => {
    const { container } = render(<CaptureButton />);
    const svgIcon = container.querySelector('svg[data-icon="wand-magic"]');
    expect(svgIcon).toBeInTheDocument();
  });

  it('renders download icon in dropdown', () => {
    const { container } = render(<CaptureButton />);

    const toggle = container.querySelector('.dropdown-toggle-split');
    fireEvent.click(toggle!);

    const downloadIcon = container.querySelector('svg[data-icon="download"]');
    expect(downloadIcon).toBeInTheDocument();
  });
});
