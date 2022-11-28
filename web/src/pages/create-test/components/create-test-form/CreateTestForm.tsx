import React from "react";
import { useFieldArray, useForm } from "react-hook-form";

import { Grid, List, ListItem } from "@mui/material";

import { Input } from "components/input/Input";
import { Button } from "components/button/Button";

import { FormWrapper } from "features/form-wrapper/formWrapper";

import { ICreateTestForm } from "pages/create-test/interfaces";
import { Question } from "../question/Question";

export const CreateTestForm: React.FC = () => {
  const methods = useForm<ICreateTestForm>({
    defaultValues: {
      questions: [{ content: "", answearsList: [""], possibleAnswears: [""] }],
    },
  });
  const { control, handleSubmit } = methods;

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

  const handleDeleteQuetion = (index: number) => {
    remove(index);
  };

  const handleConfirm = (testFormData: ICreateTestForm) => {
    console.log("===testFormData===", testFormData);
  };

  return (
    <FormWrapper methods={methods}>
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
        <Button onClick={handleSubmit(handleConfirm)}>Створити тест</Button>
      </Grid>
    </FormWrapper>
  );
};
