'use client';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/app/context/LanguageProvider';
import { useQuestionsStorage } from '@/shared/utils/hooks/useQuestionsStorage';
import { Vector } from '@/shared/assets';
type Props = {
  onHandleClickBack: () => void;
  onHandleClickNext: () => void;
  currentPage: string;
};

export const PagesToggler = ({ currentPage, onHandleClickBack, onHandleClickNext }: Props) => {
  const router = useRouter();
  const { clearAnswers } = useQuestionsStorage();
  const { tString } = useLanguage();
  const onHandleBack = () => {
    document.cookie = `currentPage=${Number(currentPage) - 1}; path=/; max-age=31536000`;
    onHandleClickBack();
  };
  const onHandleNext = () => {
    document.cookie = `currentPage=${Number(currentPage) + 1}; path=/; max-age=31536000`;
    onHandleClickNext();
  };
  const onGetResults = () => {
    document.cookie = 'currentPage=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    router.push('/results');
    clearAnswers();
  };
  return (
    <div className='flex w-full items-center justify-between'>
      {currentPage !== '1' && (
        <button
          className='mr-auto'
          onClick={() => {
            onHandleBack();
          }}
        >
          <Vector isNext={false} />
        </button>
      )}

      <button
        className='ml-auto'
        onClick={() => {
          if (currentPage === '4') {
            onGetResults();
          } else {
            onHandleNext();
          }
        }}
      >
        {currentPage !== '4' ? <Vector /> : tString('getResultsButton.text')}
      </button>
    </div>
  );
};
