import { AnswerListItem } from "api/test-api/test.api.types";

export const formatAnswers = (arr: AnswerListItem[]): AnswerListItem[] => {
  const questionIds: { [x: number]: string } = {};
  arr.forEach(({ questionId, answear }) => {
    const formattedAnswer = answear.replace(/,/g, "");
    questionIds[questionId]
      ? (questionIds[questionId] += `${formattedAnswer},`)
      : (questionIds[questionId] = `${formattedAnswer},`);
  });
  return Object.entries(questionIds).map(([questionId, answer]) => ({
    questionId: Number(questionId),
    answear: answer.slice(0, answer.length - 1),
  }));
};
