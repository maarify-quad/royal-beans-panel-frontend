import React, { useMemo } from "react";

// Routing
import { Link } from "react-router-dom";

// Services
import { useGetCustomersQuery } from "@services/customerApi";

// UI Components
import { Alert, Anchor, Flex, Group, Paper, Select, Text, ThemeIcon } from "@mantine/core";
import { DataTable, DataTableColumn } from "mantine-datatable";

// Icons
import { IconInfoCircle, IconUserOff } from "@tabler/icons";

// Utils
import { formatCurrency } from "@utils/localization";

// Interfaces
import { Customer } from "@interfaces/customer";

export const Results = () => {
  // Internal state
  const [pagination, setPagination] = React.useState({
    page: 1,
    limit: 25,
  });

  // Queries
  const { customers, totalCount, isTableLoading, error } = useGetCustomersQuery(
    {
      withDeleted: true,
    },
    {
      selectFromResult: ({ data, isLoading, isFetching, ...rest }) => ({
        ...rest,
        customers: data?.customers,
        totalPages: data?.totalPages,
        totalCount: data?.totalCount,
        isTableLoading: isLoading || isFetching,
      }),
    }
  );

  const columns: DataTableColumn<Customer>[] = useMemo(
    () => [
      {
        accessor: "name",
        title: "Müşteri",
        render: (customer) => (
          <Flex gap="xs">
            <Anchor component={Link} to={`/dashboard/customers/${customer.id}`}>
              {customer.name}
            </Anchor>
            {customer.deletedAt && (
              <ThemeIcon variant="outline" size="sm" color="red">
                <IconUserOff />
              </ThemeIcon>
            )}
          </Flex>
        ),
      },
      {
        accessor: "currentBalance",
        title: "Bakiye",
        render: (customer) => formatCurrency(customer.currentBalance),
      },
    ],
    [customers]
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

  if (customers?.length === 0) {
    return (
      <Alert color="cyan" mt="md" icon={<IconInfoCircle />}>
        Müşteri bulunmamaktadır
      </Alert>
    );
  }

  return (
    <Paper radius="md" shadow="sm" p="md" mt="md" withBorder>
      <DataTable
        highlightOnHover
        records={customers}
        columns={columns}
        fetching={isTableLoading}
        noRecordsText="Kayıt bulunamadı"
        loadingText="Yükleniyor"
        recordsPerPage={pagination.limit}
        totalRecords={totalCount}
        page={pagination.page}
        onPageChange={(page) => setPagination((prev) => ({ ...prev, page }))}
      />
      <Group>
        <Text size="sm">Sayfa başı satır</Text>
        <Select
          value={pagination.limit.toString()}
          onChange={(limit) => {
            if (limit) {
              setPagination({ page: 1, limit: +limit });
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
