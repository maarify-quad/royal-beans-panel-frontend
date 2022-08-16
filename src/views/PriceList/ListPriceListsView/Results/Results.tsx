import React from "react";

// Services
import { useGetPriceListsQuery } from "@services/priceListApi";

// UI Components
import { Container, Loader, Alert } from "@mantine/core";

// Icons
import { AlertCircle as AlertCircleIcon } from "tabler-icons-react";

// Components
import { ResultsTable } from "@components/ResultsTable";

// Interfaces
import { RowDef } from "@components/ResultsTable/interfaces/RowDef";
import { Pagination } from "./Pagination";

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
      <ResultsTable
        headers={[
          { value: "Fiyat Listesi" },
          { value: "Açıklama" },
          { value: "Müşteri Sayısı" },
        ]}
        rows={priceListRows}
      />
      {data?.totalPage && data.totalPage > 1 ? (
        <Pagination onPageChange={setPage} total={data?.totalPage} page={page} />
      ) : null}
    </Container>
  );
};
