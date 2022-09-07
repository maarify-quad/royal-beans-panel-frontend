import React from "react";
import dayjs from "dayjs";

// Services
import { useGetAllDeliveriesQuery } from "@services/deliveryApi";

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
  const { data, isLoading, error } = useGetAllDeliveriesQuery(page);

  const deliveryRows: RowDef[][] = React.useMemo(
    () =>
      data?.deliveries.map((delivery) => [
        { value: delivery.id, link: `/dashboard/deliveries/${delivery.id}` },
        { value: dayjs(delivery.deliveryDate).format("DD MMM YYYY") },
        { value: delivery.supplier.name },
        { value: `${delivery.total} ₺` },
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

  if (data?.deliveries.length === 0) {
    return (
      <Alert color="cyan" mt="md" icon={<IconInfoCircle />}>
        Sevkiyat bulunmamaktadır
      </Alert>
    );
  }

  return (
    <Container fluid mt="md" p={0}>
      <ResultsTable
        headers={[
          { value: "Sevkiyat No" },
          { value: "Sevkiyat Tarihi" },
          { value: "Tedarikçi" },
          { value: "Tutar" },
        ]}
        rows={deliveryRows}
        pagination={{
          totalPage: data?.totalPage || 0,
          currentPage: page,
          onPageChange: (page) => setPage(page),
        }}
      />
    </Container>
  );
};
