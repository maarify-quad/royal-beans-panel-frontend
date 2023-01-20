import React from "react";

// Services
import { useGetProductsQuery } from "@services/productApi";

// UI Components
import { Alert, Container, Loader, ScrollArea } from "@mantine/core";

// Icons
import { IconInfoCircle } from "@tabler/icons";

// Components
import { ResultsTable } from "@components/ResultsTable";

// Interfaces
import { RowDef } from "@components/ResultsTable/interfaces/RowDef";

export const BulkUpdateStock = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();

  const productsRow: RowDef[][] = React.useMemo(
    () =>
      products?.map((product) => [
        { value: product.name },
        { value: product.stockCode || "-" },
        { value: product.storageType || "-" },
        { value: product.amountUnit },
        { value: product.amount },
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

  return (
    <Container fluid p={0}>
      <ScrollArea>
        <ResultsTable
          headers={[
            { value: "Ürün" },
            { value: "Stok Kodu" },
            { value: "Depo" },
            { value: "Miktar Birimi" },
            { value: "Miktar" },
          ]}
          rows={productsRow}
        />
      </ScrollArea>
    </Container>
  );
};
