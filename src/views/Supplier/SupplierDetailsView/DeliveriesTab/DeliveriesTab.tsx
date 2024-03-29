import { useMemo, useState } from "react";
import dayjs from "dayjs";

// Routing
import { useNavigate } from "react-router-dom";

// Services
import { useGetSupplierDeliveriesQuery } from "@services/deliveryApi";
import { DataTable, DataTableColumn } from "mantine-datatable";

// UI Components
import { Text, Paper, Group, Select } from "@mantine/core";

// Utils
import { formatCurrency } from "@utils/localization";

// Interfaces
import { Delivery } from "@interfaces/delivery";

// Props
type DeliveriesTabProps = {
  supplierId: string;
};

export const DeliveriesTab = ({ supplierId }: DeliveriesTabProps) => {
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 25,
  });

  // Routing
  const navigate = useNavigate();

  // Queries
  const { deliveries, totalCount, isTableLoading } = useGetSupplierDeliveriesQuery(
    { id: supplierId, pagination, withDeleted: true },
    {
      selectFromResult: ({ data, isLoading, isFetching, ...rest }) => ({
        deliveries: data?.deliveries,
        totalCount: data?.totalCount,
        isTableLoading: isLoading || isFetching,
        ...rest,
      }),
    }
  );

  const columns = useMemo<DataTableColumn<Delivery>[]>(
    () => [
      {
        accessor: "deliveryDate",
        title: "Sevkiyat Tarihi",
        render: (delivery) => dayjs(delivery.deliveryDate).format("DD MMMM YYYY"),
      },
      {
        accessor: "id",
        title: "Sevkiyat Kodu",
      },
      {
        accessor: "totalPrice",
        title: "Tutar",
        render: (delivery) => formatCurrency(delivery.total),
      },
    ],
    [deliveries]
  );

  return (
    <Paper radius="md" shadow="sm" p="md" mt="md" withBorder>
      <DataTable
        highlightOnHover
        records={deliveries}
        columns={columns}
        fetching={isTableLoading}
        noRecordsText="Kayıt bulunamadı"
        loadingText="Yükleniyor"
        recordsPerPage={pagination.limit}
        totalRecords={totalCount}
        page={pagination.page}
        onPageChange={(page) => setPagination((prev) => ({ ...prev, page }))}
        onRowClick={({ id }) => navigate(`/dashboard/deliveries/${id}`)}
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
