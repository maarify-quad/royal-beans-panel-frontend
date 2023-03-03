import { Fragment } from "react";

// UI Components
import { TextInput } from "@mantine/core";

// UI Utils
import { UseFormReturnType } from "@mantine/form";

// Validation
import { CreateCustomerValues } from "../createCustomerValidation";

// Props
type ExtraStepProps = {
  form: UseFormReturnType<CreateCustomerValues>;
};

export const ExtraStep = ({ form }: ExtraStepProps) => {
  return (
    <Fragment>
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
    </Fragment>
  );
};
