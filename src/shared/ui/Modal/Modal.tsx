import { useEffect, useRef, useState } from 'react';
import { Close } from '@/shared/assets';
type ModalProps<T extends HTMLElement = HTMLElement> = {
  isOpen: boolean;
  onClose: () => void;
  content: React.ReactNode | string;
  width?: number;
  height?: string;
  top?: number;
  parentRef?: React.RefObject<T>;
};
export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  content,
  width,
  height,
  parentRef,
  top,
}) => {
  const popoverRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ top: 0, right: 0 });
  useEffect(() => {
    if (isOpen && parentRef?.current) {
      const rect = parentRef.current.getBoundingClientRect();
      const scrollY = window.scrollY;
      const scrollX = window.scrollX;
      const correctedRight = width ? width : 0;
      const correctedTop = top ? top : 0;

      setPosition({
        top: rect.top + scrollY + correctedTop,
        right: rect.left + scrollX - correctedRight,
      });
    }
  }, [isOpen, width, parentRef]);
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(e.target as Node) &&
        parentRef?.current &&
        !parentRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    };
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose, parentRef]);
  if (!isOpen) return null;
  console.log(position);
  return (
    <div
      ref={popoverRef}
      className='animate-show fixed m-0 rounded-tl-3xl rounded-br-3xl border-none bg-transparent shadow-[0_0_20px_rgba(0,0,0,0.1)]'
      onClick={onClose}
      style={{
        width: `${width}px` || 'auto',
        height: height || 'auto',
        top: `${position.top}px`,
        right: `${position.right}px`,
      }}
    >
      <div
        className='relative flex h-full w-full flex-col items-stretch gap-5 rounded-tl-3xl rounded-br-3xl bg-white p-8 shadow-lg focus:outline-none dark:bg-black'
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeButtonRef}
          type='button'
          className='absolute top-[15px] right-[15px] max-w-[25px] cursor-pointer border-none bg-none hover:scale-110 focus:outline-none'
          onClick={onClose}
          aria-label='close'
        >
          <Close />
        </button>
        {content}
      </div>
    </div>
  );
};
