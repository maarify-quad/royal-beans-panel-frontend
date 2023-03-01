// Services
import { useUpdateSupplierMutation } from "@services/supplierApi";

// UI Components
import { TextInput, Button } from "@mantine/core";

// UI Utils
import { useForm, zodResolver } from "@mantine/form";
import { closeAllModals } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";

// Icons
import { IconCircleCheck } from "@tabler/icons";

// Validation
import { EditSupplierValues, editSupplierSchema } from "./editSupplierValidation";

// Interfaces
import { Supplier } from "@interfaces/supplier";

// Props
type Props = {
  supplier: Omit<Supplier, "deliveries">;
};

export const EditSupplier = ({ supplier }: Props) => {
  const [updateSupplier, { isLoading }] = useUpdateSupplierMutation();

  const form = useForm<EditSupplierValues>({
    initialValues: supplier,
    transformValues: (values) => ({
      ...values,
      address: values.address || null,
      taxNo: values.taxNo || null,
      taxOffice: values.taxOffice || null,
      contactName: values.contactName || null,
      contactPosition: values.contactPosition || null,
      contactPhone: values.contactPhone || null,
      contactEmail: values.contactEmail || null,
    }),
    validate: zodResolver(editSupplierSchema),
  });

  const handleSubmit = async (values: EditSupplierValues) => {
    try {
      await updateSupplier({ id: supplier.id, ...values }).unwrap();

      showNotification({
        title: "Başarılı",
        message: "Tedarikçi başarıyla güncellendi.",
        color: "green",
        icon: <IconCircleCheck />,
      });

      closeAllModals();
    } catch {}
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <TextInput label="Tedarikçi Ad" placeholder="Tedarikçi adı" {...form.getInputProps("name")} />
      <TextInput
        label="Adres"
        placeholder="Tedarikçi adresi"
        mt="md"
        {...form.getInputProps("address")}
      />
      <TextInput
        label="Vergi Numarası"
        placeholder="Tedarikçi vergi numarası"
        mt="md"
        {...form.getInputProps("taxNo")}
      />
      <TextInput
        label="Vergi Dairesi"
        placeholder="Tedarikçi vergi dairesi"
        mt="md"
        {...form.getInputProps("taxOffice")}
      />
      <TextInput
        label="Yetkili Ad Soyad"
        placeholder="Tedarikçi yetkili adı soyadı"
        mt="md"
        {...form.getInputProps("contactName")}
      />
      <TextInput
        label="Yetkili Pozisyon"
        placeholder="Tedarikçi yetkili pozisyonu"
        mt="md"
        {...form.getInputProps("contactPosition")}
      />
      <TextInput
        label="Yetkili Telefon"
        placeholder="Tedarikçi yetkili telefonu"
        mt="md"
        {...form.getInputProps("contactPhone")}
      />
      <TextInput
        label="Yetkili E-posta"
        placeholder="Tedarikçi yetkili e-posta"
        mt="md"
        {...form.getInputProps("contactEmail")}
      />
      <Button type="submit" mt="lg" loading={isLoading} disabled={isLoading}>
        Kaydet
      </Button>
    </form>
  );
};
