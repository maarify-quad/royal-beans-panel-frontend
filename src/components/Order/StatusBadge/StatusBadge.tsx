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

  return <Badge color="green">GÖNDERİLDİ - {deliveryType}</Badge>;
};
