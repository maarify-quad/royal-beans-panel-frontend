import React from "react";

// UI Components
import { Group, SimpleGrid, Text } from "@mantine/core";

// Icons
import {
  MapPin as MapPinIcon,
  ReceiptTax as ReceiptTaxIcon,
  UserCircle as UserIcon,
  Mail as MailIcon,
  Phone as PhoneIcon,
} from "tabler-icons-react";

// Interfaces
import { Supplier } from "@interfaces/supplier";
import { DetailsCard } from "@components/DetailsCard";

// Props
type DetailsTabProps = {
  supplier?: Supplier;
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
            <MapPinIcon />
          </Group>
        }
        value={supplier?.address || "-"}
      />
      <DetailsCard
        title={
          <Group position="apart">
            <Text size="xl" weight={700}>
              Vergi
            </Text>
            <ReceiptTaxIcon />
          </Group>
        }
        value={`${supplier?.taxNo || "-"} / ${supplier?.taxOffice || "-"}`}
      />
      <DetailsCard
        title={
          <Group position="apart">
            <Text size="xl" weight={700}>
              Yetkili
            </Text>
            <UserIcon />
          </Group>
        }
        value={
          <>
            <Text mt="md">
              {supplier?.contactName || "-"} / {supplier?.contactPosition || "-"}
            </Text>
            <Group mt="sm">
              <PhoneIcon size={16} />
              <Text size="sm" color="dimmed">
                {supplier?.contactPhone || "-"}
              </Text>
            </Group>
            <Group>
              <MailIcon size={16} />
              <Text size="sm" color="dimmed">
                {supplier?.contactEmail || "-"}
              </Text>
            </Group>
          </>
        }
      />
    </SimpleGrid>
  );
};
