import React from "react";

// UI Components
import { Group, SimpleGrid, Text } from "@mantine/core";

// Icons
import { IconMail, IconPhone } from "@tabler/icons";

// Components
import { DetailsCard } from "@components/DetailsCard";

// Interfaces
import { Supplier } from "@interfaces/supplier";

// Props
type DetailsTabProps = {
  supplier: Omit<Supplier, "deliveries">;
};

export const DetailsTab: React.FC<DetailsTabProps> = ({ supplier }) => {
  return (
    <SimpleGrid
      breakpoints={[
        { minWidth: "sm", cols: 2 },
        { minWidth: "md", cols: 3 },
      ]}
      style={{ alignItems: "stretch" }}
    >
      <DetailsCard title="Adres" value={supplier.address || "-"} />
      <DetailsCard
        title="Vergi"
        value={`${supplier.taxNo || "-"} / ${supplier.taxOffice || "-"}`}
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
      />
    </SimpleGrid>
  );
};
