import { useMemo, useState } from "react";

// Services
import {
  useGetProductsQuery,
  useBulkUpdateProductsMutation,
  RequestQuery,
} from "@services/productApi";

// UI Components
import {
  ActionIcon,
  Affix,
  Alert,
  Button,
  Group,
  NumberInput,
  Paper,
  Select,
  Text,
  TextInput,
} from "@mantine/core";
import { DataTable, DataTableColumn, DataTableSortStatus } from "mantine-datatable";

// UI Utils
import { useDebouncedValue } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";

// Icons
import { IconCircleCheck, IconInfoCircle, IconX } from "@tabler/icons";

// Interfaces
import { Product } from "@interfaces/product";

export const BulkUpdateStock = () => {
  // State
  const [query, setQuery] = useState<RequestQuery>({
    page: 1,
    limit: 100,
    sortBy: "stockCode",
    sortOrder: "ASC",
    search: "",
  });
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
    columnAccessor: "stockCode",
    direction: "asc",
  });
  const [editedRowIndexes, setEditedRowIndexes] = useState<number[]>([]);
  const [editedProducts, setEditedProducts] = useState<{ [key: number]: Product }>({});
  const [debouncedSearch] = useDebouncedValue(query.search, 500);

  // Queries
  const { products, totalCount, isTableLoading, error } = useGetProductsQuery(
    {
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

  // Mutations
  const [bulkUpdateProducts, { isLoading: isUpdating }] = useBulkUpdateProductsMutation();

  // Handlers
  const handleBulkUpdate = async () => {
    try {
      await bulkUpdateProducts({
        products: Object.values(editedProducts),
      }).unwrap();

      setEditedRowIndexes([]);
      setEditedProducts({});

      showNotification({
        title: "Başarılı",
        message: "Ürünler başarıyla güncellendi",
        color: "green",
        icon: <IconCircleCheck />,
      });
    } catch {}
  };

  const handleEditRow = (row: Product, index: number) => {
    setEditedRowIndexes((prev) => prev.filter((i) => i !== index));
    setEditedProducts((prev) => {
      const { [index]: row, ...rest } = prev;
      return rest;
    });
  };

  const handleCancelEdit = () => {
    setEditedRowIndexes([]);
    setEditedProducts({});
  };

  const columns = useMemo<DataTableColumn<Product>[]>(
    () => [
      { accessor: "name", title: "Ürün", cellsStyle: { cursor: "default" }, sortable: true },
      {
        accessor: "stockCode",
        title: "Stok Kodu",
        render: (row) => row.stockCode || "-",
        cellsStyle: { cursor: "default" },
        sortable: true,
      },
      { accessor: "storageType", title: "Depo", cellsStyle: { cursor: "default" }, sortable: true },
      { accessor: "amountUnit", title: "Birim", cellsStyle: { cursor: "default" }, sortable: true },
      {
        accessor: "amount",
        title: "Miktar",
        width: 200,
        sortable: true,
        cellsStyle: (_, index) => ({
          cursor: editedRowIndexes.includes(index) ? "default" : "text",
        }),
        render: (row, index) => {
          if (editedRowIndexes.includes(index)) {
            return (
              <Group align="center" position="apart" spacing="xs">
                <NumberInput
                  value={editedProducts[index].amount}
                  size="xs"
                  precision={2}
                  onChange={(value) => {
                    setEditedProducts((prev) => ({
                      ...prev,
                      [index]: {
                        ...prev[index],
                        amount: value || 0,
                      },
                    }));
                  }}
                  style={{ width: 80 }}
                />
                <ActionIcon color="red" onClick={() => handleEditRow(row, index)}>
                  <IconX size={18} />
                </ActionIcon>
              </Group>
            );
          }

          return row.amount;
        },
      },
    ],
    [products, editedRowIndexes, editedProducts]
  );

  if (error) {
    return (
      <Alert icon={<IconInfoCircle />} color="red" title="Ürünlere ulaşılamadı" variant="filled">
        {(error as any)?.data?.message || "Beklenmedik bir hata oluştu"}
      </Alert>
    );
  }

  return (
    <>
      {Object.values(editedProducts).length > 0 && (
        <Affix position={{ bottom: 5, left: "50%" }} style={{ transform: "translate(-50%, -50%)" }}>
          <Paper withBorder p="md" radius="md" shadow="sm">
            <Group align="center" position="right">
              <Button size="sm" onClick={handleBulkUpdate}>
                Toplu Güncelle ({editedRowIndexes.length} ürün)
              </Button>
              <Button color="red" size="sm" onClick={handleCancelEdit}>
                Toplu Vazgeç
              </Button>
            </Group>
          </Paper>
        </Affix>
      )}
      <TextInput
        placeholder="Ürün adı veya stok kodu ile ara"
        my="md"
        value={query.search}
        onChange={(e) => setQuery({ ...query, search: e.currentTarget.value })}
      />
      <Paper radius="md" shadow="sm" p="md" mt="md" withBorder>
        <DataTable
          highlightOnHover
          records={products}
          columns={columns}
          fetching={isTableLoading || isUpdating}
          noRecordsText="Kayıt bulunamadı"
          loadingText="Yükleniyor"
          recordsPerPage={query.limit || 100}
          totalRecords={totalCount}
          page={query.page || 1}
          onPageChange={(page) => setQuery((prev) => ({ ...prev, page }))}
          onCellClick={(row) => {
            if (row.column.accessor === "amount" && !editedRowIndexes.includes(row.recordIndex)) {
              setEditedRowIndexes((prev) => [...prev, row.recordIndex]);
              setEditedProducts((prev) => ({ ...prev, [row.recordIndex]: row.record }));
            }
          }}
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
    </>
  );
};
