import React from "react";

// Services
import { useGetProductsByStorageTypeQuery } from "@services/productApi";

// UI Components
import { Alert, Container, Loader, ScrollArea, Table } from "@mantine/core";

// Icons
import {
  AlertCircle as AlertCircleIcon,
  InfoCircle as InfoCircleIcon,
} from "tabler-icons-react";

// Props
type StorageProductsProps = {
  storageType: string;
};

export const StorageProducts: React.FC<StorageProductsProps> = ({ storageType }) => {
  const { data, isLoading, error } = useGetProductsByStorageTypeQuery(storageType);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <Alert
        icon={<AlertCircleIcon />}
        color="red"
        title="Ürünlere ulaşılamadı"
        variant="filled"
      >
        {(error as any)?.data?.message || "Beklenmedik bir hata oluştu"}
      </Alert>
    );
  }

  if (data?.length === 0) {
    return (
      <Alert color="cyan" icon={<InfoCircleIcon />}>
        Bu kategoriye ait ürün bulunmamaktadır
      </Alert>
    );
  }

  return (
    <Container fluid p={0}>
      <ScrollArea>
        <Table highlightOnHover verticalSpacing="sm">
          <thead>
            <tr>
              <th>Ürün</th>
              <th>Stok Kodu</th>
              <th>Stok Miktarı</th>
              <th>Birim</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((product, i) => (
              <tr key={i}>
                <td>{product.name}</td>
                <td>{product.stockCode || "-"}</td>
                <td>{product.amount}</td>
                <td>{product.amountUnit}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </ScrollArea>
    </Container>
  );
};
