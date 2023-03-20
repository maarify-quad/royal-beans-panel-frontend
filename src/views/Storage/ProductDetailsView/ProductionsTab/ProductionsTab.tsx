import { useMemo, useState } from "react";
import dayjs from "dayjs";

// Routing
import { Link } from "react-router-dom";

// Services
import { Production, RequestQuery, useGetProductionsQuery } from "@services/productionApi";

// UI Components
import { Anchor, Group, Paper, Select, Text } from "@mantine/core";
import { DataTable, DataTableColumn, DataTableSortStatus } from "mantine-datatable";

// Props
type Props = {
  productId: number;
};

export const ProductionsTab = ({ productId }: Props) => {
  const [query, setQuery] = useState<RequestQuery>({
    page: 1,
    limit: 100,
    sortBy: "createdAt",
    sortOrder: "DESC",
  });
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
    columnAccessor: "createdAt",
    direction: "desc",
  });

  const { productions, totalCount, isTableLoading } = useGetProductionsQuery(
    {
      productId,
      query,
    },
    {
      selectFromResult: ({ data, isLoading, isFetching, ...rest }) => ({
        productions: data?.productions,
        totalPages: data?.totalPages,
        totalCount: data?.totalCount,
        isTableLoading: isLoading || isFetching,
        ...rest,
      }),
    }
  );

  const columns = useMemo<DataTableColumn<Production>[]>(
    () => [
      {
        title: "Tarih",
        accessor: "createdAt",
        sortable: true,
        render: ({ createdAt }) => dayjs(createdAt).format("DD MMMM YYYY"),
      },
      {
        title: "İşlem",
        accessor: "order",
        sortable: true,
        render: ({ order }) => (
          <Anchor component={Link} to={`/dashboard/orders/${order.orderId}`}>
            {order.orderId}
          </Anchor>
        ),
      },
      {
        title: "Müşteri",
        accessor: "order.customer.name",
        render: ({ order }) => order.customer?.name || order.receiver,
      },
      {
        title: "Kullanım Miktarı",
        accessor: "usageAmount",
        sortable: true,
        render: ({ usageAmount, producedProduct }) =>
          `${usageAmount} ${producedProduct.amountUnit}`,
      },
      {
        title: "Üretilen",
        accessor: "producedProduct.name",
      },
    ],
    [productions]
  );

  return (
    <Paper radius="md" shadow="sm" p="md" withBorder>
      <DataTable
        highlightOnHover
        records={productions}
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
            sortBy: status.columnAccessor as keyof Production,
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
  );
};
