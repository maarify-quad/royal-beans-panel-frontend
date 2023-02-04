import React, { useMemo, useState } from "react";

// Routing
import { Link } from "react-router-dom";

// Services
import { useGetProductsByStorageTypeQuery } from "@services/productApi";

// UI Components
import { Alert, Anchor, Group, Paper, Select, Text } from "@mantine/core";
import { DataTable, DataTableColumn } from "mantine-datatable";

// Icons
import { IconInfoCircle } from "@tabler/icons";

// Interfaces
import { Product } from "@interfaces/product";

// Props
type StorageProductsProps = {
  storageType: string;
};

export const StorageProducts: React.FC<StorageProductsProps> = ({ storageType }) => {
  const [query, setQuery] = useState({
    page: 1,
    limit: 25,
  });
  const { products, totalCount, isTableLoading, error } = useGetProductsByStorageTypeQuery(
    {
      storageType,
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

  const columns = useMemo<DataTableColumn<Product>[]>(
    () => [
      {
        accessor: "name",
        title: "Ürün",
        render: (product) => (
          <Anchor component={Link} to={`/dashboard/storage/${product.stockCode}`}>
            {product.name}
          </Anchor>
        ),
      },
      { accessor: "stockCode", title: "Stok Kodu" },
      { accessor: "amount", title: "Miktar" },
      { accessor: "amountUnit", title: "Miktar Birimi" },
    ],
    [products]
  );

  if (error) {
    return (
      <Alert icon={<IconInfoCircle />} color="red" title="Ürünlere ulaşılamadı" variant="filled">
        {(error as any)?.data?.message || "Beklenmedik bir hata oluştu"}
      </Alert>
    );
  }

  if (products?.length === 0) {
    return (
      <Alert color="cyan" icon={<IconInfoCircle />}>
        Bu kategoriye ait ürün bulunmamaktadır
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
