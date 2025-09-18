import { useFormContext, useController } from 'react-hook-form';
import { DELAY } from '@/shared/model/constant';

import { Input, InputOptions } from '@/shared/ui';
import { useQuestionsStorage } from '@/shared/utils';
import { useEffect } from 'react';
import { useLanguage } from '@/app/context/LanguageProvider';
type Props = {
  text: string;
  defaultValue?: string;
  index: number;
  input: {
    id: string;
    placeholder?: string;
    patternMessage?: string;
    options?: string[];
    default?: string;
    watchedField?: {
      id: string;
      value: string;
    };
  };
};
export const OneQuestion = ({ text, defaultValue, input, index }: Props) => {
  const { saveAnswer, getAnswer, isHydrated } = useQuestionsStorage();
  const { tString } = useLanguage();
  const { control, watch } = useFormContext();
  const watchedValue = input.watchedField ? watch(input.watchedField.id) : undefined;
  const savedValue = getAnswer(input.id) as string | '';
  const { field } = useController({
    name: input.id,
    control,
    defaultValue: savedValue ?? input.default ?? '',
  });

  useEffect(() => {
    if (!isHydrated) return;
    const ls = getAnswer(input.id) as string | '';
    if (ls && ls !== field.value) {
      field.onChange(ls);
      return;
    }
    const jsonDefault = input.default ?? '';
    if (!ls && jsonDefault && (field.value === '' || field.value == null)) {
      field.onChange(String(jsonDefault));
    }
  }, [isHydrated]);
  const handleBlur = () => {
    saveAnswer(input.id, field.value ?? '');
    field.onBlur();
  };
  const handleChange = (value: string) => {
    field.onChange(value);
  };
  const handleChangeOptions = (value: string) => {
    field.onChange(value);
    saveAnswer(input.id, value ?? '');
  };
  if (input.watchedField?.id !== '' && watchedValue !== input.watchedField?.value) {
    return null;
  }
  const renderedInput = () => {
    if (input.options?.length) {
      return (
        <InputOptions
          options={input.options}
          selected={String(field.value ?? '')}
          onSelect={handleChangeOptions}
        />
      );
    } else
      return (
        <Input
          value={String(field.value ?? '')}
          onBlur={handleBlur}
          onChange={handleChange}
          name={input.id}
          placeholder={input.placeholder}
        />
      );
  };
  return (
    <div
      className='animate-fade-in flex flex-col gap-2 opacity-0'
      style={{ animationDelay: `${index * DELAY.half_second}ms` }}
    >
      <p className='text-2xl font-medium'>{text}</p>
      <p className='text-s font-light'>{`${tString('averageInfo.text')} ${defaultValue}`}</p>
      {renderedInput()}
    </div>
  );
};
