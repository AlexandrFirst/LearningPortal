import { IQuestionInput } from "api/test-api/test.api.types";

export type IAnswer = Pick<IQuestionInput, "answearsList" | "possibleAnswears">;

export interface AnswerListForm {
  answers: IAnswer[];
}
