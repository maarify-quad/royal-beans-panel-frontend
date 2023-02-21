// Components
import { BulkOrderDetailsTab } from "./BulkOrderDetailsTab";
import { ManualOrderDetailsTab } from "./ManualOrderDetailsTab";

// Interfaces
import { Order } from "@interfaces/order";

// Props
type DetailsTabProps = {
  order: Order;
};

export const DetailsTab = ({ order }: DetailsTabProps) => {
  return order.type === "BULK" ? (
    <BulkOrderDetailsTab order={order} />
  ) : (
    <ManualOrderDetailsTab order={order} />
  );
};
