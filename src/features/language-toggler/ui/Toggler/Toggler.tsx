import { useState } from 'react';

import { useLanguage, SupportedLang, SUPPORTED_LANGUAGES } from '@/app/context/LanguageProvider';
import { Check, Arrow } from '@/shared/assets';
export const Toggler = () => {
  const { lang, switchLanguage, tString } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const handleLanguageChange = (newLang: SupportedLang) => {
    switchLanguage(newLang);
    setIsOpen(false);
  };
  return (
    <div className='relative inline-block'>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='flex items-center gap-2 rounded border border-gray-300 px-2 py-2 text-white transition-colors hover:bg-gray-50'
        aria-label={tString('header.switchLanguage')}
        aria-expanded={isOpen}
      >
        <span className='flex-1'>{lang.toUpperCase()}</span>
        <Arrow isOpen={isOpen} />
      </button>
      {isOpen && (
        <div className='ring-opacity-5 absolute right-0 z-10 mt-2 w-32 rounded-md bg-white shadow-lg ring-1 ring-black focus:outline-none'>
          <div
            className='py-1'
            role='menu'
            aria-orientation='vertical'
          >
            {SUPPORTED_LANGUAGES.map((languageCode) => (
              <button
                key={languageCode}
                onClick={() => {
                  handleLanguageChange(languageCode);
                }}
                className={`flex w-full items-center px-4 py-2 text-left text-sm transition-colors ${
                  lang === languageCode
                    ? 'bg-green-100 font-medium text-green-900'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                }`}
                role='menuitem'
              >
                <span className='flex-1'>{languageCode.toUpperCase()}</span>
                {lang === languageCode && <Check />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
