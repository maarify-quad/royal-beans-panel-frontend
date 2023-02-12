import { useMemo } from "react";

// Services
import { useGetProductsQuery } from "@services/productApi";

// UI Components
import { Select, SelectProps } from "@mantine/core";

export const SelectProduct = (props: Omit<SelectProps, "data" | "disabled">) => {
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

  return <Select {...props} disabled={isLoading || isFetching} data={productSelectOptions} />;
};
