import { Fragment } from "react";

// UI Components
import { NumberInput, TextInput } from "@mantine/core";

// UI Utils
import { UseFormReturnType } from "@mantine/form";

// Validation
import { CreateCustomerValues } from "../createCustomerValidation";

// Props
type CommercialStepProps = {
  form: UseFormReturnType<CreateCustomerValues>;
};

export const CommercialStep = ({ form }: CommercialStepProps) => {
  return (
    <Fragment>
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
        label="Çalışma prensibi"
        placeholder="Çalışma prensibi giriniz"
        mt="md"
        {...form.getInputProps("commercialPrinciple")}
      />
    </Fragment>
  );
};
