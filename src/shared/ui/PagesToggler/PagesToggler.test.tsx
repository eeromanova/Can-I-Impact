import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PagesToggler } from './PagesToggler';

jest.mock('../../utils', () => ({
  ...jest.requireActual('../../utils'),
  usePagination: jest.fn(),
}));

import { usePagination } from '@/shared/utils';
describe('PagesToggler', () => {
  const onBack = jest.fn();
  const onNext = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders both buttons when in middle page', async () => {
    // Замоканные значения хука
    (usePagination as jest.Mock).mockReturnValue({
      totalSafe: 5,
      currentPageSafe: 3,
    });

    render(
      <PagesToggler
        currentPage={3}
        totalPages={5}
        onHandleClickBack={onBack}
        onHandleClickNext={onNext}
      />
    );

    const user = userEvent.setup();

    const backBtn = screen.getByRole('button', { name: /back/i });
    const nextBtn = screen.getByRole('button', { name: /next/i });

    expect(backBtn).toBeInTheDocument();
    expect(nextBtn).toBeInTheDocument();

    await user.click(backBtn);
    expect(onBack).toHaveBeenCalledTimes(1);

    await user.click(nextBtn);
    expect(onNext).toHaveBeenCalledTimes(1);
  });

  test('hides back button on first page', () => {
    (usePagination as jest.Mock).mockReturnValue({
      totalSafe: 5,
      currentPageSafe: 1,
    });

    render(
      <PagesToggler
        currentPage={1}
        totalPages={5}
        onHandleClickBack={onBack}
        onHandleClickNext={onNext}
      />
    );

    expect(screen.queryByRole('button', { name: /back/i })).toBeNull();
    expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument();
  });

  test('hides next button on last page', () => {
    (usePagination as jest.Mock).mockReturnValue({
      totalSafe: 5,
      currentPageSafe: 5,
    });

    render(
      <PagesToggler
        currentPage={5}
        totalPages={5}
        onHandleClickBack={onBack}
        onHandleClickNext={onNext}
      />
    );

    expect(screen.getByRole('button', { name: /back/i })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /next/i })).toBeNull();
  });
});
