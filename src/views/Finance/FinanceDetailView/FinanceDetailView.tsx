import { useEffect } from "react";
import dayjs from "dayjs";

// Routing
import { useParams, useSearchParams } from "react-router-dom";

// Services
import { useCalculateFinanceMutation } from "@services/financeApi";

// UI Components
import { Alert, SimpleGrid } from "@mantine/core";

// Icons
import { IconAlertCircle } from "@tabler/icons";

// Layouts
import { PageLayout } from "@layouts/PageLayout/PageLayout";

// Components
import CostColumn from "./CostColumn";
import IncomeColumn from "./IncomeColumn";
import LossProfitColumn from "./LossProfitColumn";

export const FinanceView = () => {
  // Routing
  const [searchParams] = useSearchParams();
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");

  // Mutations
  const [calculateFinance, { data, isLoading }] = useCalculateFinanceMutation();

  useEffect(() => {
    if (startDate && endDate) {
      calculateFinance({ startDate, endDate });
    }
  }, [startDate, endDate]);

  if (!startDate || !endDate) {
    return (
      <Alert color="red" icon={<IconAlertCircle />}>
        Lütfen bir tarih aralığı seçin.
      </Alert>
    );
  }

  return (
    <PageLayout
      title={`Finans - ${dayjs(startDate).format("MMMM, YYYY")}`}
      breadcrumbs={[
        {
          label: "Panel",
          href: "/dashboard",
        },
        {
          label: "Finans",
          href: "/dashboard/finance",
        },
        {
          label: dayjs(startDate).format("MMMM YYYY"),
          href: `/dashboard/finance/detail?startDate=${startDate}&endDate=${endDate}`,
        },
      ]}
      isLoading={isLoading}
    >
      {data && (
        <SimpleGrid
          cols={3}
          breakpoints={[
            { maxWidth: "sm", cols: 1 },
            { maxWidth: "md", cols: 2 },
          ]}
          spacing="md"
        >
          <CostColumn {...data} />
          <IncomeColumn {...data} />
          <LossProfitColumn {...data} />
        </SimpleGrid>
      )}
    </PageLayout>
  );
};
