import { useMemo, useState } from "react";

// Services
import { useGetProductsByStorageTypeQuery } from "@services/productApi";

// UI Components
import {
  NumberInput,
  Paper,
  ScrollArea,
  Table,
  MultiSelect,
  ActionIcon,
  Alert,
} from "@mantine/core";

// UI Utils
import { UseFormReturnType } from "@mantine/form";

// Icons
import { IconAlertCircle, IconTrash } from "@tabler/icons";

// Validation
import { CreatePriceListValues } from "../createPriceListValidation";

// Props
type Props = {
  form: UseFormReturnType<CreatePriceListValues>;
};

export const AddProduct = ({ form }: Props) => {
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);

  // Queries
  const { products, isLoading, isFetching, error } = useGetProductsByStorageTypeQuery(
    { storageType: "FN" },
    {
      selectFromResult: ({ data, ...rest }) => ({
        ...rest,
        products: data?.products,
      }),
    }
  );

  const productSelectOptions = useMemo(
    () =>
      products?.map((product) => ({
        label: `${product.name} - ${product.stockCode}`,
        value: product.id.toString(),
      })) ?? [],
    [products, form.values.products]
  );

  const selectedProducts = useMemo(
    () => products?.filter((product) => selectedProductIds.includes(product.id.toString())) ?? [],
    [products, selectedProductIds]
  );

  const handleNumberInputChange = (
    field: "unitPrice" | "taxRate",
    productId: number,
    value: number | undefined
  ) => {
    if (value === undefined) return;

    if (form.values.products[productId]) {
      return form.setFieldValue(`products.${productId}.${field}`, value);
    }

    form.setFieldValue(`products.${productId}`, {
      [field]: value,
      [field === "unitPrice" ? "taxRate" : "unitPrice"]: 0,
    });
  };

  if (error) {
    return (
      <Alert title="Ürünlere ulaşılamadı" color="red" mt="md" icon={<IconAlertCircle />}>
        {(error as any)?.data?.message || "Beklenmedik bir hata oluştu"}
      </Alert>
    );
  }

  return (
    <>
      <MultiSelect
        label="Ürünler"
        placeholder="Ürün adı veya stok kodu ile arayın"
        mt="md"
        searchable
        clearable
        withAsterisk
        nothingFound="Ürün bulunamadı"
        disabled={isLoading || isFetching}
        data={productSelectOptions}
        value={selectedProductIds}
        onChange={(values) => {
          setSelectedProductIds(values);
          values.forEach((value) => {
            if (!form.values.products[value]) {
              form.setFieldValue(`products.${value}`, {
                unitPrice: 0,
                taxRate: 0,
              });
            }
          });
        }}
      />
      {Boolean(selectedProductIds.length) && (
        <Paper withBorder mt="md" p="md" radius="md">
          <ScrollArea>
            <Table highlightOnHover miw={500} sx={{ tableLayout: "fixed" }}>
              <thead>
                <tr>
                  <th>Ürün</th>
                  <th>Stok Kodu</th>
                  <th>Birim Fiyat</th>
                  <th>Vergi Oranı</th>
                  <th>İşlem</th>
                </tr>
              </thead>
              <tbody>
                {selectedProducts.map((product) => (
                  <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>{product.stockCode}</td>
                    <td>
                      <NumberInput
                        placeholder="Birim Fiyat"
                        icon="₺"
                        min={0}
                        precision={2}
                        value={form.values.products[product.id]?.unitPrice ?? 0}
                        onChange={(value) =>
                          handleNumberInputChange("unitPrice", product.id, value)
                        }
                      />
                    </td>
                    <td>
                      <NumberInput
                        placeholder="Vergi Oranı"
                        icon="%"
                        min={0}
                        precision={2}
                        value={form.values.products[product.id]?.taxRate ?? 0}
                        onChange={(value) => handleNumberInputChange("taxRate", product.id, value)}
                      />
                    </td>
                    <td>
                      <ActionIcon
                        color="red"
                        onClick={() => {
                          setSelectedProductIds((prev) =>
                            prev.filter((id) => id !== product.id.toString())
                          );
                          form.setFieldValue(`products.${product.id}`, undefined);
                        }}
                      >
                        <IconTrash size={18} />
                      </ActionIcon>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </ScrollArea>
        </Paper>
      )}
    </>
  );
};
