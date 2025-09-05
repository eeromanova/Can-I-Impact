'use client';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/app/context/LanguageProvider';
import { Button } from '@/shared/ui';
import { Steps } from '../Steps/Steps';
export const OnBoard = () => {
  const { tArray, tString } = useLanguage();
  const router = useRouter();
  const onboardingSteps = tArray('onBoarding.steps');
  return (
    <div className='flex w-full flex-col items-center justify-center gap-10 text-center'>
      <h2 className='animate-fade-in-delay-200 text-main-light text-center text-3xl font-medium opacity-0'>
        {tString('onBoarding.title')}
      </h2>
      <Steps steps={onboardingSteps} />

      <Button
        text={tString('onBoarding.button')}
        ariaLabel={tString('onBoarding.button')}
        onClick={() => router.push('questions')}
      />
    </div>
  );
};
