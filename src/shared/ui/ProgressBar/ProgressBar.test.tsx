import React from 'react';
import { render, screen } from '@testing-library/react';
import { ProgressBar } from './ProgressBar';

describe('ProgressBar', () => {
  test('renders progress element', () => {
    render(
      <ProgressBar
        currentPage={1}
        totalPages={5}
      />
    );
    const progress = screen.getByRole('progressbar');
    expect(progress).toBeInTheDocument();
  });

  test('sets value and max attributes according to props', () => {
    render(
      <ProgressBar
        currentPage={3}
        totalPages={10}
      />
    );
    const progress = screen.getByRole('progressbar') as HTMLProgressElement;
    expect(progress.value).toBe(3);
    expect(progress.max).toBe(10);
  });

  test('handles edge cases: currentPage = 1 -> value = 0', () => {
    render(
      <ProgressBar
        currentPage={1}
        totalPages={4}
      />
    );
    const progress = screen.getByRole('progressbar') as HTMLProgressElement;
    expect(progress.value).toBe(1);
    expect(progress.max).toBe(4);
  });

  test('handles currentPage greater than total', () => {
    render(
      <ProgressBar
        currentPage={10}
        totalPages={5}
      />
    );
    const progress = screen.getByRole('progressbar') as HTMLProgressElement;
    expect(progress.value).toBe(5);
    expect(progress.max).toBe(5);
    expect(progress).toHaveAttribute('aria-valuenow', '5');
  });
  test('optional: if aria attributes are present they reflect props', () => {
    render(
      <ProgressBar
        currentPage={2}
        totalPages={6}
      />
    );
    const progress = screen.getByRole('progressbar') as HTMLProgressElement;
    if (progress.hasAttribute('aria-valuenow')) {
      expect(progress).toHaveAttribute('aria-valuenow', '2');
      expect(progress).toHaveAttribute('aria-valuemax', '6');
    }
  });
});
