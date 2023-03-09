import { useMemo, useState } from "react";
import dayjs from "dayjs";

// Routing
import { Link } from "react-router-dom";

// Services
import { useGetProductExitsQuery, RequestQuery, Exit } from "@services/exitApi";

// UI Components
import { Anchor, Group, Paper, Select, Text } from "@mantine/core";
import { DataTable, DataTableColumn, DataTableSortStatus } from "mantine-datatable";

// Props
type Props = {
  productId: number;
};

export const ExitsTab = ({ productId }: Props) => {
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

  // Queries
  const { exits, totalCount, isTableLoading } = useGetProductExitsQuery(
    {
      productId,
      query,
    },
    {
      selectFromResult: ({ data, isLoading, isFetching, ...rest }) => ({
        exits: data?.exits,
        totalPages: data?.totalPages,
        totalCount: data?.totalCount,
        isTableLoading: isLoading || isFetching,
        ...rest,
      }),
    }
  );

  const columns = useMemo<DataTableColumn<Exit>[]>(
    () => [
      {
        title: "Tarih",
        accessor: "createdAt",
        sortable: true,
        render: ({ createdAt }) => dayjs(createdAt).format("DD MMM YYYY"),
      },
      {
        title: "İşlem",
        accessor: "action",
        sortable: true,
        render: ({ action, type }) =>
          type === "order" ? (
            <Anchor component={Link} to={`/dashboard/orders/${action}`}>
              {action}
            </Anchor>
          ) : (
            "-"
          ),
      },
      {
        title: "Miktar",
        accessor: "amount",
        sortable: true,
      },
      {
        title: "Çıkış Sonrası Miktar",
        accessor: "storageAmountAfterExit",
        sortable: true,
      },
    ],
    [exits]
  );

  return (
    <Paper radius="md" shadow="sm" p="md" withBorder>
      <DataTable
        highlightOnHover
        records={exits}
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
            sortBy: status.columnAccessor as keyof Exit,
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
