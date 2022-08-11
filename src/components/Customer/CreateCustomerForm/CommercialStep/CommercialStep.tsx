import React from "react";

// UI Components
import { NumberInput, TextInput } from "@mantine/core";

// UI Utils
import { UseFormReturnType } from "@mantine/form";

// Validation
import { Inputs } from "../validation/Inputs";

// Props
type CommercialStepProps = {
  form: UseFormReturnType<Inputs>;
};

export const CommercialStep: React.FC<CommercialStepProps> = ({ form }) => {
  return (
    <React.Fragment>
      <TextInput
        label="Vergi dairesi"
        placeholder="Vergi dairesi giriniz"
        autoFocus
        {...form.getInputProps("taxOffice")}
      />
      <TextInput
        label="Vergi no"
        placeholder="Vergi no giriniz"
        mt="md"
        {...form.getInputProps("taxNo")}
      />
      <NumberInput
        label="Açılış bakiyesi"
        placeholder="Açılış bakiyesi giriniz"
        precision={2}
        mt="md"
        {...form.getInputProps("startBalance")}
      />
      <TextInput
        label="Çalışma prensini"
        placeholder="Çalışma prensibi giriniz"
        mt="md"
        {...form.getInputProps("commercialPrinciple")}
      />
    </React.Fragment>
  );
};
