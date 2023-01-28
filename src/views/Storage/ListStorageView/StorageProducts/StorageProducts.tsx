import React from "react";

// Services
import { useGetProductsByStorageTypeQuery } from "@services/productApi";

// UI Components
import { Alert, Container, Loader, ScrollArea } from "@mantine/core";

// Icons
import { IconInfoCircle } from "@tabler/icons";

// Components
import { ResultsTable } from "@components/ResultsTable";

// Interfaces
import { RowDef } from "@components/ResultsTable/interfaces/RowDef";

// Props
type StorageProductsProps = {
  storageType: string;
};

export const StorageProducts: React.FC<StorageProductsProps> = ({ storageType }) => {
  const { products, isLoading, error } = useGetProductsByStorageTypeQuery(
    {
      storageType,
    },
    {
      selectFromResult: ({ data, ...rest }) => ({
        ...rest,
        products: data?.products,
      }),
    }
  );

  const productsRow: RowDef[][] = React.useMemo(
    () =>
      products?.map((product) => [
        { value: product.name },
        { value: product.stockCode || "-" },
        { value: product.amount },
        { value: product.amountUnit },
      ]) || [],
    [products]
  );

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <Alert icon={<IconInfoCircle />} color="red" title="Ürünlere ulaşılamadı" variant="filled">
        {(error as any)?.data?.message || "Beklenmedik bir hata oluştu"}
      </Alert>
    );
  }

  if (products?.length === 0) {
    return (
      <Alert color="cyan" icon={<IconInfoCircle />}>
        Bu kategoriye ait ürün bulunmamaktadır
      </Alert>
    );
  }

  return (
    <Container fluid p={0}>
      <ScrollArea>
        <ResultsTable
          headers={[
            { value: "Ürün" },
            { value: "Stok Kodu" },
            { value: "Miktar" },
            { value: "Miktar Birimi" },
          ]}
          rows={productsRow}
        />
      </ScrollArea>
    </Container>
  );
};
