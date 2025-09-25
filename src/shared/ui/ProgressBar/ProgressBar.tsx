type ProgressBarProps = {
  currentPage: number;
  total: number;
};
export const ProgressBar = ({ currentPage, total }: ProgressBarProps) => {
  return (
    <div className='flex w-full justify-center'>
      <progress
        className='progress border-main-light [&::-moz-progress-bar]:bg-main-light [&::-webkit-progress-value]:bg-main-light mx-auto h-[5px] w-[80%] rounded-4xl border bg-transparent [&::-webkit-progress-bar]:bg-transparent'
        value={currentPage - 1}
        max={total}
      ></progress>
    </div>
  );
};
