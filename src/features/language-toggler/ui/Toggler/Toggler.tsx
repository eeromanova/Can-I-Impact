import { useLanguage, SUPPORTED_LANGUAGES } from '@/app/context/LanguageProvider';
import { cn } from '@/shared/utils';

export const Toggler = () => {
  const { lang, switchLanguage, tString } = useLanguage();
  return (
    <div className='flex space-x-2'>
      {SUPPORTED_LANGUAGES.map((languageCode) => {
        const isActive = lang === languageCode;

        const buttonClass = cn(
          'flex items-center gap-2 rounded-2xl px-4 py-2 transition-colors cursor-pointer',
          isActive && 'font-medium bg-green-900 text-white',
          !isActive && 'text-green-900 hover:bg-gray-100 hover:text-gray-900'
        );

        return (
          <button
            key={languageCode}
            onClick={() => switchLanguage(languageCode)}
            className={buttonClass}
            aria-label={tString('header.switchLanguage')}
          >
            <span className='flex-1'>{languageCode.toUpperCase()}</span>
          </button>
        );
      })}
    </div>
  );
};
