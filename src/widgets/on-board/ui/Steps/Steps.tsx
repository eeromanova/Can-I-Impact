type Props = {
  steps: string[];
};
const DELAY = 500;
export const Steps = ({ steps }: Props) => {
  return (
    <div className='space-y-10'>
      {steps.map((step, index) => (
        <div
          key={index}
          className='animate-fade-in flex items-start space-x-4 opacity-0'
          style={{ animationDelay: `${index * DELAY}ms` }}
        >
          <span className='flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-green-500 text-base font-bold text-white'>
            {index + 1}
          </span>
          <span
            className='animate-fade-in text-left text-2xl text-gray-700 opacity-0'
            style={{ animationDelay: `${index * DELAY}ms` }}
          >
            {step}
          </span>
        </div>
      ))}
    </div>
  );
};
