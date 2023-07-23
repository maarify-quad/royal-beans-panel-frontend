import { useMemo, useState } from "react";

// Services
import { Receiver, useGetReceiversQuery } from "@services/receiverApi";

// UI Components
import { Alert, Group, Paper, Select, Text } from "@mantine/core";
import { DataTable, DataTableColumn } from "mantine-datatable";

// Icons
import { IconInfoCircle } from "@tabler/icons";

export const ReceiversResult = () => {
  // Internal state
  const [query, setQuery] = useState({
    page: 1,
    limit: 25,
  });

  // Queries
  const { data, error, isLoading, isFetching } = useGetReceiversQuery({ query });

  const columns: DataTableColumn<Receiver>[] = useMemo(
    () => [
      {
        accessor: "name",
        title: "Alıcı",
      },
      {
        accessor: "address",
        title: "Adres",
      },
      {
        accessor: "neighborhood",
        title: "Mahalle",
      },
      {
        accessor: "province",
        title: "İlçe",
      },
      {
        accessor: "city",
        title: "İl",
      },
      {
        accessor: "phone",
        title: "Telefon",
      },
    ],
    [data?.receivers]
  );

  if (error) {
    return (
      <Alert
        icon={<IconInfoCircle />}
        color="red"
        title="Müşterilere ulaşılamadı"
        variant="filled"
        mt="md"
      >
        {(error as any)?.data?.message || "Beklenmedik bir hata oluştu"}
      </Alert>
    );
  }

  if (data?.receivers?.length === 0) {
    return (
      <Alert color="cyan" mt="md" icon={<IconInfoCircle />}>
        Alıcı bulunmamaktadır
      </Alert>
    );
  }

  return (
    <Paper radius="md" shadow="sm" p="md" mt="md" withBorder>
      <DataTable
        highlightOnHover
        records={data?.receivers || []}
        columns={columns}
        fetching={isLoading || isFetching}
        noRecordsText="Kayıt bulunamadı"
        loadingText="Yükleniyor"
        recordsPerPage={query.limit}
        totalRecords={data?.totalCount}
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
