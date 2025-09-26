import { fireEvent, render, screen } from '@testing-library/react';
import { Input } from './Input';

describe('Input (critical behavior)', () => {
  test('renders with placeholder and initial value', () => {
    render(
      <Input
        placeholder='Enter number'
        value='123'
      />
    );
    const input = screen.getByPlaceholderText(/enter number/i) as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.value).toBe('123');
  });

  test('calls onChange with new value when user types numbers', async () => {
    const handleChange = jest.fn();
    render(
      <Input
        placeholder='Enter number'
        onChange={handleChange}
      />
    );
    const input = screen.getByPlaceholderText(/enter number/i) as HTMLInputElement;
    fireEvent.change(input, { target: { value: '456' } });
    expect(handleChange).toHaveBeenCalledWith('456');
  });

  test('filters out non-numeric input', async () => {
    const handleChange = jest.fn();
    render(
      <Input
        placeholder='Enter number'
        onChange={handleChange}
      />
    );
    const input = screen.getByPlaceholderText(/enter number/i) as HTMLInputElement;

    fireEvent.change(input, { target: { value: '12a3b' } });
    expect(handleChange).toHaveBeenCalledWith('123');
  });

  test('calls onBlur callback', () => {
    const handleBlur = jest.fn();
    render(
      <Input
        placeholder='Enter number'
        onBlur={handleBlur}
      />
    );
    const input = screen.getByPlaceholderText(/enter number/i);

    fireEvent.blur(input); // явно вызываем blur
    expect(handleBlur).toHaveBeenCalledTimes(1);
  });

  test('passes name attribute correctly', () => {
    render(
      <Input
        placeholder='Enter number'
        name='age'
      />
    );
    const input = screen.getByPlaceholderText(/enter number/i);
    expect(input).toHaveAttribute('name', 'age');
  });
});
