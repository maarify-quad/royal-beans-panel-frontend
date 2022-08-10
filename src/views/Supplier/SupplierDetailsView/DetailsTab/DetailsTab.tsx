import React from "react";

// UI Components
import { Card, createStyles, Group, SimpleGrid, Text } from "@mantine/core";

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

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },
}));

// Props
type DetailsTabProps = {
  supplier?: Supplier;
};

export const DetailsTab: React.FC<DetailsTabProps> = ({ supplier }) => {
  const { classes } = useStyles();
  return (
    <SimpleGrid
      breakpoints={[
        { minWidth: "sm", cols: 2 },
        { minWidth: "md", cols: 3 },
      ]}
      style={{ alignItems: "stretch" }}
    >
      <Card withBorder p="xl" radius="md" className={classes.card}>
        <Group position="apart">
          <Text size="xl" weight={700}>
            Adres
          </Text>
          <MapPinIcon />
        </Group>
        <Text mt="md">{supplier?.address || "-"}</Text>
      </Card>
      <Card withBorder p="xl" radius="md" className={classes.card}>
        <Group position="apart">
          <Text size="xl" weight={700}>
            Vergi
          </Text>
          <ReceiptTaxIcon />
        </Group>
        <Text mt="md">
          {supplier?.taxNo || "-"} / {supplier?.taxOffice || "-"}
        </Text>
      </Card>
      <Card withBorder p="xl" radius="md" className={classes.card}>
        <Group position="apart">
          <Text size="xl" weight={700}>
            Yetkili
          </Text>
          <UserIcon />
        </Group>
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
      </Card>
    </SimpleGrid>
  );
};
