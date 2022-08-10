import React, { useEffect } from "react";

// Services
import { useGetAllSuppliersQuery } from "@services/supplierApi";
import { useGetAllProductsQuery } from "@services/productApi";

// UI Components
import { Button, LoadingOverlay, NumberInput, Select, TextInput } from "@mantine/core";
import { DatePicker } from "@mantine/dates";

// UI Utils
import { UseFormReturnType } from "@mantine/form";

// Validation
import { Inputs } from "./validation/Inputs";

// Props
type FormProps = {
  form: UseFormReturnType<Inputs>;
};

export const Form: React.FC<FormProps> = ({ form }) => {
  // Get latest suppliers
  const {
    data: suppliersData,
    isLoading: isSuppliersLoading,
    error: suppliersError,
  } = useGetAllSuppliersQuery();

  // Get latest products
  const {
    data: products,
    isLoading: isProductsLoading,
    error: productsError,
  } = useGetAllProductsQuery();

  const productSelectOptions = React.useMemo(
    () =>
      products?.map((product) => ({
        value: product.id,
        label: product.name,
      })) || [],
    [products?.length]
  );

  const supplierSelectOptions = React.useMemo(
    () =>
      suppliersData?.suppliers.map((supplier) => ({
        value: supplier.id,
        label: supplier.name,
      })) || [],
    [suppliersData?.suppliers.length]
  );

  const handleAddProduct = () => {
    // Destructuring form values
    const { deliveryDetails, supplierId, deliveryDate, invoiceDate, ...item } = form.values;

    // Check if product already exists
    const product = products?.find((p) => p.id === item.productId);
    if (product) {
      return form.insertListItem("deliveryDetails", {
        ...item,
        product,
      });
    }

    // Get product from select options
    const newProduct = productSelectOptions.find((p) => p.value === item.productId);
    if (newProduct) {
      return form.insertListItem("deliveryDetails", {
        ...item,
        product: {
          id: newProduct.value,
          name: newProduct.label,
          storageType: form.values.storageType,
          amount: form.values.quantity,
          amountUnit: form.values.unit,
        },
      });
    }
  };

  useEffect(() => {
    if (suppliersData && suppliersData.suppliers.length > 0) {
      form.setFieldValue("supplierId", suppliersData.suppliers[0].id);
    }

    if (products && products.length > 0) {
      form.setFieldValue("productId", products[0].id);
    }
  }, [suppliersData?.suppliers.length, products?.length]);

  useEffect(() => {
    if (form.values.productId) {
      // Calculate subtotal and set it in form
      const subtotal = form.values.quantity * form.values.unitPriceTRY;
      form.setFieldValue("subTotal", subtotal);

      // Calculate total and set it in form
      const tax = form.values.taxRate !== 0 ? (subtotal * form.values.taxRate) / 100 : 0;
      form.setFieldValue("total", subtotal + tax);
    }
  }, [form.values.quantity, form.values.unitPriceTRY, form.values.taxRate]);

  useEffect(() => {
    const product = products?.find((p) => p.id === form.values.productId);
    if (product) {
      form.setFieldValue("storageType", product.storageType);
    }
  }, [form.values.productId]);

  return (
    <div>
      <LoadingOverlay visible={isSuppliersLoading || isProductsLoading} />
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
      <Select
        label="Tedarikçi"
        mt="md"
        placeholder="Tedarikçi seçiniz"
        searchable
        creatable
        nothingFound="Sonuç bulunamadı"
        dropdownComponent="div"
        getCreateLabel={(query) => `+ ${query} oluştur`}
        onCreate={(query) => {
          const value = `NEW_${query}`;
          const item = { value, label: query };
          supplierSelectOptions.push({
            label: query,
            value: value,
          });
          form.setFieldValue("supplierId", value);
          return item;
        }}
        data={supplierSelectOptions}
        {...form.getInputProps("supplierId")}
      />
      <Select
        label="Ürün"
        mt="md"
        placeholder="Ürün seçiniz"
        searchable
        creatable
        nothingFound="Sonuç bulunamadı"
        dropdownComponent="div"
        getCreateLabel={(query) => `+ ${query} oluştur`}
        onCreate={(query) => {
          const value = -Math.random();
          const item = { value, label: query };
          productSelectOptions.push(item);
          form.setFieldValue("productId", value);
          return item;
        }}
        data={productSelectOptions}
        {...form.getInputProps("productId")}
      />
      <Select
        label="Depo türü"
        mt="md"
        placeholder="Depo türü seçiniz"
        dropdownComponent="div"
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
      <TextInput label="Birim" precision={2} mt="md" {...form.getInputProps("unit")} />
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
          { label: "0", value: 0 },
          { label: "1", value: 1 },
          { label: "8", value: 8 },
          { label: "18", value: 18 },
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
      <Button
        onClick={handleAddProduct}
        disabled={form.values.total <= 0}
        variant="outline"
        mt="md"
      >
        Ürün ekle
      </Button>
    </div>
  );
};
