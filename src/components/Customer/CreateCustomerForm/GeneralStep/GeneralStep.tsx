import React from "react";

// UI Components
import { TextInput } from "@mantine/core";

// UI Utils
import { UseFormReturnType } from "@mantine/form";

// Validation
import { Inputs } from "../validation/Inputs";

// Props
type GeneralStepProps = {
  form: UseFormReturnType<Inputs>;
};

export const GeneralStep: React.FC<GeneralStepProps> = ({ form }) => {
  return (
    <React.Fragment>
      <TextInput
        label="Müşteri Adı"
        placeholder="Müşteri adı giriniz"
        required
        autoFocus
        {...form.getInputProps("name")}
      />
      <TextInput
        label="Firma Ünvanı"
        placeholder="Firma ünvanı giriniz"
        mt="md"
        {...form.getInputProps("companyTitle")}
      />
      <TextInput
        label="Yetkili adı"
        placeholder="Yetkili adı giriniz"
        mt="md"
        {...form.getInputProps("contactName")}
      />
      <TextInput
        label="Yetkili mevki"
        placeholder="Yetkili mevki giriniz"
        mt="md"
        {...form.getInputProps("contactTitle")}
      />
      <TextInput
        label="İkincil yetkili adı"
        placeholder="İkincil yetkili adı giriniz"
        mt="md"
        {...form.getInputProps("secondContactName")}
      />
      <TextInput
        label="İkincil yetkili mevki"
        placeholder="İkincil yetkili mevki giriniz"
        mt="md"
        {...form.getInputProps("secondContactTitle")}
      />
    </React.Fragment>
  );
};
