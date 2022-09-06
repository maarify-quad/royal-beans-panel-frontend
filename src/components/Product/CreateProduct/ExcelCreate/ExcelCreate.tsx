import React, { useEffect } from "react";

// Services
import { useCreateBulkProductsFromExcelMutation } from "@services/productApi";

// UI Components
import { Box, Button, FileInput, Text } from "@mantine/core";

// UI Utils
import { showNotification } from "@mantine/notifications";
import { closeModal } from "@mantine/modals";
import { useForm, zodResolver } from "@mantine/form";

// Assets
import ExcelFormatExampleImage from "@assets/create-bulk-products-excel-format-example.png";

// Icons
import { CircleCheck as CircleCheckIcon, X as ErrorIcon } from "tabler-icons-react";

// Validation
import { Inputs } from "./validation/Inputs";
import { schema, initialValues } from "./validation/schema";

export const ExcelCreate = () => {
  // Mutations
  const [createBulkProductsMutation, { isSuccess, isLoading }] =
    useCreateBulkProductsFromExcelMutation();

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
          icon: <ErrorIcon />,
          color: "red",
        });
      }

      await createBulkProductsMutation({ excel });
    } catch {
      showNotification({
        title: "Ürün oluşturulamadı",
        message: "Beklenmedik bir hata oluştu",
        icon: <ErrorIcon />,
        color: "red",
      });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      showNotification({
        title: "Başarılı",
        message: "Ürünler oluşturuldu",
        icon: <CircleCheckIcon />,
        color: "green",
      });
      closeModal("createProduct");
    }
  }, [isSuccess]);

  return (
    <form onSubmit={form.onSubmit(onCreateBulkProductSubmit)} encType="multipart/form-data">
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
