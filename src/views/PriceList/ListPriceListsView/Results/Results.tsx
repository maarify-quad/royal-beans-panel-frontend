import React from "react";

// Services
import { useGetPriceListsQuery } from "@services/priceListApi";

// UI Components
import { Table, Container, Loader, Alert } from "@mantine/core";

// Icons
import { AlertCircle as AlertCircleIcon } from "tabler-icons-react";

export const Results = () => {
  // Queries
  const { data, isLoading, error } = useGetPriceListsQuery();

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <Alert
        icon={<AlertCircleIcon />}
        color="red"
        title="Fiyat listelerine ulaşılamadı"
        variant="filled"
        mt="md"
      >
        {(error as any)?.data?.message || "Beklenmedik bir hata oluştu"}
      </Alert>
    );
  }

  if (data?.priceLists.length === 0) {
    return (
      <Alert color="cyan" mt="md" icon={<AlertCircleIcon />}>
        Fiyat listesi bulunmamaktadır
      </Alert>
    );
  }

  return (
    <Container fluid mt="md" p={0}>
      <Table highlightOnHover verticalSpacing="sm">
        <thead>
          <tr>
            <th>Fiyat Listesi</th>
            <th>Açıklama</th>
            <th>Müşteri Sayısı</th>
          </tr>
        </thead>
        <tbody>
          {data?.priceLists.map((priceList, i) => (
            <tr key={i}>
              <td>{priceList.name}</td>
              <td>{priceList.description || "-"}</td>
              <td>{priceList.customers?.length || "0"}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};
