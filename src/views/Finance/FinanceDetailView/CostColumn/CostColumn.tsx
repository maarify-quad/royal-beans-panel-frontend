// UI Components
import { Flex, Paper, Text } from "@mantine/core";

// Constants
import { FINANCE_KEY_LABELS } from "src/constants";

const tryFormatter = Intl.NumberFormat("tr-TR", {
  style: "currency",
  currency: "TRY",
});

const usdFormatter = Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

// Props
type Props = {
  totalOrderProductsCost: number;
  totalManualOrderProductsCost: number;
  totalShopifyOrderProductsCost: number;
  totalBulkOrderProductsCost: number;
  totalConstantExpense: number;
  marketingExpense: number;
  generalCost: number;
  theoryTotalExpense: number;
  bulkOrderBoxCost: number;
  shopifyOrderBoxCost: number;
  manualOrderBoxCost: number;
  totalAdditionalExpense: number;
};

export const CostColumn = ({
  totalOrderProductsCost,
  totalManualOrderProductsCost,
  totalShopifyOrderProductsCost,
  totalBulkOrderProductsCost,
  totalConstantExpense,
  marketingExpense,
  generalCost,
  theoryTotalExpense,
  bulkOrderBoxCost,
  shopifyOrderBoxCost,
  manualOrderBoxCost,
  totalAdditionalExpense,
}: Props) => {
  return (
    <div>
      <Text size="lg" weight={600}>
        Maliyetler
      </Text>
      <Paper withBorder p="md">
        <Flex gap="md" direction="column">
          <Text>
            {FINANCE_KEY_LABELS.totalOrderProductsCost}:{" "}
            {tryFormatter.format(totalOrderProductsCost)}
          </Text>
          <Text>
            {FINANCE_KEY_LABELS.totalManualOrderProductsCost}:{" "}
            {tryFormatter.format(totalManualOrderProductsCost)}
          </Text>
          <Text>
            {FINANCE_KEY_LABELS.totalShopifyOrderProductsCost}:{" "}
            {tryFormatter.format(totalShopifyOrderProductsCost)}
          </Text>
          <Text>
            {FINANCE_KEY_LABELS.totalBulkOrderProductsCost}:{" "}
            {tryFormatter.format(totalBulkOrderProductsCost)}
          </Text>
          <Text>
            {FINANCE_KEY_LABELS.totalConstantExpense}: {tryFormatter.format(totalConstantExpense)}
          </Text>
          <Text>
            {FINANCE_KEY_LABELS.marketingExpense}: {tryFormatter.format(marketingExpense)}
          </Text>
          <Text>
            {FINANCE_KEY_LABELS.generalCost}: {tryFormatter.format(generalCost)}
          </Text>
          <Text>
            {FINANCE_KEY_LABELS.theoryTotalExpense}: {tryFormatter.format(theoryTotalExpense)}
          </Text>
          <Text>
            {FINANCE_KEY_LABELS.bulkOrderBoxCost}: {tryFormatter.format(bulkOrderBoxCost)}
          </Text>
          <Text>
            {FINANCE_KEY_LABELS.shopifyOrderBoxCost}: {usdFormatter.format(shopifyOrderBoxCost)}
          </Text>
          <Text>
            {FINANCE_KEY_LABELS.manualOrderBoxCost}: {tryFormatter.format(manualOrderBoxCost)}
          </Text>
          <Text>
            {FINANCE_KEY_LABELS.totalAdditionalExpense}:{" "}
            {tryFormatter.format(totalAdditionalExpense)}
          </Text>
        </Flex>
      </Paper>
    </div>
  );
};
