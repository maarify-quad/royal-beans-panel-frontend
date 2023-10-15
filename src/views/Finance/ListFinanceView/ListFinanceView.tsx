import { Suspense, lazy } from "react";
import dayjs from "dayjs";

// Routing
import { Link } from "react-router-dom";

// Services
import { useGetAllFinancesQuery } from "@services/financeApi";

// UI Components
import { Alert, Button, LoadingOverlay, Paper, Table } from "@mantine/core";
import { openModal } from "@mantine/modals";

// Icons
import { IconInfoCircle, IconPlus } from "@tabler/icons";

// Layouts
import { PageLayout } from "@layouts/PageLayout/PageLayout";

// Lazy
const CreateFinance = lazy(() => import("@components/Finance/CreateFinance"));

const formatter = Intl.NumberFormat("tr-TR", {
  style: "currency",
  currency: "TRY",
});

export const ListFinanceView = () => {
  const { data, isLoading, isFetching } = useGetAllFinancesQuery();

  const handleCreateFinance = () => {
    openModal({
      title: "Yeni Dönem Ekle",
      children: (
        <Suspense fallback={<LoadingOverlay visible />}>
          <CreateFinance />
        </Suspense>
      ),
    });
  };

  return (
    <PageLayout
      title="Finans"
      breadcrumbs={[
        {
          label: "Panel",
          href: "/dashboard",
        },
        {
          label: "Finans",
          href: "/dashboard/finance",
        },
      ]}
      actions={
        <Button onClick={handleCreateFinance} leftIcon={<IconPlus />}>
          Yeni Dönem Ekle
        </Button>
      }
      isLoading={isLoading || isFetching}
    >
      {data?.length ? (
        <Paper mt="md" p="md" withBorder>
          <Table>
            <thead>
              <tr>
                <th>Dönem</th>
                <th>Toplam Ciro</th>
                <th>Toplam Maliyet</th>
                <th>Sent Cost</th>
                <th>Mali Durum</th>
                <th>Kar/Zarar</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((finance) => (
                <tr>
                  <td>
                    <Link
                      to={`/dashboard/finance/detail?startDate=${finance.startDate}&endDate=${finance.endDate}`}
                    >
                      {dayjs(finance.startDate).format("MMMM, YYYY")}
                    </Link>
                  </td>
                  <td>{formatter.format(finance.totalRevenue)}</td>
                  <td>{formatter.format(finance.totalCost)}</td>
                  <td>{formatter.format(finance.sentCost)}</td>
                  <td>{formatter.format(finance.financialStatus)}</td>
                  <td>{formatter.format(finance.profitLossRatio)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Paper>
      ) : (
        <Alert mt="md" icon={<IconInfoCircle />}>
          Herhangi bir dönem için finans verisi bulunmamaktadır
        </Alert>
      )}
    </PageLayout>
  );
};
