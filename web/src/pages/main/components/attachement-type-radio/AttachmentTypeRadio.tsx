import React, { ChangeEvent } from "react";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

import { LinkType } from "api/tab-api/tab.api.types";

interface AttachmentTypeRadioProps {
  currentValue?: LinkType;
  onChange?: (event: ChangeEvent<HTMLInputElement>, value: string) => void;
}

export const AttachmentTypeRadio: React.FC<AttachmentTypeRadioProps> = ({
  currentValue,
  onChange,
}) => {
  return (
    <FormControl>
      <FormLabel id="attachment-type-radio">{"Тип прікріплення"}</FormLabel>
      <RadioGroup
        row
        aria-labelledby="attachment-type-radio"
        name={"attachmentType"}
        value={currentValue}
        onChange={onChange}
      >
        <FormControlLabel
          value={LinkType.Pdf}
          control={<Radio />}
          label={"Документ"}
        />
        <FormControlLabel
          value={LinkType.Video}
          control={<Radio />}
          label={"Відео"}
        />
        <FormControlLabel
          value={LinkType.Link}
          control={<Radio />}
          label={"Посилання"}
        />
      </RadioGroup>
    </FormControl>
  );
};
