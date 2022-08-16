import React from "react";

// Services
import { useGetAllSuppliersQuery } from "@services/supplierApi";

// UI Components
import { Container, Loader, Alert } from "@mantine/core";

// Icons
import { AlertCircle as AlertCircleIcon } from "tabler-icons-react";

// Components
import { ResultsTable } from "@components/ResultsTable";
import { Pagination } from "./Pagination";

// Interfaces
import { RowDef } from "@components/ResultsTable/interfaces/RowDef";

export const Results = () => {
  // Internal state
  const [page, setPage] = React.useState(1);

  // Queries
  const { data, isLoading, error } = useGetAllSuppliersQuery(page);

  const supplierRows: RowDef[][] = React.useMemo(
    () =>
      data?.suppliers.map((supplier) => [
        { value: supplier.name, link: `/dashboard/suppliers/${supplier.id}` },
        { value: supplier.id },
        { value: `${supplier.totalVolume} ₺` },
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
        title="Tedarikçilere ulaşılamadı"
        variant="filled"
        mt="md"
      >
        {(error as any)?.data?.message || "Beklenmedik bir hata oluştu"}
      </Alert>
    );
  }

  if (data?.suppliers.length === 0) {
    return (
      <Alert color="cyan" mt="md" icon={<AlertCircleIcon />}>
        Tedarikçi bulunmamaktadır
      </Alert>
    );
  }

  return (
    <Container fluid mt="md" p={0}>
      <ResultsTable
        headers={[
          { value: "Tedarikçi" },
          { value: "Tedarikçi Kodu" },
          { value: "Toplam Hacim" },
        ]}
        rows={supplierRows}
      />
      {data?.totalPage && data.totalPage > 1 ? (
        <Pagination onPageChange={setPage} total={data.totalPage} page={page} />
      ) : null}
    </Container>
  );
};
