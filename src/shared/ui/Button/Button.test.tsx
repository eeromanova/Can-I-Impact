import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button (critical behavior)', () => {
  test('renders provided text and is accessible by role/name', () => {
    render(<Button text='Click me' />);
    const btn = screen.getByRole('button', { name: /click me/i });
    expect(btn).toBeInTheDocument();
  });

  test('has default type="button" to avoid accidental form submit', () => {
    render(<Button text='DefaultType' />);
    const btn = screen.getByRole('button', { name: /defaulttype/i });
    expect(btn).toHaveAttribute('type', 'button');
  });

  test('disabled prevents click handler and exposes aria-disabled', async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();
    render(
      <Button
        text='Disabled'
        onClick={onClick}
        disabled
      />
    );

    const btn = screen.getByRole('button', { name: /disabled/i });

    // disabled DOM property
    expect(btn).toBeDisabled();
    // aria-disabled for accessibility
    expect(btn).toHaveAttribute('aria-disabled', 'true');

    // try to click it
    await user.click(btn);
    expect(onClick).not.toHaveBeenCalled();
  });

  test('calls onClick when enabled', async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();
    render(
      <Button
        text='Enabled'
        onClick={onClick}
      />
    );

    const btn = screen.getByRole('button', { name: /enabled/i });
    await user.click(btn);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
