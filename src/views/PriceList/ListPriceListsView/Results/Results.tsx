import React from "react";

// Services
import { useGetPriceListsQuery } from "@services/priceListApi";

// UI Components
import { Container, Loader, Alert } from "@mantine/core";

// Icons
import { IconInfoCircle } from "@tabler/icons";

// Components
import { ResultsTable } from "@components/ResultsTable";

// Interfaces
import { RowDef } from "@components/ResultsTable/interfaces/RowDef";

export const Results = () => {
  // Internal state
  const [page, setPage] = React.useState(1);

  // Queries
  const { data, isLoading, error } = useGetPriceListsQuery(page);

  const priceListRows: RowDef[][] = React.useMemo(
    () =>
      data?.priceLists.map((priceList) => [
        { value: priceList.name, link: `/dashboard/price-lists/${priceList.id}` },
        { value: priceList.description || "-" },
        { value: priceList.customers?.length || 0 },
      ]) || [],
    [data]
  );

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <Alert
        icon={<IconInfoCircle />}
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
      <Alert color="cyan" mt="md" icon={<IconInfoCircle />}>
        Fiyat listesi bulunmamaktadır
      </Alert>
    );
  }

  return (
    <Container fluid mt="md" p={0}>
      <ResultsTable
        headers={[{ value: "Fiyat Listesi" }, { value: "Açıklama" }, { value: "Müşteri Sayısı" }]}
        rows={priceListRows}
        pagination={{
          totalPage: data?.totalPage || 0,
          currentPage: page,
          onPageChange: (page) => setPage(page),
        }}
      />
    </Container>
  );
};
