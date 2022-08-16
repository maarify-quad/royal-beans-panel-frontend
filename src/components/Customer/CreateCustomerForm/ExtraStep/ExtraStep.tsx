import React from "react";

// UI Components
import { TextInput } from "@mantine/core";

// UI Utils
import { UseFormReturnType } from "@mantine/form";

// Validation
import { Inputs } from "../validation/Inputs";

// Props
type ExtraStepProps = {
  form: UseFormReturnType<Inputs>;
};

export const ExtraStep: React.FC<ExtraStepProps> = ({ form }) => {
  return (
    <React.Fragment>
      <TextInput
        label="Yorum"
        placeholder="Yorum giriniz"
        autoFocus
        {...form.getInputProps("comment")}
      />
      <TextInput
        label="Özel not"
        placeholder="Özel not giriniz"
        mt="md"
        {...form.getInputProps("specialNote")}
      />
    </React.Fragment>
  );
};
