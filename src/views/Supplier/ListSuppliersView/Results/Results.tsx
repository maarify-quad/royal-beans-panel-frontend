import React, { useMemo } from "react";

// Routing
import { Link } from "react-router-dom";

// Services
import { useGetSuppliersQuery } from "@services/supplierApi";

// UI Components
import { Alert, Anchor, Group, Paper, Select, Text } from "@mantine/core";
import { DataTable, DataTableColumn } from "mantine-datatable";

// Icons
import { IconInfoCircle } from "@tabler/icons";

// Interfaces
import { Supplier } from "@interfaces/supplier";

export const Results = () => {
  // Internal state
  const [query, setQuery] = React.useState({
    page: 1,
    limit: 25,
  });

  // Queries
  const { suppliers, totalCount, isLoading, isFetching, error } = useGetSuppliersQuery(query, {
    selectFromResult: ({ data, ...rest }) => ({
      ...rest,
      suppliers: data?.suppliers,
      totalPages: data?.totalPages,
      totalCount: data?.totalCount,
    }),
  });

  const columns: DataTableColumn<Supplier>[] = useMemo(
    () => [
      {
        accessor: "name",
        title: "Tedarikçi",
        render: (supplier) => (
          <Anchor component={Link} to={`/dashboard/suppliers/${supplier.id}`}>
            {supplier.name}
          </Anchor>
        ),
      },
      { accessor: "id", title: "Tedarikçi Kodu	" },
      {
        accessor: "totalVolume",
        title: "Toplam Hacim",
        render: (supplier) =>
          Intl.NumberFormat("tr-TR", {
            style: "currency",
            currency: "TRY",
          }).format(supplier.totalVolume),
      },
    ],
    [suppliers]
  );

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

  if (suppliers?.length === 0) {
    return (
      <Alert color="cyan" mt="md" icon={<IconInfoCircle />}>
        Tedarikçi bulunmamaktadır
      </Alert>
    );
  }

  return (
    <Paper radius="md" shadow="sm" p="md" mt="md" withBorder>
      <DataTable
        highlightOnHover
        records={suppliers}
        columns={columns}
        fetching={isLoading || isFetching}
        noRecordsText="Kayıt bulunamadı"
        loadingText="Yükleniyor"
        recordsPerPage={query.limit}
        totalRecords={totalCount}
        page={query.page}
        onPageChange={(page) => setQuery((prev) => ({ ...prev, page }))}
      />
      <Group>
        <Text size="sm">Sayfa başı satır</Text>
        <Select
          value={query.limit.toString()}
          onChange={(limit) => {
            if (limit) {
              setQuery({ page: 1, limit: +limit });
            }
          }}
          data={[
            { label: "25", value: "25" },
            { label: "50", value: "50" },
            { label: "100", value: "100" },
          ]}
          style={{ width: 60 }}
          size="xs"
        />
      </Group>
    </Paper>
  );
};
