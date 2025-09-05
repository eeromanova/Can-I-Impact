export type SurveyInput = {
  id: string;
  placeholder?: string;
  options?: string[];
};

export type SurveyQuestion = {
  question: string;
  input: SurveyInput;
  note?: string;
};

export type SurveySection = {
  title: string;
  questions: SurveyQuestion[];
};
