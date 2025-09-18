'use client';
import { useState } from 'react';
import { OnePageQuestions } from '@/features/questions';
import { ProgressBar } from '@/features/progress-bar';
import { PagesToggler } from '@/features/pages-toggler';

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
  const [currentPage, setCurrentPage] = useState<string>(initialPage);

  const CurrentComponent = Pages.find((page) => page.id === currentPage)?.component || (
    <OnePageQuestions page='house' />
  );
  return (
    <div className='flex w-full flex-col gap-4'>
      {CurrentComponent}
      <PagesToggler
        currentPage={currentPage}
        onHandleClickBack={() => setCurrentPage(Number(currentPage) - 1 + '')}
        onHandleClickNext={() => setCurrentPage(Number(currentPage) + 1 + '')}
      />
      <ProgressBar
        current={Number(currentPage) + 1}
        total={Pages.length}
      />
    </div>
  );
};
