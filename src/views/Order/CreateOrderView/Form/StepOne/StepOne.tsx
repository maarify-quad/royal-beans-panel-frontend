import React, { useEffect } from "react";

// Services
import { useGetCustomersQuery } from "@services/customerApi";

// UI Components
import { LoadingOverlay, NumberInput, Select, TextInput } from "@mantine/core";
import { DatePicker } from "@mantine/dates";

// UI Utils
import { UseFormReturnType } from "@mantine/form";

// Validation
import { Inputs } from "../validation/Inputs";

// Interfaces
import { Customer } from "@interfaces/customer";

// Props
type StepOneProps = {
  form: UseFormReturnType<Inputs>;
  selectedCustomer?: Customer;
  setSelectedCustomer: (customer?: Customer) => void;
};

export const StepOne: React.FC<StepOneProps> = ({
  form,
  selectedCustomer,
  setSelectedCustomer,
}) => {
  // Get latest customers
  const { customers, isLoading: isCustomersLoading } = useGetCustomersQuery(undefined, {
    selectFromResult: ({ data, ...rest }) => ({
      customers: data?.customers,
      ...rest,
    }),
  });

  const customerSelectOptions = React.useMemo(
    () =>
      customers?.map((customer) => ({
        value: customer.id.toString(),
        label: customer.name,
      })) || [],
    [customers]
  );

  useEffect(() => {
    const customer = customers?.find((c) => c.id === form.values.customerId);
    setSelectedCustomer(customer);

    if (customer) {
      const deliveryAddress =
        customer.deliveryAddresses.find((a) => a.isPrimary) || customer.deliveryAddresses[0];
      form.setFieldValue("deliveryAddressId", deliveryAddress?.id.toString() || "0");
    }
  }, [form.values.customerId]);

  return (
    <div>
      <LoadingOverlay visible={isCustomersLoading} />
      <Select
        label="Müşteri"
        placeholder="Müşteri seçiniz"
        searchable
        required
        nothingFound="Sonuç bulunamadı"
        dropdownComponent="div"
        data={customerSelectOptions}
        {...form.getInputProps("customerId")}
      />
      <NumberInput
        label="Müşteri Bakiyesi"
        mt="md"
        readOnly
        precision={2}
        icon={<span>₺</span>}
        value={selectedCustomer ? selectedCustomer.currentBalance : 0}
      />
      <TextInput
        label="Fiyat Listesi"
        mt="md"
        readOnly
        value={selectedCustomer ? selectedCustomer.priceList?.name : ""}
      />
      <TextInput
        label="Özel Not"
        placeholder="Özel not girebilirsiniz"
        mt="md"
        {...form.getInputProps("specialNote")}
      />
      <Select
        label="Teslimat Adresi"
        placeholder="Teslimat adresi seçiniz"
        nothingFound="Sonuç bulunamadı"
        disabled={!selectedCustomer}
        required
        mt="md"
        data={
          selectedCustomer?.deliveryAddresses.map((address) => ({
            label: address.title,
            value: address.id.toString(),
          })) || []
        }
        {...form.getInputProps("deliveryAddressId")}
      />
      <Select
        label="Gönderim Tipi"
        placeholder="Gönderim tipi seçiniz"
        required
        mt="md"
        data={[
          { label: "Kargo", value: "Kargo" },
          { label: "Elden", value: "Elden" },
          { label: "Moto Kurye", value: "Moto Kurye" },
          { label: "Dükkan Teslim", value: "Dükkan Teslim" },
          { label: "Belirsiz", value: "Belirsiz" },
        ]}
        {...form.getInputProps("deliveryType")}
      />
      <DatePicker
        label="Gönderim Tarihi"
        placeholder="Gönderim Tarihi"
        mt="md"
        required
        clearable={false}
        {...form.getInputProps("deliveryDate")}
      />
    </div>
  );
};
