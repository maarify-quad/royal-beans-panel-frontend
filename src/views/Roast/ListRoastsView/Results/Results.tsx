import React from "react";
import dayjs from "dayjs";

// Services
import { useGetAllRoastsQuery } from "@services/roastApi";

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
  const { data, isLoading, error } = useGetAllRoastsQuery(page);

  const roastRows: RowDef[][] = React.useMemo(
    () =>
      data?.roasts.map((roast) => [
        { value: roast.id },
        {
          value: dayjs(roast.date).format("DD MMM YYYY"),
          link: `/dashboard/roasts/${roast.id}`,
        },
        { value: `${roast.totalInputAmount} kg` },
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
        title="Kavrumlara ulaşılamadı"
        variant="filled"
        mt="md"
      >
        {(error as any)?.data?.message || "Beklenmedik bir hata oluştu"}
      </Alert>
    );
  }

  if (data?.roasts.length === 0) {
    return (
      <Alert color="cyan" mt="md" icon={<AlertCircleIcon />}>
        Kavrum bulunmamaktadır
      </Alert>
    );
  }

  return (
    <Container fluid mt="md" p={0}>
      <ResultsTable
        headers={[{ value: "Kavrum Kodu" }, { value: "Tarih" }, { value: "Toplam Miktar" }]}
        rows={roastRows}
        pagination={{
          totalPage: data?.totalPage || 0,
          currentPage: page,
          onPageChange: (page) => setPage(page),
        }}
      />
    </Container>
  );
};
