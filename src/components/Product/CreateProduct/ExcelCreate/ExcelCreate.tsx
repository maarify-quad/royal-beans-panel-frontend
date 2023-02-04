import React from "react";

// Services
import { useCreateBulkProductsFromExcelMutation } from "@services/productApi";

// UI Components
import { Box, Button, FileInput, Text } from "@mantine/core";

// UI Utils
import { showNotification } from "@mantine/notifications";
import { closeAllModals } from "@mantine/modals";
import { useForm, zodResolver } from "@mantine/form";

// Assets
import ExcelFormatExampleImage from "@assets/create-bulk-products-excel-format-example.png";

// Icons
import { IconCircleCheck, IconX } from "@tabler/icons";

// Validation
import { Inputs } from "./validation/Inputs";
import { schema, initialValues } from "./validation/schema";

// Utils
import { handleFormError } from "@utils/form";

export const ExcelCreate = () => {
  // Mutations
  const [createBulkProductsMutation, { isLoading }] = useCreateBulkProductsFromExcelMutation();

  // Form utils
  const form = useForm<Inputs>({
    initialValues,
    validate: zodResolver(schema),
  });

  const onCreateBulkProductSubmit = async (values: Inputs) => {
    try {
      const excel = values.excel;
      if (!excel) {
        return showNotification({
          title: "Hatalı dosya",
          message: "Lütfen geçerli bir excel dosyası seçiniz",
          icon: <IconX />,
          color: "red",
        });
      }
      await createBulkProductsMutation({ excel }).unwrap();
      showNotification({
        title: "Başarılı",
        message: "Ürünler oluşturuldu",
        icon: <IconCircleCheck />,
        color: "green",
      });
      closeAllModals();
    } catch {
      // Error is handled by the RTK Query middleware at @app/middlewares/rtkQueryErrorLogger.ts
    }
  };

  return (
    <form
      onSubmit={form.onSubmit(onCreateBulkProductSubmit, handleFormError)}
      encType="multipart/form-data"
    >
      <FileInput
        label="Excel dosyası"
        placeholder="Excel dosyası seçiniz"
        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
        {...form.getInputProps("excel")}
      />
      <Box mt="md">
        <Text size="sm">Örnek Excel Formatı</Text>
        <img src={ExcelFormatExampleImage} alt="excel format example" width={300} />
      </Box>
      <Button mt="md" type="submit" loading={isLoading}>
        Oluştur
      </Button>
    </form>
  );
};
