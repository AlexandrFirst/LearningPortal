import React from "react";
import {
  FieldArrayWithId,
  UseFieldArrayRemove,
  useFormContext,
} from "react-hook-form";

import { Grid, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import { Input } from "components/input/Input";
import { AddUpdateTabList } from "interfaces";

interface TabListItemProps {
  index: number;
  remove: UseFieldArrayRemove;
  field: FieldArrayWithId<AddUpdateTabList, "tabList">;
}

export const TabListItem: React.FC<TabListItemProps> = ({
  index,
  remove,
  field,
}) => {
  const {
    formState: { errors },
    register,
  } = useFormContext();
  const fieldName = `tabList.${index}.name`;

  const handleDelete = () => {
    remove(index);
  };

  // @ts-ignore
  const errorMessage = errors.tabList?.[index]?.name?.message;

  return (
    <Grid container>
      <Grid item xs={11}>
        <Input
          {...register(fieldName, { minLength: 1 })}
          defaultValue={field.name}
          variant="standard"
          placeholder="Назва"
          errorMessage={errorMessage}
        />
      </Grid>
      <IconButton onClick={handleDelete}>
        <DeleteIcon color="error" />
      </IconButton>
    </Grid>
  );
};
