'use client';
import { useForm, FormProvider } from 'react-hook-form';

import { useLanguage, TranslationKey } from '@/app/context/LanguageProvider';
import { OneQuestion } from '../OneQuestion/OneQuestion';
import { SurveySection, SurveyQuestion } from '../../model/types';
import { Note } from '@/shared/ui';

type Props = {
  page: string;
};
export const OnePageQuestions = ({ page }: Props) => {
  const { tArray, tString, tObjectArray } = useLanguage();
  const getTranslatedQuestion = (index: number): SurveyQuestion => ({
    question: tString(`${page}.questions.${index}.question` as TranslationKey),
    defaultValue: tString(`${page}.questions.${index}.defaultValue` as TranslationKey),
    input: {
      id: tString(`${page}.questions.${index}.input.id` as TranslationKey),
      placeholder: tString(`${page}.questions.${index}.input.placeholder` as TranslationKey),
      options: tObjectArray(`${page}.questions.${index}.input.options` as TranslationKey).map(
        (_, i) => ({
          id: tString(`${page}.questions.${index}.input.options.${i}.id` as TranslationKey),
          value: tString(`${page}.questions.${index}.input.options.${i}.value` as TranslationKey),
        })
      ),
      patternMessage: tString(`${page}.questions.${index}.input.patternMessage` as TranslationKey),
      default:
        tString(`${page}.questions.${index}.input.defaultValue` as TranslationKey) || undefined,
      watchedField: {
        id: tString(`${page}.questions.${index}.input.watchedField.id` as TranslationKey),
        value: tArray(`${page}.questions.${index}.input.watchedField.value` as TranslationKey),
      },
    },
  });

  const surveyData: SurveySection = {
    title: tString(`${page}.title` as TranslationKey),
    questions: tObjectArray(`${page}.questions` as TranslationKey).map((_, index) =>
      getTranslatedQuestion(index)
    ),
  };
  const methods = useForm<FormData>({
    mode: 'onBlur',
    defaultValues: {},
  });
  return (
    <FormProvider {...methods}>
      <form className='mx-auto flex flex-col gap-6 p-4'>
        <h2 className='text-main-light text-center text-3xl font-medium'>{surveyData.title}</h2>
        <Note />
        {surveyData.questions.map((question) => (
          <OneQuestion
            key={question.input.id}
            text={question.question}
            defaultValue={question.defaultValue}
            input={question.input}
          />
        ))}
      </form>
    </FormProvider>
  );
};
