import React from 'react';
import {
  render, screen, fireEvent, waitFor,
} from '@testing-library/react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import domtoimage from 'dom-to-image';
import CaptureButton from './CaptureButton';

// Add FontAwesome icons to library
library.add(fas);

// Mock dom-to-image
jest.mock('dom-to-image', () => ({
  toPng: jest.fn(),
}));

describe('CaptureButton', () => {
  let mockIconCanvas;
  let originalGetElementById;
  let mockWindowOpen;

  beforeEach(() => {
    jest.clearAllMocks();

    // Save originals first
    originalGetElementById = document.getElementById;

    // Mock icon-canvas element
    mockIconCanvas = document.createElement('div');
    mockIconCanvas.id = 'icon-canvas';
    document.getElementById = jest.fn((id) => {
      if (id === 'icon-canvas') return mockIconCanvas;
      return originalGetElementById.call(document, id);
    });

    // Mock window.open
    mockWindowOpen = {
      document: {
        write: jest.fn(),
        close: jest.fn(),
      },
    };
    window.open = jest.fn(() => mockWindowOpen);

    // Setup successful dom-to-image mock
    domtoimage.toPng.mockResolvedValue('data:image/png;base64,mockdata');
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
    fireEvent.click(captureButton);

    await waitFor(() => {
      expect(domtoimage.toPng).toHaveBeenCalledWith(mockIconCanvas);
    });
  });

  it('opens new window with image after capture', async () => {
    render(<CaptureButton />);

    const captureButton = screen.getByText('Capture').closest('button');
    fireEvent.click(captureButton);

    await waitFor(() => {
      expect(window.open).toHaveBeenCalled();
      expect(mockWindowOpen.document.write).toHaveBeenCalled();
      expect(mockWindowOpen.document.close).toHaveBeenCalled();
    });
  });

  it('shows dropdown menu with download option', () => {
    const { container } = render(<CaptureButton />);

    const toggle = container.querySelector('.dropdown-toggle-split');
    fireEvent.click(toggle);

    expect(screen.getByText('Capture & Download')).toBeInTheDocument();
  });

  it('calls dom-to-image when capture & download clicked', async () => {
    const { container } = render(<CaptureButton />);

    // Open dropdown
    const toggle = container.querySelector('.dropdown-toggle-split');
    fireEvent.click(toggle);

    // Click download button
    const downloadButton = screen.getByText('Capture & Download').closest('button');
    fireEvent.click(downloadButton);

    await waitFor(() => {
      expect(domtoimage.toPng).toHaveBeenCalledWith(mockIconCanvas);
    });
  });

  it('handles dom-to-image error gracefully', async () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
    domtoimage.toPng.mockRejectedValue(new Error('Capture failed'));

    render(<CaptureButton />);

    const captureButton = screen.getByText('Capture').closest('button');
    fireEvent.click(captureButton);

    await waitFor(() => {
      expect(consoleError).toHaveBeenCalledWith(
        'oops, something went wrong!',
        expect.any(Error),
      );
    });

    consoleError.mockRestore();
  });

  it('renders magic icon on capture button', () => {
    const { container } = render(<CaptureButton />);
    const svgIcon = container.querySelector('svg[data-icon="magic"]');
    expect(svgIcon).toBeInTheDocument();
  });

  it('renders download icon in dropdown', () => {
    const { container } = render(<CaptureButton />);

    const toggle = container.querySelector('.dropdown-toggle-split');
    fireEvent.click(toggle);

    const downloadIcon = container.querySelector('svg[data-icon="download"]');
    expect(downloadIcon).toBeInTheDocument();
  });
});
