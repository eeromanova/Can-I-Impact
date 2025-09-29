import { Vector } from '@/shared/assets';
import { usePagination } from '@/shared/utils';

type Props = {
  onHandleClickBack: () => void;
  onHandleClickNext: () => void;
  currentPage: number;
  totalPages: number;
};

export const PagesToggler = ({
  currentPage,
  totalPages,
  onHandleClickBack,
  onHandleClickNext,
}: Props) => {
  const { totalSafe, currentPageSafe } = usePagination(currentPage, totalPages);
  return (
    <div className='flex w-full items-center justify-between'>
      {currentPageSafe !== 1 && (
        <button
          className='mr-auto'
          aria-label='back'
          onClick={() => {
            onHandleClickBack();
          }}
        >
          <Vector isNext={false} />
        </button>
      )}
      {currentPageSafe !== totalSafe && (
        <button
          className='ml-auto'
          aria-label='next'
          onClick={() => {
            onHandleClickNext();
          }}
        >
          <Vector />
        </button>
      )}
    </div>
  );
};
