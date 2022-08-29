import React, { useEffect } from "react";

// Services
import { useUpdateCustomerMutation } from "@services/customerApi";

// Utils
import mapValues from "lodash/mapValues";
import pickBy from "lodash/pickBy";

// UI Components
import { Button, TextInput } from "@mantine/core";

// UI Utils
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { closeModal } from "@mantine/modals";

// Icons
import { X as ErrorIcon, CircleCheck as SuccessIcon } from "tabler-icons-react";

// Interfaces
import { Customer } from "@interfaces/customer";

// Props
type EditCustomerProps = {
  customer: Customer;
  fields: {
    label: string;
    key: string;
  }[];
};

export const EditCustomer: React.FC<EditCustomerProps> = ({ fields, customer }) => {
  const [updateCustomer, { isLoading: isUpdating, isSuccess: isUpdated, error }] =
    useUpdateCustomerMutation();

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
      await updateCustomer({
        id: customer.id,
        ...pickBy(values, (value) => value !== ""),
      });
    } catch (error) {
      showNotification({
        title: "Müşteri Güncellenemedi",
        message: "Beklenmedik bir hata oluştur",
        color: "red",
        icon: <ErrorIcon />,
      });
    }
  };

  useEffect(() => {
    if (error) {
      showNotification({
        title: "Müşteri Güncellenemedi",
        message: (error as any)?.data?.message || "Beklenmedik bir hata oluştu",
        color: "red",
        icon: <ErrorIcon />,
      });
    }
  }, [error]);

  useEffect(() => {
    if (isUpdated) {
      showNotification({
        title: "Başarılı",
        message: "Müşteri güncellendi",
        color: "green",
        icon: <SuccessIcon />,
      });
      closeModal("editCustomer");
    }
  }, [isUpdated]);

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
