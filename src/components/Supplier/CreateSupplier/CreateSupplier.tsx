// Services
import { useCreateSupplierMutation } from "@services/supplierApi";

// UI Components
import { Button, LoadingOverlay, TextInput } from "@mantine/core";

// UI Utils
import { showNotification } from "@mantine/notifications";
import { closeAllModals } from "@mantine/modals";
import { useForm, zodResolver } from "@mantine/form";

// Icons
import { IconCircleCheck } from "@tabler/icons";

// Validation
import {
  CreateSupplierValues,
  initialValues,
  createSupplierSchema,
} from "./createSupplierValidation";

// Utils
import { handleFormError } from "@utils/form";

// Props
type CreateSupplierProps = {
  supplier?: Partial<CreateSupplierValues>;
  onCreate?: () => void;
};

export const CreateSupplier = ({ supplier, onCreate }: CreateSupplierProps) => {
  // Mutations
  const [createSupplier, { isLoading }] = useCreateSupplierMutation();

  const form = useForm<CreateSupplierValues>({
    initialValues: { ...initialValues, ...supplier },
    validate: zodResolver(createSupplierSchema),
    validateInputOnChange: true,
    clearInputErrorOnChange: true,
  });

  const onCreateSupplierSubmit = async (inputs: CreateSupplierValues) => {
    try {
      const newSupplier = await createSupplier(inputs).unwrap();

      onCreate?.();

      showNotification({
        title: "Başarılı",
        message: `${newSupplier.id} koduyla tedarikçi oluşturuldu`,
        icon: <IconCircleCheck />,
        color: "green",
      });

      closeAllModals();
    } catch {}
  };

  return (
    <form onSubmit={form.onSubmit(onCreateSupplierSubmit, handleFormError)}>
      <LoadingOverlay visible={isLoading} />
      <TextInput
        label="Ad"
        type="text"
        placeholder="Tedarikçi adı"
        autoFocus
        withAsterisk
        {...form.getInputProps("name")}
      />
      <TextInput
        label="Adres"
        type="text"
        placeholder="Tedarikçi adresi"
        mt="md"
        withAsterisk
        {...form.getInputProps("address")}
      />
      <TextInput
        label="VKN"
        type="text"
        placeholder="Tedarikçi vergi kimlik no"
        mt="md"
        withAsterisk
        {...form.getInputProps("taxNo")}
      />
      <TextInput
        label="Vergi dairesi"
        type="text"
        placeholder="Tedarikçi vergi dairesi"
        mt="md"
        withAsterisk
        {...form.getInputProps("taxOffice")}
      />
      <TextInput
        label="Yetkili adı"
        type="text"
        placeholder="Tedarikçi yetkili adı"
        mt="md"
        {...form.getInputProps("contactName")}
      />
      <TextInput
        label="Yetkili mevki"
        type="text"
        placeholder="Tedarikçi yetkili mevki"
        mt="md"
        {...form.getInputProps("contactPosition")}
      />
      <TextInput
        label="Yetkili telefon"
        type="text"
        placeholder="Tedarikçi yetkili telefon"
        mt="md"
        {...form.getInputProps("contactPhone")}
      />
      <TextInput
        label="Yetkili e-posta"
        type="text"
        placeholder="Tedarikçi yetkili e-posta"
        mt="md"
        {...form.getInputProps("contactEmail")}
      />
      <Button type="submit" mt="md" loading={isLoading}>
        Oluştur
      </Button>
    </form>
  );
};
