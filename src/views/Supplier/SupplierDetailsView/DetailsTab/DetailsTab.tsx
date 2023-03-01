import React from "react";

// UI Components
import { Group, LoadingOverlay, SimpleGrid, Text } from "@mantine/core";

// UI Utils
import { openModal } from "@mantine/modals";

// Icons
import { IconMail, IconPhone } from "@tabler/icons";

// Components
import { DetailsCard } from "@components/DetailsCard";

// Interfaces
import { Supplier } from "@interfaces/supplier";

// Lazy Components
const EditSupplier = React.lazy(() => import("@components/Supplier/EditSupplier"));

// Props
type DetailsTabProps = {
  supplier: Omit<Supplier, "deliveries">;
};

export const DetailsTab: React.FC<DetailsTabProps> = ({ supplier }) => {
  const handleEditAction = () => {
    openModal({
      title: "Tedarikçi Düzenle",
      children: (
        <React.Suspense fallback={<LoadingOverlay visible />}>
          <EditSupplier supplier={supplier} />
        </React.Suspense>
      ),
    });
  };

  return (
    <SimpleGrid
      breakpoints={[
        { minWidth: "sm", cols: 2 },
        { minWidth: "md", cols: 3 },
      ]}
      style={{ alignItems: "stretch" }}
    >
      <DetailsCard title="Adres" value={supplier.address || "-"} editAction={handleEditAction} />
      <DetailsCard
        title="Vergi"
        value={`${supplier.taxNo || "-"} / ${supplier.taxOffice || "-"}`}
        editAction={handleEditAction}
      />
      <DetailsCard
        title="Yetkili"
        value={
          <>
            <Text mt="md">
              {supplier.contactName || "-"} / {supplier.contactPosition || "-"}
            </Text>
            <Group mt="sm">
              <IconPhone size={16} />
              <Text size="sm" color="dimmed">
                {supplier.contactPhone || "-"}
              </Text>
            </Group>
            <Group>
              <IconMail size={16} />
              <Text size="sm" color="dimmed">
                {supplier.contactEmail || "-"}
              </Text>
            </Group>
          </>
        }
        editAction={handleEditAction}
      />
    </SimpleGrid>
  );
};
