import { useMemo, useState } from "react";
import dayjs from "dayjs";

// Routing
import { Link } from "react-router-dom";

// Services
import { RequestQuery, useGetDeliveriesQuery } from "@services/deliveryApi";

// UI Components
import { Alert, Anchor, Paper, Group, Select, Text } from "@mantine/core";
import { DataTable, DataTableColumn } from "mantine-datatable";

// Icons
import { IconInfoCircle } from "@tabler/icons";

// Utils
import { formatCurrency } from "@utils/localization";

// Interfaces
import { Delivery } from "@interfaces/delivery";

export const Results = () => {
  // Internal state
  const [query, setQuery] = useState<RequestQuery>({
    page: 1,
    limit: 25,
    sortBy: "createdAt",
    sortOrder: "DESC",
  });

  // Queries
  const { data, isLoading, isFetching, error } = useGetDeliveriesQuery({ query });

  const columns: DataTableColumn<Delivery>[] = useMemo(
    () => [
      {
        accessor: "id",
        title: "Sevkiyat Kodu",
        render: (delivery) => (
          <Anchor component={Link} to={`/dashboard/deliveries/${delivery.id}`}>
            {delivery.id}
          </Anchor>
        ),
      },
      {
        accessor: "deliveryDate",
        title: "Sevkiyat Tarihi",
        render: (delivery) => dayjs(delivery.deliveryDate).format("DD MMMM YYYY"),
      },
      { accessor: "supplier.name", title: "Tedarikçi" },
      {
        accessor: "total",
        title: "Tutar",
        render: (delivery) => formatCurrency(delivery.total),
      },
    ],
    [data]
  );

  if (error) {
    return (
      <Alert
        icon={<IconInfoCircle />}
        color="red"
        title="Tedarikçilere ulaşılamadı"
        variant="filled"
        mt="md"
      >
        {(error as any)?.data?.message || "Beklenmedik bir hata oluştu"}
      </Alert>
    );
  }

  if (data?.deliveries.length === 0) {
    return (
      <Alert color="cyan" mt="md" icon={<IconInfoCircle />}>
        Sevkiyat bulunmamaktadır
      </Alert>
    );
  }

  return (
    <Paper radius="md" shadow="sm" p="md" mt="md" withBorder>
      <DataTable
        highlightOnHover
        records={data?.deliveries}
        columns={columns}
        fetching={isLoading || isFetching}
        noRecordsText="Kayıt bulunamadı"
        loadingText="Yükleniyor"
        recordsPerPage={query.limit || 25}
        totalRecords={data?.totalCount}
        page={query.page || 1}
        onPageChange={(page) => setQuery((prev) => ({ ...prev, page }))}
      />
      <Group>
        <Text size="sm">Sayfa başı satır</Text>
        <Select
          value={query.limit?.toString() || "25"}
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
