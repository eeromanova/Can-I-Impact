import { useFormContext, useController } from 'react-hook-form';
import { DELAY } from '@/shared/model/constant';

import { Input, InputOptions } from '@/shared/ui';
import { useQuestionsStorage } from '@/shared/utils';
import { Option } from '@/shared/model/types';
import { useEffect, useMemo } from 'react';
import { useLanguage } from '@/app/context/LanguageProvider';
type Props = {
  text: string;
  defaultValue?: string;
  input: {
    id: string;
    placeholder?: string;
    patternMessage?: string;
    options?: Option[];
    default?: string;
    watchedField?: {
      id: string;
      value: string[];
    };
  };
};
export const OneQuestion = ({ text, defaultValue, input }: Props) => {
  const { saveAnswer, getAnswer, isHydrated } = useQuestionsStorage();
  const { tString } = useLanguage();
  const { control, watch } = useFormContext();
  const watchedValue = input.watchedField ? watch(input.watchedField.id) : undefined;

  const savedId = getAnswer(input.id);
  const findById = (id?: string | null) => input.options?.find((o) => o.id === String(id));
  const { field } = useController({
    name: input.id,
    control,
    defaultValue: '',
  });
  const showDefault = useMemo(() => {
    if (!defaultValue) return '';
    if (input.options?.length) {
      const defaultOption = findById(input.default);
      return defaultOption ? defaultOption.value : '';
    }
    return defaultValue;
  }, [defaultValue, input.options, input.default]);
  useEffect(() => {
    if (!isHydrated) return;

    if (field.value) return;

    if (savedId) {
      if (!input.options?.length || findById(savedId)) {
        field.onChange(savedId);
        return;
      }
    }
    if (input.default) {
      if (!input.options?.length) {
        field.onChange(String(input.default));
        return;
      }
      const defOpt = findById(input.default);
      if (defOpt) {
        field.onChange(defOpt.id);
        return;
      }
    }
  }, [isHydrated, input.options, savedId]);

  const handleBlur = () => {
    saveAnswer(input.id, field.value ?? '');
    field.onBlur();
  };
  const handleChange = (value: string) => {
    field.onChange(value);
  };
  const handleSelectOption = (id: string) => {
    field.onChange(id);
    saveAnswer(input.id, id);
  };
  if (input.watchedField?.id && !input.watchedField.value.includes(watchedValue)) {
    return null;
  }
  const renderedInput = () => {
    if (input.options?.length) {
      return (
        <InputOptions
          options={input.options?.map((o) => ({ id: o.id, value: o.value }))}
          selectedId={field.value ?? null}
          onSelect={handleSelectOption}
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
      style={{ animationDelay: `${DELAY.eighth_second}ms` }}
    >
      <p className='text-2xl font-medium'>{text}</p>
      <p className='text-s font-light'>{`${tString('averageInfo.text')} ${showDefault}`}</p>
      {renderedInput()}
    </div>
  );
};
