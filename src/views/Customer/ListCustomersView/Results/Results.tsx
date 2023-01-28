import React, { useMemo } from "react";

// Routing
import { Link } from "react-router-dom";

// Services
import { useGetCustomersQuery } from "@services/customerApi";

// UI Components
import { Alert, Anchor, Group, Paper, Select, Text } from "@mantine/core";
import { DataTable, DataTableColumn } from "mantine-datatable";

// Icons
import { IconInfoCircle } from "@tabler/icons";

// Interfaces
import { Customer } from "@interfaces/customer";

export const Results = () => {
  // Internal state
  const [query, setQuery] = React.useState({
    page: 1,
    limit: 25,
  });

  // Queries
  const { customers, totalCount, isTableLoading, error } = useGetCustomersQuery(query, {
    selectFromResult: ({ data, isLoading, isFetching, ...rest }) => ({
      ...rest,
      customers: data?.customers,
      totalPages: data?.totalPages,
      totalCount: data?.totalCount,
      isTableLoading: isLoading || isFetching,
    }),
  });

  const columns: DataTableColumn<Customer>[] = useMemo(
    () => [
      {
        accessor: "name",
        title: "Müşteri",
        render: (customer) => (
          <Anchor component={Link} to={`/dashboard/customers/${customer.id}`}>
            {customer.name}
          </Anchor>
        ),
      },
      {
        accessor: "currentBalance",
        title: "Bakiye",
        render: (customer) =>
          Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY" }).format(
            customer.currentBalance
          ),
      },
    ],
    [customers]
  );

  if (error) {
    return (
      <Alert
        icon={<IconInfoCircle />}
        color="red"
        title="Müşterilere ulaşılamadı"
        variant="filled"
        mt="md"
      >
        {(error as any)?.data?.message || "Beklenmedik bir hata oluştu"}
      </Alert>
    );
  }

  if (customers?.length === 0) {
    return (
      <Alert color="cyan" mt="md" icon={<IconInfoCircle />}>
        Müşteri bulunmamaktadır
      </Alert>
    );
  }

  return (
    <Paper radius="md" shadow="sm" p="md" mt="md" withBorder>
      <DataTable
        highlightOnHover
        records={customers}
        columns={columns}
        fetching={isTableLoading}
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
