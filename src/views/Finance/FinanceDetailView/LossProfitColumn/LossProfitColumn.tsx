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
  realProfit: number;
  theoryProfit: number;
  bulkOrdersProfit: number;
  shopifyProfit: number;
};

export const LossProfitColumn = ({
  realProfit,
  theoryProfit,
  bulkOrdersProfit,
  shopifyProfit,
}: Props) => {
  return (
    <div>
      <Text size="lg" weight={600}>
        Kar/Zarar
      </Text>
      <Paper withBorder p="md">
        <Flex gap="md" direction="column">
          <Text>
            {FINANCE_KEY_LABELS.realProfit}: {tryFormatter.format(realProfit)}
          </Text>
          <Text>
            {FINANCE_KEY_LABELS.theoryProfit}: {tryFormatter.format(theoryProfit)}
          </Text>
          <Text>
            {FINANCE_KEY_LABELS.bulkOrdersProfit}: {tryFormatter.format(bulkOrdersProfit)}
          </Text>
          <Text>
            {FINANCE_KEY_LABELS.shopifyProfit}: {tryFormatter.format(shopifyProfit)}
          </Text>
        </Flex>
      </Paper>
    </div>
  );
};
