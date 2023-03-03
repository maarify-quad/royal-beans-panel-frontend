import { useMemo, useState } from "react";

// Routing
import { Link } from "react-router-dom";

// Services
import { RequestQuery, useGetProductsByStorageTypeQuery } from "@services/productApi";

// UI Components
import { Alert, Anchor, Group, Paper, Select, Text, TextInput } from "@mantine/core";
import { DataTable, DataTableColumn, DataTableSortStatus } from "mantine-datatable";

// UI Utils
import { useDebouncedValue } from "@mantine/hooks";

// Icons
import { IconAlertCircle } from "@tabler/icons";

// Interfaces
import { Product, ProductStorageType } from "@interfaces/product";

// Props
type StorageProductsProps = {
  storageType: ProductStorageType;
};

export const StorageProducts = ({ storageType }: StorageProductsProps) => {
  // Query state
  const [query, setQuery] = useState<RequestQuery>({
    page: 1,
    limit: 100,
    sortBy: "stockCode",
    sortOrder: "ASC",
    search: "",
  });
  const [debouncedSearch] = useDebouncedValue(query.search, 500);

  // Queries
  const { products, totalCount, isTableLoading, error } = useGetProductsByStorageTypeQuery(
    {
      storageType,
      query: {
        ...query,
        search: debouncedSearch,
      },
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
    <>
      <TextInput
        placeholder="Ürün adı veya stok kodu ile ara"
        my="md"
        value={query.search}
        onChange={(e) => setQuery({ ...query, search: e.currentTarget.value })}
      />
      <Paper radius="md" shadow="sm" p="md" withBorder>
        <DataTable
          highlightOnHover
          records={products}
          columns={columns}
          fetching={isTableLoading}
          noRecordsText="Kayıt bulunamadı"
          loadingText="Yükleniyor"
          recordsPerPage={query.limit || 100}
          totalRecords={totalCount}
          page={query.page || 1}
          onPageChange={(page) => setQuery((prev) => ({ ...prev, page }))}
          sortStatus={sortStatus}
          onSortStatusChange={(status) => {
            setSortStatus(status);
            setQuery((prev) => ({
              ...prev,
              sortBy: status.columnAccessor as keyof Product,
              sortOrder: status.direction === "asc" ? "ASC" : "DESC",
            }));
          }}
        />
        <Group>
          <Text size="sm">Sayfa başı satır</Text>
          <Select
            value={query.limit?.toString() || "100"}
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
    </>
  );
};
