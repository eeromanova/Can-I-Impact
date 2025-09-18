'use client';
import { useLanguage } from '@/app/context/LanguageProvider';
import { Toggler } from '@/features/language-toggler';

export const Header = () => {
  const { tString } = useLanguage();

  return (
    <header className='flex w-full items-center justify-between rounded-b-2xl bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-4 shadow-md'>
      <h1 className='text-2xl font-bold tracking-tight text-white drop-shadow-md md:text-3xl'>
        {tString('header.logo')}
      </h1>
      <Toggler />
    </header>
  );
};
