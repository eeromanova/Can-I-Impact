import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { InputOptions } from './InputOptions';

const options = [
  { id: '1', value: 'Option 1' },
  { id: '2', value: 'Option 2' },
];

describe('InputOptions', () => {
  test('renders all options and highlights selected', () => {
    render(
      <InputOptions
        options={options}
        selectedId='2'
      />
    );

    const btn1 = screen.getByRole('button', { name: /option 1/i });
    const btn2 = screen.getByRole('button', { name: /option 2/i });

    expect(btn1).toBeInTheDocument();
    expect(btn2).toBeInTheDocument();

    expect(btn1).toHaveAttribute('data-color', 'secondary');
    expect(btn2).toHaveAttribute('data-color', 'primary');
  });

  test('calls onSelect with correct id when clicked', async () => {
    const user = userEvent.setup();
    const handleSelect = jest.fn();

    render(
      <InputOptions
        options={options}
        selectedId={null}
        onSelect={handleSelect}
      />
    );

    const btn1 = screen.getByRole('button', { name: /option 1/i });
    const btn2 = screen.getByRole('button', { name: /option 2/i });

    await user.click(btn1);
    expect(handleSelect).toHaveBeenCalledWith('1');

    await user.click(btn2);
    expect(handleSelect).toHaveBeenCalledWith('2');
  });
});
