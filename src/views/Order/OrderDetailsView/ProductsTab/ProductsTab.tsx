// Components
import { BulkOrderProductsTab } from "./BulkOrderProductsTab";
import { ManualOrderProductsTab } from "./ManualOrderProductsTab";
import { ManualShopifyOrderProductsTab } from "./ManualShopifyOrderProductsTab";

// Interfaces
import { Order } from "@interfaces/order";

// Props
type ProductsTabProps = {
  order: Order;
};

export const ProductsTab = ({ order }: ProductsTabProps) => {
  if (order.type === "BULK") {
    <BulkOrderProductsTab order={order} />;
  } else if (order.type === "MANUAL" && order.source === "dashboard") {
    return <ManualOrderProductsTab order={order} />;
  } else if (order.type === "MANUAL" && order.source === "shopify") {
    return <ManualShopifyOrderProductsTab order={order} />;
  } else {
    return null;
  }

  return null;
};
