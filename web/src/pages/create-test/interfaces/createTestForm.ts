import { IQuestionInput } from "api/test-api/test.api.types";

export type IQuestionPartialAnswers = Pick<IQuestionInput, "content"> &
    Partial<Pick<IQuestionInput, "possibleAnswears" | "answearsList">>;

export interface ICreateTestForm {
  testName: string;
  questions: IQuestionPartialAnswers[];
}

export const questionListName = "questions"; //Need to be the same as ICreateTestForm.questions
export const answearsListName = "answearsList"; //Need to be the same as ICreateTestForm.answearsList
export const possibleAnswearsListName = "possibleAnswears"; //Need to be the same as ICreateTestForm.possibleAnswears
