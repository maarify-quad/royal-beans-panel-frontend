import { useMemo } from "react";

// Services
import { useGetProductsQuery } from "@services/productApi";

// UI Components
import { Select, SelectProps } from "@mantine/core";

// Interfaces
import { Product } from "@interfaces/product";

// Props
type Props = Omit<SelectProps, "data" | "disabled" | "onChange"> & {
  onChange: (value: string | null, product: Product | undefined) => void;
};

export const SelectProduct = ({ onChange, ...rest }: Props) => {
  const { products, isLoading, isFetching } = useGetProductsQuery(undefined, {
    selectFromResult: ({ data, ...rest }) => ({
      products: data?.products,
      ...rest,
    }),
  });

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
