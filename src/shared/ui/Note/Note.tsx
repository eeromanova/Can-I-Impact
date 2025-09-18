import { useLanguage } from '@/app/context/LanguageProvider';
import { IconNote } from '@/shared/assets';

export const Note = () => {
  const { tString } = useLanguage();

  return (
    <div className='clearfix w-full'>
      <div className='float-left mr-1 h-[24] w-[24]'>
        <IconNote />
      </div>
      <p>{tString('note.text')}</p>
    </div>
  );
};
