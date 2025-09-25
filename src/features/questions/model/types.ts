import { Option } from '@/shared/model/types';
export type SurveyInput = {
  id: string;
  placeholder?: string;
  options?: Option[];
  patternMessage?: string;
  default?: string;
  watchedField?: { id: string; value: string[] };
};

export type SurveyQuestion = {
  question: string;
  input: SurveyInput;
  defaultValue?: string;
};

export type SurveySection = {
  title: string;
  questions: SurveyQuestion[];
};
