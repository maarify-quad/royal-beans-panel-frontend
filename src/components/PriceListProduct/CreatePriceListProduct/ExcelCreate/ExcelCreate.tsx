import React, { useEffect } from "react";

// Services
import { useCreateBulkPriceListProductsFromExcelMutation } from "@services/priceListProductApi";

// UI Components
import { Box, Button, FileInput, Text } from "@mantine/core";

// UI Utils
import { showNotification } from "@mantine/notifications";
import { closeModal } from "@mantine/modals";
import { useForm, zodResolver } from "@mantine/form";

// Assets
import ExcelFormatExampleImage from "@assets/create-bulk-price-list-products-excel-format-example.png";

// Icons
import { IconCircleCheck, IconX } from "@tabler/icons";

// Validation
import { Inputs } from "./validation/Inputs";
import { schema, initialValues } from "./validation/schema";

// Props
type ExcelCreateProps = {
  priceListId: number;
};

export const ExcelCreate: React.FC<ExcelCreateProps> = ({ priceListId }) => {
  // Mutations
  const [createBulkPriceListProductsMutation, { isSuccess, isLoading }] =
    useCreateBulkPriceListProductsFromExcelMutation();

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

      await createBulkPriceListProductsMutation({ excel, priceListId });
    } catch {
      showNotification({
        title: "Ürün oluşturulamadı",
        message: "Beklenmedik bir hata oluştu",
        icon: <IconX />,
        color: "red",
      });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      showNotification({
        title: "Başarılı",
        message: "Ürünler oluşturuldu",
        icon: <IconCircleCheck />,
        color: "green",
      });
      closeModal("createPriceListProduct");
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
