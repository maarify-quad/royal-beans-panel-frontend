import React, { useEffect } from "react";

// Services
import { useGetCustomersQuery, useUpdateCustomerMutation } from "@services/customerApi";

// UI Components
import { Alert, Button, LoadingOverlay, Select } from "@mantine/core";

// UI Utils
import { useForm, zodResolver } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { closeModal } from "@mantine/modals";

// Icons
import {
  AlertCircle as AlertCircleIcon,
  X as ErrorIcon,
  CircleCheck as CircleCheckIcon,
} from "tabler-icons-react";

// Validation
import { Inputs, initialValues } from "./validation/Inputs";
import { schema } from "./validation/schema";

// Interfaces
import { Customer } from "@interfaces/customer";

// Props
type AssignPriceListFormProps = {
  priceListId: number;
};

export const AssignPriceListForm: React.FC<AssignPriceListFormProps> = ({ priceListId }) => {
  // Internal state
  const [selectedCustomer, setSelectedCustomer] = React.useState<Customer>();

  // Queries
  const { data, isLoading: isCustomersLoading } = useGetCustomersQuery();

  // Mutations
  const [
    updateCustomer,
    {
      isLoading: isUpdateCustomerLoading,
      isSuccess: isUpdateCustomerSuccess,
      error: updateCustomerError,
    },
  ] = useUpdateCustomerMutation();

  // Form utils
  const form = useForm<Inputs>({
    initialValues,
    validate: zodResolver(schema),
  });

  // Filter the customer select options and memoize the result
  const customerSelectOptions = React.useMemo(
    () =>
      data?.customers
        .filter((customer) => customer.priceListId !== priceListId)
        .map((customer) => ({
          label: customer.name,
          value: customer.id,
        })) || [],
    [data?.customers.length]
  );

  const onAssignPriceListSubmit = async (values: Inputs) => {
    try {
      await updateCustomer({
        id: values.customerId,
        priceListId,
      });
    } catch (error) {
      console.log(error);
      showNotification({
        title: "Fiyat listesi atanamadı",
        message: "Beklenmedik bir hata oluştu",
        icon: <ErrorIcon />,
        color: "red",
      });
    }
  };

  // Set selected customer object on select change
  useEffect(() => {
    setSelectedCustomer(
      data?.customers.find((customer) => customer.id === form.values.customerId)
    );
  }, [form.values.customerId]);

  useEffect(() => {
    if (isUpdateCustomerSuccess) {
      showNotification({
        title: "Başarılı",
        message: "Fiyat listesi başarıyla atandı",
        icon: <CircleCheckIcon />,
        color: "green",
      });
      closeModal("assignPriceList");
    }
  }, [isUpdateCustomerSuccess]);

  useEffect(() => {
    if (updateCustomerError) {
      showNotification({
        title: "Fiyat listesi atama başarısız",
        message: (updateCustomerError as any)?.data?.message || "Beklenmedik bir hata oluştu",
        icon: <ErrorIcon />,
        color: "red",
      });
    }
  }, [(updateCustomerError as any)?.data?.message]);

  return (
    <form onSubmit={form.onSubmit(onAssignPriceListSubmit)}>
      <LoadingOverlay visible={isCustomersLoading || isUpdateCustomerLoading} />
      <Select
        label="Müşteri"
        placeholder="Müşteri seçiniz"
        data={customerSelectOptions}
        {...form.getInputProps("customerId")}
      />
      {selectedCustomer?.priceList ? (
        <Alert color="cyan" mt="md" icon={<AlertCircleIcon />}>
          Bu müşteri "{selectedCustomer.priceList.name}" fiyat listesinde kayıtlıdır. Yeni
          fiyat listesi üzerine yazılacaktır
        </Alert>
      ) : null}
      <Button type="submit" mt="lg">
        Müşteri ekle
      </Button>
    </form>
  );
};
