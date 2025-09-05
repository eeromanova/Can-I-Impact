import { useLanguage } from '@/app/context/LanguageProvider';
import { Input } from '@/shared/ui';
import { OneQuestion } from '../OneQuestion/OneQuestion';
import { SurveySection, SurveyQuestion } from '../../model/types';

export const House = () => {
  const { tArray, tString, tObjectArray } = useLanguage();
  const surveyData: SurveySection = {
    title: tString('house.title'),
    questions: tObjectArray('house.questions') as SurveyQuestion[],
  };
  return (
    <div className='mx-auto flex max-w-md flex-col gap-6 p-4'>
      <h2 className='text-main-light text-center text-3xl font-medium'>{surveyData.title}</h2>
      {surveyData.questions.map((question) => (
        <OneQuestion
          key={question.input.id}
          text={question.question}
          note={question.note}
        />
      ))}
    </div>
  );
};
