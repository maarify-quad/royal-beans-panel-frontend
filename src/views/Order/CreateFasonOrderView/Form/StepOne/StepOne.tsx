import { useEffect, useMemo } from "react";

// Services
import { useGetCustomersQuery } from "@services/customerApi";

// UI Components
import { LoadingOverlay, NumberInput, Select, TextInput } from "@mantine/core";

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

export const StepOne = ({ form, selectedCustomer, setSelectedCustomer }: StepOneProps) => {
  // Get latest customers
  const { customers, isLoading: isCustomersLoading } = useGetCustomersQuery(undefined, {
    selectFromResult: ({ data, ...rest }) => ({
      customers: data?.customers,
      ...rest,
    }),
  });

  const customerSelectOptions = useMemo(
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
    </div>
  );
};
