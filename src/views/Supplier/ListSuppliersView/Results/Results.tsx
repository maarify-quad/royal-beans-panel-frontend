import React from "react";

// Services
import { useGetSuppliersQuery } from "@services/supplierApi";

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
  const { data, isLoading, error } = useGetSuppliersQuery(page);

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
        icon={<IconInfoCircle />}
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
      <Alert color="cyan" mt="md" icon={<IconInfoCircle />}>
        Tedarikçi bulunmamaktadır
      </Alert>
    );
  }

  return (
    <Container fluid mt="md" p={0}>
      <ResultsTable
        headers={[{ value: "Tedarikçi" }, { value: "Tedarikçi Kodu" }, { value: "Toplam Hacim" }]}
        rows={supplierRows}
        pagination={{
          totalPage: data?.totalPage || 0,
          currentPage: page,
          onPageChange: (page) => setPage(page),
        }}
      />
    </Container>
  );
};
