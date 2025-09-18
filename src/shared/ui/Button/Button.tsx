import { ReactNode } from 'react';
import { cn } from '@/shared/utils';
type ButtonClickHandler = ((event: React.MouseEvent<HTMLButtonElement>) => void) | (() => void);

type Props = {
  text: string | ReactNode;
  type?: 'submit' | 'button';
  onClick?: ButtonClickHandler;
  disabled?: boolean;
  width?: number | string;
  ariaLabel?: string;
  colorStyle?: 'primary' | 'secondary';
};

export const Button = ({
  text,
  onClick,
  width,
  type = 'button',
  disabled = false,
  ariaLabel,
  colorStyle = 'primary',
}: Props) => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) {
      event.preventDefault();
      return;
    }
    if (onClick) {
      if (onClick.length > 0) {
        onClick(event);
      } else {
        (onClick as () => void)();
      }
    }
  };
  const baseClasses = `w-full rounded-xl px-6 py-3 text-lg font-semibold transition duration-200 ease-in-out focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500 sm:w-auto cursor-pointer`;
  const colorClasses = {
    primary: cn('bg-main-light text-text-inverse hover:bg-green-700', baseClasses),
    secondary: cn(
      'bg-transparent text-main-dark hover:scale-105 hover:bg-main-light hover:text-text-inverse',
      baseClasses
    ),
  };
  return (
    <button
      type={type}
      style={{ width }}
      onClick={handleClick}
      disabled={disabled}
      aria-disabled={disabled}
      aria-label={ariaLabel}
      className={colorClasses[colorStyle]}
    >
      {text}
    </button>
  );
};
