import { useEffect, useMemo, useState } from "react";
import sortBy from "lodash/sortBy";

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
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 100,
  });

  // Queries
  const { products, totalCount, isTableLoading, error } = useGetProductsByStorageTypeQuery(
    {
      storageType,
      pagination,
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
    columnAccessor: "name",
    direction: "asc",
  });
  const [sortedProducts, setSortedProducts] = useState(products);

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
    ],
    [products]
  );

  useEffect(() => {
    const data = sortBy(products, sortStatus.columnAccessor);
    setSortedProducts(sortStatus.direction === "desc" ? data.reverse() : data);
  }, [sortStatus]);

  useEffect(() => {
    setSortedProducts(products);
  }, [products]);

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
        records={sortedProducts}
        columns={columns}
        fetching={isTableLoading}
        noRecordsText="Kayıt bulunamadı"
        loadingText="Yükleniyor"
        recordsPerPage={pagination.limit}
        totalRecords={totalCount}
        page={pagination.page}
        onPageChange={(page) => setPagination((prev) => ({ ...prev, page }))}
        sortStatus={sortStatus}
        onSortStatusChange={setSortStatus}
      />
      <Group>
        <Text size="sm">Sayfa başı satır</Text>
        <Select
          value={pagination.limit.toString()}
          onChange={(limit) => {
            if (limit) {
              setPagination({ page: 1, limit: +limit });
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
