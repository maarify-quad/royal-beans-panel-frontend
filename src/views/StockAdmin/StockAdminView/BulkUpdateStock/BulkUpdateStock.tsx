import React, { useState } from "react";

// Services
import { useGetProductsQuery } from "@services/productApi";

// UI Components
import { ActionIcon, Alert, Button, Group, NumberInput, Paper } from "@mantine/core";

// Icons
import { IconInfoCircle, IconX } from "@tabler/icons";

// Components
import { DataTable, DataTableColumn } from "mantine-datatable";

// Interfaces
import { Product } from "@interfaces/product";

export const BulkUpdateStock = () => {
  // State
  const [editedRowIndexes, setEditedRowIndexes] = useState<number[]>([]);
  const [editedProducts, setEditedProducts] = useState<{ [key: number]: Product }>({});

  // Queries
  const { data: products, isLoading, isFetching, error } = useGetProductsQuery();

  // Handlers
  const handleBulkUpdate = () => {
    // TODO: Bulk update
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
          records={products}
          columns={columns}
          fetching={isLoading || isFetching}
          noRecordsText="Kayıt bulunamadı"
          loadingText="Yükleniyor"
          recordsPerPage={25}
          totalRecords={products?.length}
          page={1}
          onPageChange={() => {}}
          onCellClick={(row) => {
            if (row.column.accessor === "amount" && !editedRowIndexes.includes(row.recordIndex)) {
              setEditedRowIndexes((prev) => [...prev, row.recordIndex]);
              setEditedProducts((prev) => ({ ...prev, [row.recordIndex]: row.record }));
            }
          }}
        />
      </Paper>
    </>
  );
};
