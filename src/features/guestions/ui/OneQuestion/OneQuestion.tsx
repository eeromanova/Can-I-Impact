import { Input, Modal } from '@/shared/ui';
import { Note } from '@/shared/assets';
import { useRef, useState } from 'react';
type Props = {
  text: string;
  note?: string;
  id?: string;
};

export const OneQuestion = ({ text, note, id }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <div>
      <p className='mb-2 block text-2xl font-medium'>{text}</p>
      <div className='flex items-center gap-2'>
        <Input />
        {note !== '' && (
          <div>
            <button
              onClick={() => setIsOpen(true)}
              aria-label='note'
              className='p-1'
              ref={buttonRef}
            >
              <Note />
            </button>
            <Modal
              isOpen={isOpen}
              onClose={() => setIsOpen(false)}
              width={300}
              content={note}
              parentRef={buttonRef as React.RefObject<HTMLElement>}
            />
          </div>
        )}
      </div>
    </div>
  );
};
