import React from "react";

// UI Components
import { LoadingOverlay } from "@mantine/core";
import { openModal } from "@mantine/modals";

// Lazy Imports
const CreateDeliveryAddress = React.lazy(
  () => import("@components/DeliveryAddress/CreateDeliveryAddress")
);

export const useCreateDeliveryAddress = () => {
  const openCreateDeliveryAddress = (customerId: string) => {
    openModal({
      key: "createDeliveryAddress",
      title: "Sevkiyat Adresi Oluştur",
      children: (
        <React.Suspense fallback={<LoadingOverlay visible />}>
          <CreateDeliveryAddress customerId={customerId} />
        </React.Suspense>
      ),
    });
  };

  return { openCreateDeliveryAddress };
};
