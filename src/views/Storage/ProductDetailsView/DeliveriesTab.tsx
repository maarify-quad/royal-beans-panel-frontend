import { useMemo, useState } from "react";
import dayjs from "dayjs";

// Services
import { useGetProductDeliveriesQuery } from "@services/deliveryApi";

// UI Components
import { Anchor, Group, Paper, Select, Text } from "@mantine/core";
import { DataTable, DataTableColumn } from "mantine-datatable";

// Utils
import { formatCurrency } from "@utils/localization";

// Interfaces
import { DeliveryDetail } from "@interfaces/delivery";
import { Link } from "react-router-dom";

// Props
type DeliveriesTabProps = {
  stockCode: string;
};

export const DeliveriesTab = ({ stockCode }: DeliveriesTabProps) => {
  const [query, setQuery] = useState({
    page: 1,
    limit: 25,
  });

  // Queries
  const { deliveryDetails, totalCount, isTableLoading } = useGetProductDeliveriesQuery(
    {
      stockCode,
      ...query,
    },
    {
      selectFromResult: ({ data, isLoading, isFetching, ...rest }) => ({
        ...rest,
        deliveryDetails: data?.deliveryDetails,
        totalCount: data?.totalCount,
        isTableLoading: isLoading || isFetching,
      }),
    }
  );

  const columns = useMemo<DataTableColumn<DeliveryDetail>[]>(
    () => [
      {
        accessor: "delivery.deliveryDate",
        title: "Tarih",
        render: (detail) => dayjs(detail.delivery.deliveryDate).format("DD MMM YYYY"),
      },
      {
        accessor: "delivery.supplier.name",
        title: "Tedarikçi",
        render: (detail) => (
          <Anchor component={Link} to={`/dashboard/suppliers/${detail.delivery.supplierId}`}>
            {detail.delivery.supplier.name}
          </Anchor>
        ),
      },
      {
        accessor: "unit",
        title: "Birim",
      },
      {
        accessor: "quantity",
        title: "Miktar",
      },
      {
        accessor: "unitPriceTRY",
        title: "Birim Fiyat",
        render: (detail) => formatCurrency(detail.unitPriceTRY),
      },
    ],
    [deliveryDetails]
  );

  return (
    <Paper radius="md" shadow="sm" p="md" mt="md" withBorder>
      <DataTable
        highlightOnHover
        records={deliveryDetails}
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
