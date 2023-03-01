import { useMemo, useState } from "react";

// Routing
import { Link } from "react-router-dom";

// Services
import { RequestQuery, useGetSuppliersQuery } from "@services/supplierApi";

// UI Components
import { Alert, Anchor, Group, Paper, Select, Text } from "@mantine/core";
import { DataTable, DataTableColumn, DataTableSortStatus } from "mantine-datatable";

// Icons
import { IconAlertCircle } from "@tabler/icons";

// Utils
import { formatCurrency } from "@utils/localization";

// Interfaces
import { Supplier } from "@interfaces/supplier";

export const Results = () => {
  // State
  const [query, setQuery] = useState<RequestQuery>({
    page: 1,
    limit: 25,
    sortBy: "id",
    sortOrder: "ASC",
  });
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
    columnAccessor: "id",
    direction: "asc",
  });

  // Queries
  const { suppliers, totalCount, isLoading, isFetching, error } = useGetSuppliersQuery(
    { query },
    {
      selectFromResult: ({ data, ...rest }) => ({
        ...rest,
        suppliers: data?.suppliers,
        totalPages: data?.totalPages,
        totalCount: data?.totalCount,
      }),
    }
  );

  const columns = useMemo<DataTableColumn<Supplier>[]>(
    () => [
      {
        accessor: "name",
        title: "Tedarikçi",
        sortable: true,
        render: (supplier) => (
          <Anchor component={Link} to={`/dashboard/suppliers/${supplier.id}`}>
            {supplier.name}
          </Anchor>
        ),
      },
      { accessor: "id", title: "Tedarikçi Kodu", sortable: true },
      {
        accessor: "totalVolume",
        title: "Toplam Hacim",
        sortable: true,
        render: (supplier) => formatCurrency(supplier.totalVolume),
      },
    ],
    [suppliers]
  );

  if (error) {
    return (
      <Alert
        icon={<IconAlertCircle />}
        color="red"
        title="Tedarikçilere ulaşılamadı"
        variant="filled"
        mt="md"
      >
        {(error as any)?.data?.message || "Beklenmedik bir hata oluştu"}
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
        recordsPerPage={query.limit || 25}
        totalRecords={totalCount}
        page={query.page || 1}
        onPageChange={(page) => setQuery((prev) => ({ ...prev, page }))}
        sortStatus={sortStatus}
        onSortStatusChange={(status) => {
          setSortStatus(status);
          setQuery((prev) => ({
            ...prev,
            sortBy: status.columnAccessor as keyof Supplier,
            sortOrder: status.direction === "asc" ? "ASC" : "DESC",
          }));
        }}
      />
      <Group>
        <Text size="sm">Sayfa başı satır</Text>
        <Select
          value={query.limit?.toString() || "25"}
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
