import React from "react";

// Services
import { useGetCustomersQuery } from "@services/customerApi";

// UI Components
import { Container, Loader, Alert } from "@mantine/core";

// Icons
import { AlertCircle as AlertCircleIcon } from "tabler-icons-react";

// Components
import { ResultsTable } from "@components/ResultsTable";

// Interfaces
import { RowDef } from "@components/ResultsTable/interfaces/RowDef";

export const Results = () => {
  // Internal state
  const [page, setPage] = React.useState(1);

  // Queries
  const { data, isLoading, error } = useGetCustomersQuery(page);

  const customerRows: RowDef[][] = React.useMemo(
    () =>
      data?.customers.map((customer) => [
        { value: customer.name, link: `/dashboard/customers/${customer.id}` },
        { value: `${customer.currentBalance.toFixed(2)} ₺` },
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
        title="Müşterilere ulaşılamadı"
        variant="filled"
        mt="md"
      >
        {(error as any)?.data?.message || "Beklenmedik bir hata oluştu"}
      </Alert>
    );
  }

  if (data?.customers.length === 0) {
    return (
      <Alert color="cyan" mt="md" icon={<AlertCircleIcon />}>
        Müşteri bulunmamaktadır
      </Alert>
    );
  }

  return (
    <Container fluid mt="md" p={0}>
      <ResultsTable
        headers={[{ value: "Müşteri" }, { value: "Bakiye" }]}
        rows={customerRows}
        pagination={{
          totalPage: data?.totalPage || 0,
          currentPage: page,
          onPageChange: (page) => setPage(page),
        }}
      />
    </Container>
  );
};
