import React, { useRef, useCallback } from "react";

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

// Helper to round to 2 decimal places
const round2 = (num: number) => Math.round(num * 100) / 100;

export const Form: React.FC<FormProps> = ({ form }) => {
  // Ref to prevent recursive calculations
  const isCalculating = useRef(false);

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
      taxRate: taxRate,
      product,
    });
  };

  // Calculate from unitPriceTRY (forward calculation)
  const calculateFromUnitPrice = useCallback(
    (unitPriceTRY: number, quantity: number, taxRate: number) => {
      if (isCalculating.current) return;
      isCalculating.current = true;

      const subTotal = round2(quantity * unitPriceTRY);
      const total = round2(subTotal * (1 + taxRate / 100));

      form.setFieldValue("subTotal", subTotal);
      form.setFieldValue("total", total);

      isCalculating.current = false;
    },
    [form]
  );

  // Calculate from subTotal (reverse calculation)
  const calculateFromSubTotal = useCallback(
    (subTotal: number, quantity: number, taxRate: number) => {
      if (isCalculating.current || quantity === 0) return;
      isCalculating.current = true;

      const unitPriceTRY = round2(subTotal / quantity);
      const total = round2(subTotal * (1 + taxRate / 100));

      form.setFieldValue("unitPriceTRY", unitPriceTRY);
      form.setFieldValue("total", total);

      isCalculating.current = false;
    },
    [form]
  );

  // Calculate from total (reverse calculation)
  const calculateFromTotal = useCallback(
    (total: number, quantity: number, taxRate: number) => {
      if (isCalculating.current || quantity === 0) return;
      isCalculating.current = true;

      const subTotal = round2(total / (1 + taxRate / 100));
      const unitPriceTRY = round2(subTotal / quantity);

      form.setFieldValue("subTotal", subTotal);
      form.setFieldValue("unitPriceTRY", unitPriceTRY);

      isCalculating.current = false;
    },
    [form]
  );

  // Handle unitPriceTRY change
  const handleUnitPriceChange = (value: number | undefined) => {
    const unitPriceTRY = value ?? 0;
    form.setFieldValue("unitPriceTRY", unitPriceTRY);
    if (form.values.productId) {
      calculateFromUnitPrice(unitPriceTRY, form.values.quantity, form.values.taxRate);
    }
  };

  // Handle quantity change
  const handleQuantityChange = (value: number | undefined) => {
    const quantity = value ?? 0;
    form.setFieldValue("quantity", quantity);
    if (form.values.productId && quantity > 0) {
      calculateFromUnitPrice(form.values.unitPriceTRY, quantity, form.values.taxRate);
    }
  };

  // Handle taxRate change
  const handleTaxRateChange = (value: number | undefined) => {
    const taxRate = value ?? 0;
    form.setFieldValue("taxRate", taxRate);
    if (form.values.productId) {
      calculateFromUnitPrice(form.values.unitPriceTRY, form.values.quantity, taxRate);
    }
  };

  // Handle subTotal change (manual entry)
  const handleSubTotalChange = (value: number | undefined) => {
    const subTotal = value ?? 0;
    form.setFieldValue("subTotal", subTotal);
    if (form.values.productId) {
      calculateFromSubTotal(subTotal, form.values.quantity, form.values.taxRate);
    }
  };

  // Handle total change (manual entry)
  const handleTotalChange = (value: number | undefined) => {
    const total = value ?? 0;
    form.setFieldValue("total", total);
    if (form.values.productId) {
      calculateFromTotal(total, form.values.quantity, form.values.taxRate);
    }
  };

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
        value={form.values.quantity}
        onChange={handleQuantityChange}
        error={form.errors.quantity}
      />
      <TextInput label="Birim" mt="md" readOnly {...form.getInputProps("unit")} />
      <NumberInput
        label="Birim fiyat"
        precision={2}
        min={0}
        icon={<span>₺</span>}
        mt="md"
        value={form.values.unitPriceTRY}
        onChange={handleUnitPriceChange}
        error={form.errors.unitPriceTRY}
      />
      <NumberInput
        label="KDV"
        mt="md"
        placeholder="KDV oranı giriniz"
        icon={<span>%</span>}
        precision={2}
        min={0}
        value={form.values.taxRate}
        onChange={handleTaxRateChange}
        error={form.errors.taxRate}
      />
      <NumberInput
        label="Ara toplam"
        precision={2}
        min={0}
        icon={<span>₺</span>}
        mt="md"
        value={form.values.subTotal}
        onChange={handleSubTotalChange}
        error={form.errors.subTotal}
        description="Manuel girilirse birim fiyat otomatik hesaplanır"
      />
      <NumberInput
        label="Toplam"
        precision={2}
        min={0}
        icon={<span>₺</span>}
        mt="md"
        value={form.values.total}
        onChange={handleTotalChange}
        error={form.errors.total}
        description="Manuel girilirse ara toplam ve birim fiyat otomatik hesaplanır"
      />
      <Button onClick={handleAddProduct} mt="md">
        Ürün Ekle
      </Button>
    </div>
  );
};
