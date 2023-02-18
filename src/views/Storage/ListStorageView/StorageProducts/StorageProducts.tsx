import { useMemo, useState } from "react";

// Routing
import { Link } from "react-router-dom";

// Services
import { useGetProductsByStorageTypeQuery } from "@services/productApi";

// UI Components
import { Alert, Anchor, Group, Paper, Select, Text } from "@mantine/core";
import { DataTable, DataTableColumn, DataTableSortStatus } from "mantine-datatable";

// Icons
import { IconAlertCircle } from "@tabler/icons";

// Interfaces
import { Product } from "@interfaces/product";

// Props
type StorageProductsProps = {
  storageType: string;
};

export const StorageProducts = ({ storageType }: StorageProductsProps) => {
  // Query state
  const [query, setQuery] = useState({
    page: 1,
    limit: 100,
    sortBy: "stockCode",
    sortOrder: "ASC" as "ASC" | "DESC",
  });

  // Queries
  const { products, totalCount, isTableLoading, error } = useGetProductsByStorageTypeQuery(
    {
      storageType,
      query,
    },
    {
      selectFromResult: ({ data, isLoading, isFetching, ...rest }) => ({
        ...rest,
        products: data?.products,
        totalPages: data?.totalPages,
        totalCount: data?.totalCount,
        isTableLoading: isLoading || isFetching,
      }),
    }
  );

  // State
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
    columnAccessor: "stockCode",
    direction: "asc",
  });

  // Columns
  const columns = useMemo<DataTableColumn<Product>[]>(
    () => [
      {
        accessor: "name",
        title: "Ürün",
        sortable: true,
        render: (product) => (
          <Anchor component={Link} to={`/dashboard/storage/${product.stockCode}`}>
            {product.name}
          </Anchor>
        ),
      },
      { accessor: "stockCode", title: "Stok Kodu", sortable: true },
      { accessor: "amount", title: "Miktar", sortable: true },
      { accessor: "amountUnit", title: "Miktar Birimi", sortable: true },
      { accessor: "tag", title: "Etiket", sortable: true },
    ],
    [products]
  );

  if (error) {
    return (
      <Alert icon={<IconAlertCircle />} color="red" title="Ürünlere ulaşılamadı" variant="filled">
        {(error as any)?.data?.message || "Beklenmedik bir hata oluştu"}
      </Alert>
    );
  }

  return (
    <Paper radius="md" shadow="sm" p="md" mt="md" withBorder>
      <DataTable
        highlightOnHover
        records={products}
        columns={columns}
        fetching={isTableLoading}
        noRecordsText="Kayıt bulunamadı"
        loadingText="Yükleniyor"
        recordsPerPage={query.limit}
        totalRecords={totalCount}
        page={query.page}
        onPageChange={(page) => setQuery((prev) => ({ ...prev, page }))}
        sortStatus={sortStatus}
        onSortStatusChange={(status) => {
          setSortStatus(status);
          setQuery((prev) => ({
            ...prev,
            sortBy: status.columnAccessor,
            sortOrder: status.direction === "asc" ? "ASC" : "DESC",
          }));
        }}
      />
      <Group>
        <Text size="sm">Sayfa başı satır</Text>
        <Select
          value={query.limit.toString()}
          onChange={(limit) => {
            if (limit) {
              setQuery((prev) => ({ ...prev, page: 1, limit: +limit }));
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
