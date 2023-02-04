import React, { useEffect } from "react";

// Services
import { useGetCustomersQuery, useUpdateCustomerMutation } from "@services/customerApi";

// UI Components
import { Alert, Button, LoadingOverlay, Select } from "@mantine/core";

// UI Utils
import { useForm, zodResolver } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { closeAllModals } from "@mantine/modals";

// Icons
import { IconAlertCircle, IconCircleCheck } from "@tabler/icons";

// Validation
import { Inputs, initialValues } from "./validation/Inputs";
import { schema } from "./validation/schema";

// Utils
import { handleFormError } from "@utils/form";

// Interfaces
import { Customer } from "@interfaces/customer";

// Props
type AssignPriceListProps = {
  priceListId: number;
};

export const AssignPriceList: React.FC<AssignPriceListProps> = ({ priceListId }) => {
  // Internal state
  const [selectedCustomer, setSelectedCustomer] = React.useState<Customer>();

  // Queries
  const { data, isLoading: isCustomersLoading } = useGetCustomersQuery();

  // Mutations
  const [updateCustomer, { isLoading: isUpdateCustomerLoading }] = useUpdateCustomerMutation();

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
      }).unwrap();
      showNotification({
        title: "Başarılı",
        message: "Fiyat listesi başarıyla atandı",
        icon: <IconCircleCheck />,
        color: "green",
      });
      closeAllModals();
    } catch (error) {
      // Error is handled by the RTK Query middleware at @app/middlewares/rtkQueryErrorLogger.ts
    }
  };

  // Set selected customer object on select change
  useEffect(() => {
    setSelectedCustomer(data?.customers.find((customer) => customer.id === form.values.customerId));
  }, [form.values.customerId]);

  return (
    <form onSubmit={form.onSubmit(onAssignPriceListSubmit, handleFormError)}>
      <LoadingOverlay visible={isCustomersLoading || isUpdateCustomerLoading} />
      <Select
        label="Müşteri"
        placeholder="Müşteri seçiniz"
        nothingFound="Müşteri bulunamadı"
        searchable
        withAsterisk
        data={customerSelectOptions}
        {...form.getInputProps("customerId")}
      />
      {selectedCustomer?.priceList ? (
        <Alert color="cyan" mt="md" icon={<IconAlertCircle />}>
          Bu müşteri "{selectedCustomer.priceList.name}" fiyat listesinde kayıtlıdır. Yeni fiyat
          listesi üzerine yazılacaktır
        </Alert>
      ) : null}
      <Button type="submit" mt="lg">
        Müşteri ekle
      </Button>
    </form>
  );
};
