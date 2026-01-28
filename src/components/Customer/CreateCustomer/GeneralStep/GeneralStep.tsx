import { Fragment } from "react";

// UI Components
import { TextInput } from "@mantine/core";

// UI Utils
import { UseFormReturnType } from "@mantine/form";

// Validation
import { CreateCustomerValues } from "../createCustomerValidation";

// Props
type GeneralStepProps = {
  form: UseFormReturnType<CreateCustomerValues>;
};

export const GeneralStep = ({ form }: GeneralStepProps) => {
  return (
    <Fragment>
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
    </Fragment>
  );
};
