import { arch } from 'os';
import { ReactNode } from 'react';
type ButtonClickHandler = ((event: React.MouseEvent<HTMLButtonElement>) => void) | (() => void);

type Props = {
  text: string | ReactNode;
  type?: 'submit' | 'button';
  onClick?: ButtonClickHandler;
  disabled?: boolean;
  width?: number | string;
  ariaLabel?: string;
};

export const Button = ({
  text,
  onClick,
  width,
  type = 'button',
  disabled = false,
  ariaLabel,
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
  return (
    <button
      type={type}
      style={{ width }}
      onClick={handleClick}
      disabled={disabled}
      aria-disabled={disabled}
      aria-label={ariaLabel}
      className={`bg-main-light text-text-inverse w-full rounded-xl px-6 py-3 text-lg font-semibold transition duration-200 ease-in-out hover:bg-green-700 focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500 sm:w-auto`}
    >
      {text}
    </button>
  );
};
