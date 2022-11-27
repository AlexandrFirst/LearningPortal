import React from "react";
import { useFieldArray, useForm } from "react-hook-form";

import { List, ListItem } from "@mui/material";

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
  const { control } = methods;

  const { fields, append, update } = useFieldArray({
    control,
    name: "questions",
  });

  const handleAddQuestion = () => {
    append({ content: "", answearsList: [""], possibleAnswears: [""] });
  };

  const handleUpdate = () => {
    update(0, { content: fields[1].content, answearsList: ["eufhriuwgh"] });
  };

  return (
    <FormWrapper methods={methods}>
      <Input name={"testName"} label={"Назва тесту"} />
      <List>
        {fields.map(({ id, ...item }, index) => (
          <ListItem key={id} sx={{ display: "block" }}>
            <Question index={index} update={update} {...item} />
          </ListItem>
        ))}
      </List>
      <Button variant={"text"} onClick={handleAddQuestion}>
        +Додати питання
      </Button>
      <Button onClick={handleUpdate}>Test update</Button>
    </FormWrapper>
  );
};
