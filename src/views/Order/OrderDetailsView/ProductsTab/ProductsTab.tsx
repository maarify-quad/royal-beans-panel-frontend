// Components
import { BulkOrderProductsTab } from "./BulkOrderProductsTab";
import { ManualOrderProductsTab } from "./ManualOrderProductsTab";
import { FasonOrderProductsTab } from "./FasonOrderProductsTab";

// Interfaces
import { Order } from "@interfaces/order";

// Props
type ProductsTabProps = {
  order: Order;
};

export const ProductsTab = ({ order }: ProductsTabProps) => {
  if (order.type === "BULK") {
    return <BulkOrderProductsTab order={order} />;
  }

  if (order.type === "MANUAL") {
    return <ManualOrderProductsTab order={order} />;
  }

  if (order.type === "FASON") {
    return <FasonOrderProductsTab order={order} />;
  }

  return null;
};
