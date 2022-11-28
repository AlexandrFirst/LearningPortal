import { Delete, Get, Post, Put } from "../config";
import {
  CreateTestRequest,
  GetAllTestRequests,
  IAnswerList,
  ITest,
  ProccessAnswersResponse,
  UpdateTestRequest,
} from "./test.api.types";

class TestApi {
  getAll({ page, pageSize }: GetAllTestRequests) {
    return Get("test/all", { params: { page, pageSize } });
  }

  getById(id: number) {
    return Get(`test/${id}`);
  }

  createTest({ test, tabId }: CreateTestRequest): Promise<ITest> {
    return Post(`test/create/${tabId}`, test);
  }

  deleteTest(testId: number): Promise<number> {
    return Delete(`test/${testId}`);
  }

  updateTest({ testId, test }: UpdateTestRequest): Promise<ITest> {
    return Put(`test/update/${testId}`, test);
  }

  processAnswers(request: IAnswerList): Promise<ProccessAnswersResponse> {
    return Post("test/proccessAnswers", request);
  }
}

export const testApi = new TestApi();
