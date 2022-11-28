//TestInputDto
export interface ITest {
  id: number;
  tryCount: number;
  name: string;
  lowThreshold: number;
  questions: IQuestionInput[];
}

export interface ITestWithTab {
  name: string;
  testId: number;
  tabName: string;
  tabId: number;
  threshold: number;
}

export interface IQuestionInput {
  content: string;
  answearsList: string[];
  possibleAnswears: string[];
}

export interface AnswerListItem {
  questionId: number;
  answear: string;
}

//AnswerListDto
export interface IAnswerList {
  name: string;
  surname: string;
  group: string;
  testId: number;
  answears: AnswerListItem[];
}

export interface GetAllTestRequests {
  page: number;
  pageSize: number;
}

export interface CreateTestRequest {
  test: ITest;
  tabId: number;
}

export interface UpdateTestRequest {
  test: ITest;
  testId: number;
}

export interface ProccessAnswersResponse {
  message: string;
}
