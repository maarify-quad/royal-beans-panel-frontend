import React from "react";

// Services
import { useUpdateCustomerMutation } from "@services/customerApi";

// Utils
import mapValues from "lodash/mapValues";

// UI Components
import { Button, TextInput } from "@mantine/core";

// UI Utils
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { closeAllModals } from "@mantine/modals";

// Icons
import { IconCircleCheck } from "@tabler/icons";

// Interfaces
import { Customer } from "@interfaces/customer";

// Props
type EditCustomerProps = {
  customer: Omit<
    Customer,
    "priceList" | "deliveryAddresses" | "priceListId" | "startBalance" | "currentBalance"
  >;
  fields: {
    label: string;
    key: string;
  }[];
};

export const EditCustomer: React.FC<EditCustomerProps> = ({ fields, customer }) => {
  const [updateCustomer, { isLoading: isUpdating }] = useUpdateCustomerMutation();

  // Form utils
  const form = useForm({
    initialValues: mapValues(customer, (value) => {
      if (typeof value !== "undefined" && value !== null) {
        return value;
      }
      return "";
    }),
  });

  const onUpdateCustomerSubmit = async (values: any) => {
    try {
      // Get touched fields
      const touchedFields = Object.entries(customer).reduce((acc, [key, value]) => {
        if (form.isTouched(key)) {
          return { ...acc, [key]: values[key] };
        }
        return acc;
      }, []);

      await updateCustomer({
        id: customer.id,
        ...touchedFields,
      }).unwrap();
      showNotification({
        title: "Başarılı",
        message: "Müşteri güncellendi",
        color: "green",
        icon: <IconCircleCheck />,
      });
      closeAllModals();
    } catch (error) {
      // Error is handled by the RTK Query middleware at @app/middlewares/rtkQueryErrorLogger.ts
    }
  };

  return (
    <form onSubmit={form.onSubmit(onUpdateCustomerSubmit)}>
      {fields.map((field, i) => (
        <TextInput
          label={field.label}
          placeholder={`${field.label} (opsiyonel)`}
          mt={i !== 0 ? "md" : 0}
          key={i}
          {...form.getInputProps(field.key)}
        />
      ))}
      <Button type="submit" mt="md" loading={isUpdating}>
        Güncelle
      </Button>
    </form>
  );
};
