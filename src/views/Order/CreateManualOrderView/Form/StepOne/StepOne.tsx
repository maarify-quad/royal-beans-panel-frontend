import { useState } from "react";

// Services
import { useGetReceiversQuery } from "@services/receiverApi";

// Redux
import { useReduxDispatch, useReduxSelector } from "@app/hook";
import { selectReceiverOptions, pushReceiverOption } from "@slices/receiverSlice";

// UI Components
import { Checkbox, LoadingOverlay, Select, TextInput } from "@mantine/core";

// UI Utils
import { UseFormReturnType } from "@mantine/form";

// Validation
import { Inputs } from "../validation/Inputs";

// Props
type StepOneProps = {
  form: UseFormReturnType<Inputs>;
};

export const StepOne = ({ form }: StepOneProps) => {
  const dispatch = useReduxDispatch();
  const receiverSelectOptions = useReduxSelector(selectReceiverOptions);
  const [showSaveReceiver, setShowSaveReceiver] = useState(false);

  const { data, isLoading, isFetching } = useGetReceiversQuery();

  return (
    <div>
      <LoadingOverlay visible={isLoading || isFetching} />
      <Select
        label="Alıcı"
        placeholder="Alıcı seç/oluştur"
        searchable
        required
        creatable
        getCreateLabel={(value) => `Alıcı olarak "${value}" oluştur`}
        onCreate={(value) => {
          dispatch(pushReceiverOption({ value, label: value }));
          return { value, label: value };
        }}
        nothingFound="Sonuç bulunamadı"
        dropdownComponent="div"
        data={receiverSelectOptions}
        {...form.getInputProps("receiverId")}
        onChange={(receiverId) => {
          if (receiverId) {
            const receiver = data?.receivers.find(
              (receiver) => receiver.id === parseInt(receiverId)
            );
            if (receiver) {
              form.setFieldValue("receiverId", receiver.id.toString());
              form.setFieldValue("receiver", receiver.name);
              form.setFieldValue("receiverNeighborhood", receiver.neighborhood);
              form.setFieldValue("receiverAddress", receiver.address);
              form.setFieldValue("receiverProvince", receiver.province);
              form.setFieldValue("receiverCity", receiver.city);
              form.setFieldValue("receiverPhone", receiver.phone);
              form.setFieldValue("isSaveReceiverChecked", false);
              setShowSaveReceiver(false);
            } else {
              form.setFieldValue("receiverId", receiverId);
              form.setFieldValue("receiver", receiverId);
              form.setFieldValue("receiverNeighborhood", "");
              form.setFieldValue("receiverAddress", "");
              form.setFieldValue("receiverProvince", "");
              form.setFieldValue("receiverCity", "");
              form.setFieldValue("receiverPhone", "");
              setShowSaveReceiver(true);
            }
          }
        }}
      />
      {showSaveReceiver && (
        <Checkbox
          label="Alıcıyı kaydet"
          mt="xs"
          {...form.getInputProps("isSaveReceiverChecked")}
          checked={form.values.isSaveReceiverChecked}
          onChange={(e) => form.setFieldValue("isSaveReceiverChecked", e.target.checked)}
        />
      )}
      <TextInput
        label="Alıcı Mahalle"
        placeholder="Alıcı mahallesi"
        mt="md"
        maxLength={255}
        {...form.getInputProps("receiverNeighborhood")}
      />
      <TextInput
        label="Alıcı Adres"
        placeholder="Alıcı adresi"
        mt="md"
        maxLength={255}
        {...form.getInputProps("receiverAddress")}
      />
      <TextInput
        label="Alıcı İlçe"
        placeholder="Alıcı ilçesi"
        mt="md"
        maxLength={255}
        {...form.getInputProps("receiverProvince")}
      />
      <TextInput
        label="Alıcı İl"
        placeholder="Alıcı ili"
        mt="md"
        maxLength={255}
        {...form.getInputProps("receiverCity")}
      />
      <TextInput
        label="Telefon No"
        placeholder="Alıcı telefon numarası"
        mt="md"
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
