// Services
import { useGetProductsByStockCodesQuery } from "@services/productApi";

// Layouts
import { PageLayout } from "@layouts/PageLayout/PageLayout";
import { useMemo } from "react";
import { DataTable, DataTableColumn } from "mantine-datatable";
import { Product } from "@interfaces/product";
import { Paper } from "@mantine/core";

const STOCK_CODES = [
  "YM-10002",
  "YM-10003",
  "YM-10004",
  "YM-10005",
  "YM-10006",
  "YM-10007",
  "YM-10008",
  "YM-10009",
  "YM-10010",
  "YM-10011",
  "YM-10012",
  "HM-10005",
  "HM-10006",
  "HM-10007",
  "HM-10008",
  "HM-10010",
  "HM-10058",
];

export const CoffeeStock = () => {
  const {
    data: products,
    isLoading,
    isFetching,
  } = useGetProductsByStockCodesQuery(STOCK_CODES.join(","));

  // Columns
  const columns = useMemo<DataTableColumn<Product>[]>(
    () => [
      {
        accessor: "name",
        title: "Ürün",
      },
      {
        accessor: "amount",
        title: "Miktar",
        render: ({ amount }) => Intl.NumberFormat("tr").format(amount),
      },
    ],
    [products]
  );

  return (
    <PageLayout
      title="Kahve Stok"
      breadcrumbs={[
        {
          label: "Panel",
          href: "/dashboard",
        },
        {
          label: "Kahve Stok",
          href: "/dashboard/coffee-stock",
        },
      ]}
    >
      <Paper radius="md" shadow="sm" p="md" withBorder>
        <DataTable
          highlightOnHover
          records={products}
          columns={columns}
          fetching={isLoading || isFetching}
          noRecordsText="Kayıt bulunamadı"
          loadingText="Yükleniyor"
          page={1}
          onPageChange={() => {}}
          totalRecords={products?.length}
          recordsPerPage={products?.length || 0}
        />
      </Paper>
    </PageLayout>
  );
};
