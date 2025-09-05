import { InputHTMLAttributes } from 'react';

import { cn } from '@/shared/utils';

type InputType = 'text' | 'number' | 'checkbox';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  errorMessage?: string;
};

export const Input = ({ label, errorMessage, ...props }: InputProps) => {
  const inputClasses = cn(
    'w-full px-3 py-2 text-sm rounded-md outline-none transition-all duration-200',
    'border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent',
    '[&:placeholder-shown]:border-green-400',
    '[&:not(:placeholder-shown)]:border-transparent',

    errorMessage && 'border-red-500 focus:ring-red-500'
  );

  return (
    <div className='flex w-full flex-col gap-1'>
      {label && <label className='text-sm font-medium text-gray-700'>{label}</label>}
      <input
        {...props}
        placeholder={props.placeholder || ' '}
        className={inputClasses}
      />
      {errorMessage && <span className='text-xs text-red-500'>{errorMessage}</span>}
    </div>
  );
};
