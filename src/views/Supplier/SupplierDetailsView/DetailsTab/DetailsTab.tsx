import React from "react";

// UI Components
import { Group, SimpleGrid, Text } from "@mantine/core";

// Icons
import {
  IconMapPin,
  IconReceiptTax,
  IconUserCircle,
  IconMail,
  IconPhone,
  IconUser,
} from "@tabler/icons";

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
      <DetailsCard
        title={
          <Group position="apart">
            <Text size="xl" weight={700}>
              Adres
            </Text>
            <IconMapPin />
          </Group>
        }
        value={supplier.address || "-"}
      />
      <DetailsCard
        title={
          <Group position="apart">
            <Text size="xl" weight={700}>
              Vergi
            </Text>
            <IconReceiptTax />
          </Group>
        }
        value={`${supplier.taxNo || "-"} / ${supplier.taxOffice || "-"}`}
      />
      <DetailsCard
        title={
          <Group position="apart">
            <Text size="xl" weight={700}>
              Yetkili
            </Text>
            <IconUser />
          </Group>
        }
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
