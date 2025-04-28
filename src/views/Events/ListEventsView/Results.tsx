import { useMemo, useState } from "react";
import dayjs from "dayjs";

// Services
import { FilterEventsRequest, useFilterEventsQuery } from "@services/eventsApi";

// UI Components
import { Text, Alert, Group, Paper, Select, Badge } from "@mantine/core";
import { DataTable, DataTableColumn } from "mantine-datatable";

// Icons
import { IconInfoCircle } from "@tabler/icons";

type Event = {
  id: number;
  title?: string;
  description?: string;
  code: string;
  finisherCode: string;
  isFinished: boolean;
  createdAt: string;
};

export const Results = () => {
  // State
  const [query, setQuery] = useState<FilterEventsRequest>({
    page: 1,
    limit: 25,
  });

  // Queries
  const { data: events = [], isLoading, isFetching, error } = useFilterEventsQuery(query);

  const isTableLoading = isLoading || isFetching;

  const columns = useMemo<DataTableColumn<Event>[]>(
    () => [
      {
        accessor: "title",
        title: "Başlık",
        render: (event) => event.title || "-",
      },
      {
        accessor: "description",
        title: "Açıklama",
        render: (event) => event.description || "-",
      },
      {
        accessor: "code",
        title: "Kod",
      },
      {
        accessor: "finisherCode",
        title: "Bitiş Kodu",
      },
      {
        accessor: "isFinished",
        title: "Durum",
        render: (event) => (
          <Badge color={event.isFinished ? "green" : "yellow"}>
            {event.isFinished ? "Tamamlandı" : "Devam Ediyor"}
          </Badge>
        ),
      },
      {
        accessor: "createdAt",
        title: "Oluşturulma Tarihi",
        render: (event) => dayjs(event.createdAt).format("DD MMMM YYYY HH:mm"),
      },
    ],
    []
  );

  if (error) {
    return (
      <Alert
        icon={<IconInfoCircle />}
        color="red"
        title="Etkinliklere ulaşılamadı"
        variant="filled"
      >
        {(error as any)?.data?.message || "Beklenmedik bir hata oluştu"}
      </Alert>
    );
  }

  return (
    <>
      {events?.length ? (
        <Paper radius="md" shadow="sm" p="md" mt="md" withBorder>
          <DataTable
            highlightOnHover
            records={events}
            columns={columns}
            fetching={isTableLoading}
            noRecordsText="Kayıt bulunamadı"
            loadingText="Yükleniyor"
            recordsPerPage={query.limit}
            totalRecords={events.length}
            page={query.page}
            onPageChange={(page) => setQuery((prev) => ({ ...prev, page }))}
          />
          <Group mt="sm">
            <Text size="sm">Sayfa başı satır</Text>
            <Select
              value={query.limit?.toString()}
              onChange={(limit) => {
                if (limit) {
                  setQuery((query) => ({ ...query, page: 1, limit: +limit }));
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
      ) : (
        <Alert color="cyan" icon={<IconInfoCircle />}>
          Etkinlik bulunmamaktadır
        </Alert>
      )}
    </>
  );
};
