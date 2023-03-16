import { useMemo } from "react";

// UI Components
import { Card, Group, Text } from "@mantine/core";

// Mapping
import { ProductWeight, SHOPIFY_VARIANT_TO_PRODUCT_WEIGHT } from "@constants/mappings";

// Types
import { ManualOrderProduct } from "@interfaces/orderProduct";

// Props
type Props = {
  orderProduts: ManualOrderProduct[];
};

export const ShopifyTotalProductCount = ({ orderProduts }: Props) => {
  const productCounts = useMemo(() => {
    const counts: Record<ProductWeight, number> = {
      "taft.250gr": 0,
      "taft.500gr": 0,
      "taft.1kg": 0,
      "agirsaglam.250gr": 0,
      "agirsaglam.1kg": 0,
    };

    orderProduts.forEach((orderProduct) => {
      if (orderProduct.shopifyProduct) {
        const key = SHOPIFY_VARIANT_TO_PRODUCT_WEIGHT[orderProduct.shopifyProduct?.variantId];

        if (key) {
          if (counts[key]) {
            counts[key] += orderProduct.quantity;
          } else {
            counts[key] = orderProduct.quantity;
          }
        }
      }
    });

    return counts;
  }, [orderProduts]);

  return (
    <Group>
      <Card withBorder shadow="xs">
        {productCounts["taft.250gr"] > 0 && (
          <Group position="apart">
            <Text>TAFT 250 gr</Text>
            <Text size="lg" weight="bold">
              <Text>{productCounts["taft.250gr"]} adet</Text>
            </Text>
          </Group>
        )}
        {productCounts["taft.500gr"] > 0 && (
          <Group position="apart">
            <Text>TAFT 500 gr</Text>
            <Text size="lg" weight="bold">
              {productCounts["taft.500gr"] > 0 && <Text>{productCounts["taft.500gr"]} adet</Text>}
            </Text>
          </Group>
        )}
        {productCounts["taft.1kg"] > 0 && (
          <Group position="apart">
            <Text>TAFT 1 kg</Text>
            <Text size="lg" weight="bold">
              {productCounts["taft.1kg"]} adet
            </Text>
          </Group>
        )}
        {productCounts["agirsaglam.250gr"] > 0 && (
          <Group position="apart">
            <Text>Ağırsağlam 250 gr</Text>
            <Text size="lg" weight="bold">
              {productCounts["agirsaglam.250gr"]} adet
            </Text>
          </Group>
        )}
        {productCounts["agirsaglam.1kg"] > 0 && (
          <Group position="apart">
            <Text>Ağırsağlam 1 kg</Text>
            <Text size="lg" weight="bold">
              {productCounts["agirsaglam.1kg"]} adet
            </Text>
          </Group>
        )}
      </Card>
    </Group>
  );
};
