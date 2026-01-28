// Components
import { BulkOrderDetailsTab } from "./BulkOrderDetailsTab";
import { ManualOrderDetailsTab } from "./ManualOrderDetailsTab";
import { FasonOrderDetailsTab } from "./FasonOrderDetailsTab";

// Interfaces
import { Order } from "@interfaces/order";

// Props
type DetailsTabProps = {
  order: Order;
};

export const DetailsTab = ({ order }: DetailsTabProps) => {
  if (order.type === "BULK") {
    return <BulkOrderDetailsTab order={order} />;
  }

  if (order.type === "MANUAL") {
    return <ManualOrderDetailsTab order={order} />;
  }

  if (order.type === "FASON") {
    return <FasonOrderDetailsTab order={order} />;
  }

  return null;
};
