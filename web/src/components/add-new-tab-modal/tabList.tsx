import React from "react";
import styles from "./addNewTabModal.module.scss";

import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { List, ListItem } from "@mui/material";

import { useAppSelector } from "hooks/redux";
import { selectTabs } from "store/slices/tab.slice";

import { AddUpdateTabList } from "interfaces";
import { FormWrapper } from "features/form-wrapper/formWrapper";
import { Button } from "components/button/Button";

import { TabListItem } from "./tabListItem";
import { useValidation } from "./useValidation";
import { CancelConfirmButtons } from "../cancel-confirm-buttons/CancelConfirmButtons";

interface TabListProps {
  onCancel?: () => void;
  onSubmit: (data: AddUpdateTabList) => void;
}

export const TabList: React.FC<TabListProps> = ({ onCancel, onSubmit }) => {
  const { tabs } = useAppSelector(selectTabs);
  const { validationSchema } = useValidation();

  const methods = useForm<AddUpdateTabList>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      tabList: tabs?.length ? tabs : [{ name: "" }],
    },
  });
  const { handleSubmit, control } = methods;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "tabList",
  });

  const handleAddTab = () => {
    append({ name: "" });
  };

  return (
    <FormWrapper methods={methods}>
      <List>
        {fields.map((field, index) => (
          <ListItem key={field.id} className={styles.item}>
            <TabListItem field={field} index={index} remove={remove} />
          </ListItem>
        ))}
        <ListItem>
          <Button variant="text" onClick={handleAddTab}>
            +Додати
          </Button>
        </ListItem>
      </List>
      <CancelConfirmButtons
        onCancel={onCancel}
        onSubmit={handleSubmit(onSubmit)}
      />
    </FormWrapper>
  );
};
