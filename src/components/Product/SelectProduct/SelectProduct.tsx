import { lazy, Suspense, useEffect, useMemo, useState } from "react";

// Services
import { useGetProductsQuery } from "@services/productApi";

// UI Components
import { LoadingOverlay, Select, SelectProps } from "@mantine/core";

// UI Utils
import { openModal } from "@mantine/modals";

// Interfaces
import { Product } from "@interfaces/product";

// Lazy Components
const CreateProduct = lazy(() => import("@components/Product/CreateProduct"));

// Props
type Props = Omit<SelectProps, "data" | "disabled" | "onChange"> & {
  onChange: (value: string | null, product: Product | undefined) => void;
};

export const SelectProduct = ({ onChange, ...rest }: Props) => {
  const { products, isLoading, isFetching, refetch } = useGetProductsQuery(undefined, {
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

  const handleCreateProduct = (value: string) => {
    openModal({
      title: "Ürün Oluştur",
      children: (
        <Suspense fallback={<LoadingOverlay visible />}>
          <CreateProduct
            productName={value}
            onManualCreate={() => {
              refetch();
            }}
          />
        </Suspense>
      ),
    });
    return null;
  };

  return (
    <Select
      {...rest}
      disabled={isLoading || isFetching}
      data={productSelectOptions}
      onChange={(value) => {
        const selectedProduct = products?.find((product) => product.id.toString() === value);
        onChange(value, selectedProduct);
      }}
      {...(rest.creatable && {
        onCreate: handleCreateProduct,
      })}
    />
  );
};
