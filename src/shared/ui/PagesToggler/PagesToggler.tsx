import { Vector } from '@/shared/assets';
type Props = {
  onHandleClickBack: () => void;
  onHandleClickNext: () => void;
  currentPage: string;
};

export const PagesToggler = ({ currentPage, onHandleClickBack, onHandleClickNext }: Props) => {
  return (
    <div className='flex w-full items-center justify-between'>
      {currentPage !== '1' && (
        <button
          className='mr-auto'
          onClick={() => {
            onHandleClickBack();
          }}
        >
          <Vector isNext={false} />
        </button>
      )}
      {currentPage !== '4' && (
        <button
          className='ml-auto'
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
