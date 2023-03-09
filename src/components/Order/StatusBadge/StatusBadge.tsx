import React from "react";

// UI Components
import { Badge } from "@mantine/core";

// Props
type StatusBadgeProps = {
  status: string;
  deliveryType?: string;
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, deliveryType }) => {
  if (status === "GÖNDERİLMEDİ") {
    return <Badge color="orange">GÖNDERİLMEDİ</Badge>;
  }

  if (status === "İPTAL") {
    return <Badge color="red">İPTAL</Badge>;
  }

  return <Badge color="green">{deliveryType}</Badge>;
};
