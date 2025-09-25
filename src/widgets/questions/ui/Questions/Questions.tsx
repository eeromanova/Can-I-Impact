'use client';
import { useLanguage } from '@/app/context/LanguageProvider';
import { OnePageQuestions } from '@/features/questions';
import { ProgressBar, PagesToggler, Button } from '@/shared/ui';
import { useQuestionsStorage } from '@/shared/utils';
import { useRouter, useSearchParams } from 'next/navigation';

interface QuestionsClientProps {
  initialPage: string;
}
const Pages = [
  { id: '1', component: <OnePageQuestions page='house' /> },
  { id: '2', component: <OnePageQuestions page='transport' /> },
  { id: '3', component: <OnePageQuestions page='eating' /> },
  { id: '4', component: <OnePageQuestions page='consumption' /> },
];
export const Questions = ({ initialPage }: QuestionsClientProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { tString } = useLanguage();

  const { clearAnswers } = useQuestionsStorage();
  const urlPage = searchParams?.get('page') ?? initialPage ?? '1';
  const currentPage = ((): string => {
    const n = Number(urlPage);
    if (!Number.isFinite(n) || n < 1) return '1';
    if (n > Pages.length) return String(Pages.length);
    return String(n);
  })();

  const CurrentComponent = Pages.find((page) => page.id === currentPage)?.component || (
    <OnePageQuestions page='house' />
  );
  const goTo = (page: number) => {
    const next = Math.max(1, Math.min(page, Pages.length));
    const url = `/questions?page=${next}`;
    router.push(url);
  };
  const onHandleResults = () => {
    window.history.replaceState(window.history.state, '', '/questions?page=1');
    router.push('/results');
    clearAnswers();
  };
  return (
    <div className='flex w-full flex-col items-center gap-10'>
      {CurrentComponent}
      <PagesToggler
        currentPage={currentPage}
        onHandleClickBack={() => goTo(Number(currentPage) - 1)}
        onHandleClickNext={() => goTo(Number(currentPage) + 1)}
      />
      <ProgressBar
        currentPage={Number(currentPage) + 1}
        total={Pages.length}
      />
      {currentPage === '4' && (
        <Button
          text={tString('getResultsButton.text')}
          ariaLabel={tString('getResultsButton.text')}
          onClick={onHandleResults}
        />
      )}
    </div>
  );
};
