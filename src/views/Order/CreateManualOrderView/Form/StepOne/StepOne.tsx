import React from "react";

// UI Components
import { Select, TextInput } from "@mantine/core";

// UI Utils
import { UseFormReturnType } from "@mantine/form";

// Validation
import { Inputs } from "../validation/Inputs";

// Props
type StepOneProps = {
  form: UseFormReturnType<Inputs>;
};

export const StepOne: React.FC<StepOneProps> = ({ form }) => {
  return (
    <div>
      <TextInput
        label="Alıcı Ad"
        placeholder="Alıcı adı"
        required
        maxLength={255}
        {...form.getInputProps("receiver")}
      />
      <TextInput
        label="Alıcı Mahalle"
        placeholder="Alıcı mahallesi"
        mt="md"
        required
        maxLength={255}
        {...form.getInputProps("receiverNeighborhood")}
      />
      <TextInput
        label="Alıcı Adres"
        placeholder="Alıcı adresi"
        mt="md"
        required
        maxLength={255}
        {...form.getInputProps("receiverAddress")}
      />
      <TextInput
        label="Alıcı İlçe"
        placeholder="Alıcı ilçesi"
        mt="md"
        required
        maxLength={255}
        {...form.getInputProps("receiverProvince")}
      />
      <TextInput
        label="Alıcı İl"
        placeholder="Alıcı ili"
        mt="md"
        required
        maxLength={255}
        {...form.getInputProps("receiverCity")}
      />
      <TextInput
        label="Telefon No"
        placeholder="Alıcı telefon numarası"
        mt="md"
        required
        maxLength={255}
        {...form.getInputProps("receiverPhone")}
      />
      <Select
        label="Fatura Durumu"
        mt="md"
        required
        data={[
          { label: "Faturalı", value: "Faturalı" },
          { label: "Faturasız", value: "Faturasız" },
        ]}
        {...form.getInputProps("manualInvoiceStatus")}
      />
      <TextInput
        label="Özel Not"
        placeholder="Özel not girebilirsiniz"
        mt="md"
        {...form.getInputProps("specialNote")}
      />
    </div>
  );
};
