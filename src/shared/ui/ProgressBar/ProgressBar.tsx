import { usePagination } from '@/shared/utils';
type ProgressBarProps = {
  currentPage: number;
  totalPages: number;
};

export const ProgressBar = ({ currentPage, totalPages }: ProgressBarProps) => {
  console.log(currentPage, totalPages);
  const { totalSafe, currentPageSafe } = usePagination(currentPage, totalPages);
  return (
    <div className='flex w-full justify-center'>
      <progress
        role='progressbar'
        aria-valuenow={currentPageSafe}
        aria-valuemax={totalSafe}
        className='progress border-main-light [&::-moz-progress-bar]:bg-main-light [&::-webkit-progress-value]:bg-main-light mx-auto h-[5px] w-[80%] rounded-4xl border bg-transparent [&::-webkit-progress-bar]:bg-transparent'
        value={currentPageSafe}
        max={totalSafe}
      ></progress>
    </div>
  );
};
