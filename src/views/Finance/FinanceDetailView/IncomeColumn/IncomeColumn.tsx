// UI Components
import { Flex, Paper, Text } from "@mantine/core";

// Constants
import { FINANCE_KEY_LABELS } from "src/constants";

const tryFormatter = Intl.NumberFormat("tr-TR", {
  style: "currency",
  currency: "TRY",
});

// Props
type Props = {
  totalRevenue: number;
  totalShopifyRevenue: number;
  totalBulkOrdersRevenue: number;
  totalManualOrdersRevenue: number;
  totalStoreSaleRevenue: number;
  totalTrendyolRevenue: number;
  totalHepsiBuradaRevenue: number;
  totalAdditionalRevenue: number;
};

export const IncomeColumn = ({
  totalRevenue,
  totalShopifyRevenue,
  totalBulkOrdersRevenue,
  totalManualOrdersRevenue,
  totalStoreSaleRevenue,
  totalTrendyolRevenue,
  totalHepsiBuradaRevenue,
  totalAdditionalRevenue,
}: Props) => {
  return (
    <div>
      <Text size="lg" weight={600}>
        Gelirler
      </Text>
      <Paper withBorder p="md">
        <Flex gap="md" direction="column">
          <Text>
            {FINANCE_KEY_LABELS.totalRevenue}: {tryFormatter.format(totalRevenue)}
          </Text>
          <Text>
            {FINANCE_KEY_LABELS.totalShopifyRevenue}: {tryFormatter.format(totalShopifyRevenue)}
          </Text>
          <Text>
            {FINANCE_KEY_LABELS.totalBulkOrdersRevenue}:{" "}
            {tryFormatter.format(totalBulkOrdersRevenue)}
          </Text>
          <Text>
            {FINANCE_KEY_LABELS.totalManualOrdersRevenue}:{" "}
            {tryFormatter.format(totalManualOrdersRevenue)}
          </Text>
          <Text>
            {FINANCE_KEY_LABELS.totalStoreSaleRevenue}: {tryFormatter.format(totalStoreSaleRevenue)}
          </Text>
          <Text>
            {FINANCE_KEY_LABELS.totalTrendyolRevenue}: {tryFormatter.format(totalTrendyolRevenue)}
          </Text>
          <Text>
            {FINANCE_KEY_LABELS.totalHepsiBuradaRevenue}:{" "}
            {tryFormatter.format(totalHepsiBuradaRevenue)}
          </Text>
          <Text>
            {FINANCE_KEY_LABELS.totalAdditionalRevenue}:{" "}
            {tryFormatter.format(totalAdditionalRevenue)}
          </Text>
        </Flex>
      </Paper>
    </div>
  );
};
