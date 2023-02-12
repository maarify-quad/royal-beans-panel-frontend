import { useMemo } from "react";

// Services
import { useGetProductsByStorageTypeQuery } from "@services/productApi";

// UI Components
import { Select, SelectProps } from "@mantine/core";

// Interfaces
import { Product } from "@interfaces/product";

// Props
type Props = Omit<SelectProps, "data" | "disabled" | "onChange"> & {
  storageType: "HM" | "YM" | "FN" | "Other";
  onChange: (value: string | null, product: Product | undefined) => void;
};

export const SelectStorageTypeProduct = ({ storageType, onChange, ...rest }: Props) => {
  const { products, isLoading, isFetching } = useGetProductsByStorageTypeQuery(
    {
      storageType,
    },
    {
      selectFromResult: ({ data, ...rest }) => ({
        products: data?.products,
        ...rest,
      }),
    }
  );

  const productSelectOptions = useMemo(
    () =>
      products?.map((product) => ({
        label: product.name,
        value: product.id.toString(),
      })) || [],
    [products]
  );

  return (
    <Select
      {...rest}
      disabled={isLoading || isFetching}
      data={productSelectOptions}
      onChange={(value) => {
        const selectedProduct = products?.find((product) => product.id.toString() === value);
        onChange(value, selectedProduct);
      }}
    />
  );
};
