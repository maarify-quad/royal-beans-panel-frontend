import React, { useState } from "react";

// Services
import { useGetProductsQuery, useBulkUpdateProductsMutation } from "@services/productApi";

// UI Components
import { ActionIcon, Alert, Button, Group, NumberInput, Paper, Select } from "@mantine/core";

// UI Utils
import { showNotification } from "@mantine/notifications";

// Icons
import { IconInfoCircle, IconX } from "@tabler/icons";

// Components
import { DataTable, DataTableColumn } from "mantine-datatable";

// Interfaces
import { Product } from "@interfaces/product";

export const BulkUpdateStock = () => {
  // State
  const [query, setQuery] = useState({
    page: 1,
    limit: 25,
  });
  const [editedRowIndexes, setEditedRowIndexes] = useState<number[]>([]);
  const [editedProducts, setEditedProducts] = useState<{ [key: number]: Product }>({});

  // Queries
  const { data, isLoading, isFetching, error } = useGetProductsQuery(query);

  // Mutations
  const [bulkUpdateProducts, { isLoading: isUpdating }] = useBulkUpdateProductsMutation();

  // Handlers
  const handleBulkUpdate = async () => {
    try {
      await bulkUpdateProducts({
        products: Object.values(editedProducts),
      });
      setEditedRowIndexes([]);
      setEditedProducts({});
      showNotification({
        title: "Başarılı",
        message: "Ürünler başarıyla güncellendi",
        color: "green",
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

  const columns: DataTableColumn<Product>[] = React.useMemo(
    () => [
      { accessor: "name", title: "Ürün", cellsStyle: { cursor: "default" } },
      {
        accessor: "stockCode",
        title: "Stok Kodu",
        render: (row) => row.stockCode || "-",
        cellsStyle: { cursor: "default" },
      },
      { accessor: "storageType", title: "Depo", cellsStyle: { cursor: "default" } },
      { accessor: "amountUnit", title: "Birim", cellsStyle: { cursor: "default" } },
      {
        accessor: "amount",
        title: "Miktar",
        width: 200,
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
    [data, editedRowIndexes, editedProducts]
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
        <Group align="center" position="right">
          <Button size="sm" onClick={handleBulkUpdate}>
            Toplu Güncelle ({editedRowIndexes.length} ürün)
          </Button>
          <Button color="red" size="sm" onClick={handleCancelEdit}>
            Toplu Vazgeç
          </Button>
        </Group>
      )}
      <Paper radius="md" shadow="sm" p="md" mt="md" withBorder>
        <DataTable
          highlightOnHover
          records={data?.products}
          columns={columns}
          fetching={isLoading || isFetching || isUpdating}
          noRecordsText="Kayıt bulunamadı"
          loadingText="Yükleniyor"
          recordsPerPage={query.limit}
          totalRecords={data?.totalCount}
          page={query.page}
          onPageChange={(page) => setQuery((prev) => ({ ...prev, page }))}
          onCellClick={(row) => {
            if (row.column.accessor === "amount" && !editedRowIndexes.includes(row.recordIndex)) {
              setEditedRowIndexes((prev) => [...prev, row.recordIndex]);
              setEditedProducts((prev) => ({ ...prev, [row.recordIndex]: row.record }));
            }
          }}
        />
        <Group position="right">
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
            style={{ width: 100 }}
          />
        </Group>
      </Paper>
    </>
  );
};
