import React, { useMemo } from "react";

// Services
import { useGetPriceListsQuery } from "@services/priceListApi";

// UI Components
import { Text, Alert, Paper, Group, Select, Anchor } from "@mantine/core";
import { DataTable, DataTableColumn } from "mantine-datatable";

// Icons
import { IconInfoCircle } from "@tabler/icons";

// Interfaces
import { PriceList } from "@interfaces/priceList";
import { Link } from "react-router-dom";

export const Results = () => {
  // Internal state
  const [query, setQuery] = React.useState({
    page: 1,
    limit: 25,
  });

  // Queries
  const { priceLists, error, totalCount, isTableLoading } = useGetPriceListsQuery(query, {
    selectFromResult: ({ data, isLoading, isFetching, ...rest }) => ({
      ...rest,
      priceLists: data?.priceLists || [],
      totalPages: data?.totalPages,
      totalCount: data?.totalCount,
      isTableLoading: isLoading || isFetching,
    }),
  });

  const columns = useMemo<DataTableColumn<PriceList>[]>(
    () => [
      {
        accessor: "name",
        title: "Fiyat Listesi",
        render: ({ id, name }) => (
          <Anchor component={Link} to={`/dashboard/price-lists/${id}`}>
            {name}
          </Anchor>
        ),
      },
      {
        accessor: "description",
        title: "Açıklama",
      },
      {
        accessor: "customers.length",
        title: "Müşteri Sayısı",
      },
    ],
    [priceLists]
  );

  if (error) {
    return (
      <Alert
        icon={<IconInfoCircle />}
        color="red"
        title="Fiyat listelerine ulaşılamadı"
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
        records={priceLists}
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
