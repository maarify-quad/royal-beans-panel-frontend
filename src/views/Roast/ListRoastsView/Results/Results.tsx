import { useState, useMemo } from "react";
import dayjs from "dayjs";

// Routing
import { Link } from "react-router-dom";

// Services
import { useGetRoastsQuery } from "@services/roastApi";

// UI Components
import { Alert, Anchor, Paper, Group, Select, Text } from "@mantine/core";
import { DataTable, DataTableColumn } from "mantine-datatable";

// Icons
import { IconAlertCircle } from "@tabler/icons";

// Interfaces
import { Roast } from "@interfaces/roast";

export const Results = () => {
  // Internal state
  const [query, setQuery] = useState({
    page: 1,
    limit: 25,
  });

  // Queries
  const { roasts, totalCount, isTableLoading, error } = useGetRoastsQuery(query, {
    selectFromResult: ({ data, isLoading, isFetching, ...rest }) => ({
      ...rest,
      roasts: data?.roasts,
      totalPages: data?.totalPages,
      totalCount: data?.totalCount,
      isTableLoading: isLoading || isFetching,
    }),
  });

  const columns: DataTableColumn<Roast>[] = useMemo(
    () => [
      {
        accessor: "id",
        title: "Kavrum Kodu",
        render: (roast) => (
          <Anchor component={Link} to={`/dashboard/roasts/${roast.id}`}>
            {roast.id}
          </Anchor>
        ),
      },
      {
        accessor: "date",
        title: "Tarih",
        render: (roast) => dayjs(roast.date).format("DD MMM YYYY"),
      },
      {
        accessor: "totalInputAmount",
        title: "Toplam Miktar",
        render: (roast) => `${roast.totalInputAmount} kg`,
      },
    ],
    [roasts]
  );

  if (error) {
    return (
      <Alert
        icon={<IconAlertCircle />}
        color="red"
        title="Kavrumlara ulaşılamadı"
        variant="filled"
        mt="md"
      >
        {(error as any)?.data?.message || "Beklenmedik bir hata oluştu"}
      </Alert>
    );
  }

  return (
    <Paper radius="md" shadow="sm" p="md" mt="md" withBorder>
      <DataTable
        highlightOnHover
        records={roasts}
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
