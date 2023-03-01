import React, { useEffect } from "react";

// UI Components
import { Button, NumberInput, Select, TextInput } from "@mantine/core";
import { DatePicker } from "@mantine/dates";

// Components
import SelectProduct from "@components/Product/SelectProduct";
import SelectSupplier from "@components/Supplier/SelectSupplier";

// UI Utils
import { UseFormReturnType } from "@mantine/form";

// Validation
import { CreateDeliveryValues } from "./createDeliveryValidation";

// Props
type FormProps = {
  form: UseFormReturnType<CreateDeliveryValues>;
};

export const Form: React.FC<FormProps> = ({ form }) => {
  const handleAddProduct = () => {
    // Destructuring form values
    const {
      deliveryDetails,
      supplierId,
      deliveryDate,
      invoiceDate,
      productId,
      taxRate,
      product,
      ...item
    } = form.values;

    form.insertListItem("deliveryDetails", {
      ...item,
      productId: +productId,
      taxRate: +taxRate,
      product,
    });
  };

  useEffect(() => {
    if (form.values.productId) {
      // Calculate subtotal and set it in form
      const subTotal = form.values.quantity * form.values.unitPriceTRY;
      form.setFieldValue("subTotal", subTotal);

      // Calculate total and set it in form
      const tax = form.values.taxRate !== "0" ? (subTotal * +form.values.taxRate) / 100 : 0;
      form.setFieldValue("total", subTotal + tax);
    }
  }, [form.values.quantity, form.values.unitPriceTRY, form.values.taxRate]);

  return (
    <div>
      <DatePicker
        label="Sevkiyat Tarihi"
        placeholder="Sevkiyat Tarihi"
        clearable={false}
        {...form.getInputProps("deliveryDate")}
      />
      <DatePicker
        label="Fatura Tarihi"
        placeholder="Fatura Tarihi"
        mt="md"
        clearable={false}
        {...form.getInputProps("invoiceDate")}
      />
      <SelectSupplier
        label="Tedarikçi"
        mt="md"
        placeholder="Tedarikçi seçiniz"
        searchable
        creatable
        nothingFound="Sonuç bulunamadı"
        dropdownComponent="div"
        getCreateLabel={(query) => `+ ${query} oluştur`}
        {...form.getInputProps("supplierId")}
        onChange={(supplierId) => {
          if (supplierId) {
            form.setFieldValue("supplierId", supplierId);
          }
        }}
      />
      <SelectProduct
        label="Ürün"
        mt="md"
        placeholder="Ürün seçiniz"
        searchable
        creatable
        nothingFound="Sonuç bulunamadı"
        dropdownComponent="div"
        getCreateLabel={(query) => `+ ${query} oluştur`}
        {...form.getInputProps("productId")}
        onChange={(productId, product) => {
          if (productId && product) {
            form.setFieldValue("productId", productId);
            form.setFieldValue("product", product);
            form.setFieldValue("storageType", product.storageType);
            form.setFieldValue("unit", product.amountUnit);
          }
        }}
      />
      <Select
        label="Depo türü"
        mt="md"
        placeholder="Depo türü seçiniz"
        dropdownComponent="div"
        readOnly
        data={[
          { label: "HM", value: "HM" },
          { label: "YM", value: "YM" },
          { label: "FN", value: "FN" },
          { label: "Diğer", value: "Other" },
        ]}
        {...form.getInputProps("storageType")}
      />
      <NumberInput
        label="Miktar"
        precision={2}
        min={0}
        mt="md"
        {...form.getInputProps("quantity")}
      />
      <TextInput label="Birim" mt="md" readOnly {...form.getInputProps("unit")} />
      <NumberInput
        label="Birim fiyat"
        precision={2}
        min={0}
        icon={<span>₺</span>}
        mt="md"
        {...form.getInputProps("unitPriceTRY")}
      />
      <Select
        label="KDV"
        mt="md"
        placeholder="KDV oranı seçiniz"
        dropdownComponent="div"
        icon={<span>%</span>}
        data={[
          { label: "0", value: "0" },
          { label: "1", value: "1" },
          { label: "8", value: "8" },
          { label: "18", value: "18" },
        ]}
        {...form.getInputProps("taxRate")}
      />
      <NumberInput
        label="Ara toplam"
        readOnly
        precision={2}
        min={0}
        icon={<span>₺</span>}
        mt="md"
        {...form.getInputProps("subTotal")}
      />
      <NumberInput
        label="Toplam"
        readOnly
        precision={2}
        min={0}
        icon={<span>₺</span>}
        mt="md"
        {...form.getInputProps("total")}
      />
      <Button onClick={handleAddProduct} mt="md">
        Ürün Ekle
      </Button>
    </div>
  );
};
