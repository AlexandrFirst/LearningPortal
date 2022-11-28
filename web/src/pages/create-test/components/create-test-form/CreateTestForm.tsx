import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";

import { Grid, List, ListItem } from "@mui/material";

import { testApi } from "api/test-api/test.api";

import { useAppDispatch } from "hooks/redux";
import { useHttpRequest } from "hooks/useHttpRequest";

import { Input } from "components/input/Input";
import { Button } from "components/button/Button";
import { LoadingButton } from "components/loading-button/LoadingButton";

import { ICreateTestForm } from "pages/create-test/interfaces";
import { Question } from "../question/Question";
import { error, success } from "../../../../store/slices/snackbar.slice";

interface CreateTestFormProps {
  handleSubmit: Function;
  currentTabId: number;
}

export const CreateTestForm: React.FC<CreateTestFormProps> = ({
  handleSubmit,
  currentTabId,
}) => {
  const [createTest, loading] = useHttpRequest(testApi.createTest);

  const { control } = useFormContext<ICreateTestForm>();
  const dispatch = useAppDispatch();

  const { fields, append, update, remove } = useFieldArray({
    control,
    name: "questions",
  });

  const handleAddQuestion = () => {
    append({ content: "", answearsList: [""], possibleAnswears: [""] });
  };

  const addCorrectAnswer = (lastIndex: number) => {
    update(lastIndex, {
      content: fields[lastIndex].content,
      possibleAnswears: fields[lastIndex].possibleAnswears,
      answearsList: [...(fields[lastIndex].answearsList ?? []), ""],
    });
  };

  const addInCorrectAnswer = (lastIndex: number) => {
    update(lastIndex, {
      content: fields[lastIndex].content,
      answearsList: fields[lastIndex].answearsList,
      possibleAnswears: [...(fields[lastIndex].possibleAnswears ?? []), ""],
    });
  };

  const getNewArr = (innerIndex: number, arr?: string[]) => {
    const newArrStart = arr?.slice(0, innerIndex) ?? [];
    const newArrFinish = arr?.slice(innerIndex + 1) ?? [];
    return [...newArrStart, ...newArrFinish];
  };

  const deleteInCorrect = (index: number, innerIndex: number) => {
    const possibleAnswers = fields[index]?.possibleAnswears;
    update(index, {
      content: fields[index].content,
      answearsList: fields[index].answearsList,
      possibleAnswears: getNewArr(innerIndex, possibleAnswers),
    });
  };

  const deleteCorrect = (index: number, innerIndex: number) => {
    const answearList = fields[index]?.answearsList;
    update(index, {
      content: fields[index].content,
      possibleAnswears: fields[index].possibleAnswears,
      answearsList: getNewArr(innerIndex, answearList),
    });
  };

  const handleDeleteQuetion = (index: number) => remove(index);

  const handleConfirm = async (testFormData: ICreateTestForm) => {
    if (!currentTabId) {
      dispatch(error({ message: "Необхідно обрати закладку для теста" }));
      return;
    }
    const { message, isOk } = await createTest({
      tabId: currentTabId,
      test: {
        id: 0,
        name: testFormData.testName,
        lowThreshold: 0,
        tryCount: 0,
        questions: testFormData.questions.map(
          ({ content, answearsList, possibleAnswears }) => ({
            content: content,
            answearsList: answearsList ?? [],
            possibleAnswears: possibleAnswears ?? [],
          })
        ),
      },
    });
    if (!isOk) {
      dispatch(error({ message }));
    } else {
      dispatch(success({ message: "Тест успішно створено" }));
    }
  };

  return (
    <>
      <Input name={"testName"} label={"Назва тесту"} />
      <List>
        {fields.map(({ id, ...item }, index) => (
          <ListItem key={id} sx={{ display: "block" }}>
            <Question
              {...item}
              index={index}
              addInCorrectAnswer={addInCorrectAnswer}
              addCorrectAnswer={addCorrectAnswer}
              deleteCorrect={deleteCorrect}
              deleteInCorrect={deleteInCorrect}
              onDeleteQuestion={handleDeleteQuetion}
            />
          </ListItem>
        ))}
      </List>
      <Grid container justifyContent={"space-between"} sx={{ mt: 3 }}>
        <Button variant={"text"} onClick={handleAddQuestion}>
          +Додати питання
        </Button>
        <LoadingButton loading={loading} onClick={handleSubmit(handleConfirm)}>
          Створити тест
        </LoadingButton>
      </Grid>
    </>
  );
};
