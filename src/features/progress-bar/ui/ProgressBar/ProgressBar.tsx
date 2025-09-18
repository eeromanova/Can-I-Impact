type ProgressBarProps = {
  current: number;
  total: number;
};
export const ProgressBar = ({ current, total }: ProgressBarProps) => {
  return (
    <div className='flex w-full justify-center'>
      <progress
        className='progress border-main-light [&::-moz-progress-bar]:bg-main-light [&::-webkit-progress-value]:bg-main-light mx-auto h-[8px] w-[80%] rounded-3xl border bg-transparent [&::-webkit-progress-bar]:bg-transparent'
        value={current - 1}
        max={total}
      ></progress>
    </div>
  );
};
