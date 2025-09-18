'use client';
import { useLanguage } from '@/app/context/LanguageProvider';
import { Button } from '@/shared/ui';
import { useRouter } from 'next/navigation';
export const Home = () => {
  const { tString } = useLanguage();
  const router = useRouter();
  return (
    <div className='flex w-full flex-col items-center justify-center gap-10 text-center'>
      <h2 className='animate-fade-in text-main-dark mb-6 text-center text-5xl font-bold opacity-0'>
        {tString('home.title')}
      </h2>

      <h3 className='animate-fade-in-delay-200 text-main-light text-center text-3xl font-medium opacity-0'>
        {tString('home.subtitle')}
      </h3>

      <p className='animate-fade-in-delay-400 text-g-gray-dark mx-auto max-w-3xl text-center text-xl leading-relaxed opacity-0'>
        {tString('home.description')}
      </p>
      <Button
        text={tString('home.button')}
        onClick={() => router.push('/on-boarding')}
        ariaLabel={tString('home.button')}
      />
    </div>
  );
};
