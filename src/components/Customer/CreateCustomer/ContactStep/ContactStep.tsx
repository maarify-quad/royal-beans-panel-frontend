import { Fragment, useState } from "react";

// UI Components
import { Checkbox, TextInput } from "@mantine/core";

// UI Utils
import { UseFormReturnType } from "@mantine/form";

// Validation
import { CreateCustomerValues } from "../createCustomerValidation";

// Props
type ContactStepProps = {
  form: UseFormReturnType<CreateCustomerValues>;
};

export const ContactStep = ({ form }: ContactStepProps) => {
  const [isCargoAddressDifferent, setIsCargoAddressDifferent] = useState(false);

  return (
    <Fragment>
      <TextInput
        label="E-posta"
        placeholder="E-posta adresi giriniz"
        type="email"
        autoFocus
        {...form.getInputProps("email")}
      />
      <TextInput
        label="Telefon"
        placeholder="Telefon numarası giriniz"
        type="tel"
        mt="md"
        {...form.getInputProps("phone")}
      />
      <TextInput
        label="Adres"
        placeholder="Adres giriniz"
        mt="md"
        {...form.getInputProps("address")}
      />
      <TextInput
        label="İlçe"
        placeholder="İlçe giriniz"
        mt="md"
        {...form.getInputProps("province")}
      />
      <TextInput label="İl" placeholder="İl giriniz" mt="md" {...form.getInputProps("city")} />
      <Checkbox
        label="Kargo adresi farklı"
        mt="md"
        onClick={() => setIsCargoAddressDifferent((prev) => !prev)}
      />
      {isCargoAddressDifferent && (
        <>
          <TextInput
            label="Kargo Adresi"
            placeholder="Kargo adresi giriniz"
            mt="md"
            {...form.getInputProps("cargoAddress")}
          />
          <TextInput
            label="Kargo ilçe"
            placeholder="Kargo ilçe giriniz"
            mt="md"
            {...form.getInputProps("cargoProvince")}
          />
          <TextInput
            label="Kargo il"
            placeholder="Kargo il giriniz"
            mt="md"
            {...form.getInputProps("cargoCity")}
          />
        </>
      )}
    </Fragment>
  );
};
