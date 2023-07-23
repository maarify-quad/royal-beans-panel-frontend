import { ChangeEvent, useState } from "react";

// UI Components
import { Button, Checkbox, Stack } from "@mantine/core";
import { useGetProductsExcelExportMutation } from "@services/productApi";
import { closeAllModals } from "@mantine/modals";

export const ExcelExportProducts = () => {
  const [values, setValues] = useState({
    HM: true,
    YM: true,
    FN: true,
    Other: true,
  });

  const [excelExportProducts, { isLoading: isExporting }] = useGetProductsExcelExportMutation();

  const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();

      const { url } = await excelExportProducts(values).unwrap();

      closeAllModals();

      window.open(url, "_blank");
    } catch {}
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [event.target.name]: event.target.checked });
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <Stack>
        <Checkbox label="HM Ürünler" name="HM" checked={values.HM} onChange={handleChange} />
        <Checkbox label="YM Ürünler" name="YM" checked={values.YM} onChange={handleChange} />
        <Checkbox label="FN Ürünler" name="FN" checked={values.FN} onChange={handleChange} />
        <Checkbox
          label="Diğer Ürünler"
          name="Other"
          checked={values.Other}
          onChange={handleChange}
        />
      </Stack>
      <Button type="submit" mt="md" loading={isExporting}>
        İndir
      </Button>
    </form>
  );
};
