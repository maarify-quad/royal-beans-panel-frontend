import React from "react";
import dayjs from "dayjs";

// Services
import { useGetOrdersByCustomerQuery } from "@services/orderApi";

// UI Components
import { Alert, Loader } from "@mantine/core";

// Icons
import { IconInfoCircle } from "@tabler/icons";

// Components
import { ResultsTable } from "@components/ResultsTable";

// Utils
import { formatCurrency } from "@utils/localization";

// Props
type LastOrdersTabProps = {
  customer: string;
};

export const LastOrdersTab: React.FC<LastOrdersTabProps> = ({ customer }) => {
  // Internal state
  const [page, setPage] = React.useState(1);

  // Queries
  const { data, isLoading, error } = useGetOrdersByCustomerQuery({ customer, page });

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <Alert
        icon={<IconInfoCircle />}
        color="red"
        title="Siparişlere ulaşılamadı"
        variant="filled"
        mt="md"
      >
        {(error as any)?.data?.message || "Beklenmedik bir hata oluştu"}
      </Alert>
    );
  }

  if (data?.orders.length === 0) {
    return (
      <Alert color="cyan" mt="md" icon={<IconInfoCircle />}>
        Sipariş bulunmamaktadır
      </Alert>
    );
  }

  return (
    <div>
      <ResultsTable
        headers={[{ value: "Sipariş No" }, { value: "Tarih" }, { value: "Tutar" }]}
        rows={
          data?.orders.map((order) => [
            { value: `#${order.orderId}`, link: `/dashboard/orders/${order.orderId}` },
            { value: `${dayjs(order.createdAt).format("DD MMM YYYY")}` },
            { value: formatCurrency(order.total) },
          ]) || []
        }
        pagination={{
          totalPage: data?.totalPage || 0,
          currentPage: page,
          onPageChange: (page) => setPage(page),
        }}
      />
    </div>
  );
};
