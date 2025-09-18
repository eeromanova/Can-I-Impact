import { cn } from '@/shared/utils';
import { ChangeEvent } from 'react';

type Props = {
  placeholder?: string;
  value?: string;
  onBlur?: () => void;
  name?: string;
  onChange?: (value: string) => void;
};

export const Input = ({ placeholder, value, onBlur, name, onChange }: Props) => {
  const inputClasses = cn(
    'w-full px-3 py-2 text-sm rounded-md outline-none',
    'border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent',
    '[&:placeholder-shown]:border-green-400',
    '[&:not(:placeholder-shown)]:border-transparent'
  );
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };
  return (
    <input
      placeholder={placeholder || ' '}
      name={name}
      value={value ?? ''}
      onBlur={onBlur}
      className={inputClasses}
      onChange={handleChange}
      onInput={(e) => {
        e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, '');
      }}
      type='text'
      inputMode='numeric'
    />
  );
};
