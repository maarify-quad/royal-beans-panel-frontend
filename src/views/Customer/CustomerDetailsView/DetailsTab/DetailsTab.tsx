import React from "react";

// UI Components
import { Card, createStyles, SimpleGrid, Text } from "@mantine/core";

// Interfaces
import { Customer } from "@interfaces/customer";

// Props
type DetailsTabProps = {
  customer?: Customer;
};

// Styles
const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },
}));

export const DetailsTab: React.FC<DetailsTabProps> = ({ customer }) => {
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
        <Text size="xl" weight={700}>
          Bakiye
        </Text>
        <Text mt="md">{customer?.currentBalance} ₺</Text>
      </Card>
      <Card withBorder p="xl" radius="md" className={classes.card}>
        <Text size="xl" weight={700}>
          Fiyat Listesi
        </Text>
        <Text mt="md">{customer?.priceList?.name || "-"}</Text>
      </Card>
      <Card withBorder p="xl" radius="md" className={classes.card}>
        <Text size="xl" weight={700}>
          Çalışma Prensibi
        </Text>
        <Text mt="md">{customer?.commercialPrinciple || "-"}</Text>
      </Card>
      <Card withBorder p="xl" radius="md" className={classes.card}>
        <Text size="xl" weight={700}>
          Performans
        </Text>
        <Text mt="md">TODO</Text>
      </Card>
      <Card withBorder p="xl" radius="md" className={classes.card}>
        <Text size="xl" weight={700}>
          Ekstra
        </Text>
        <Text mt="md">
          Özel Not: {customer?.specialNote || "-"}
          <br />
          Yorum: {customer?.comment || "-"}
        </Text>
      </Card>
      <Card withBorder p="xl" radius="md" className={classes.card}>
        <Text size="xl" weight={700}>
          Vergi
        </Text>
        <Text mt="md">
          Vergi Dairesi: {customer?.taxOffice || "-"}
          <br />
          Vergi No: {customer?.taxNo || "-"}
        </Text>
      </Card>
      <Card withBorder p="xl" radius="md" className={classes.card}>
        <Text size="xl" weight={700}>
          İletişim
        </Text>
        <Text mt="md">
          {customer?.companyTitle || "-"}
          <br />
          {customer?.contactName || "-"} / {customer?.contactTitle || "-"}
          <br />
          {customer?.secondContactName || "-"} / {customer?.secondContactTitle || "-"}
          <br />
          {customer?.address || "-"}
          <br />
          {customer?.province || "-"} / {customer?.city || "-"}
          <br />
          {customer?.phone || "-"} / {customer?.email || "-"}
          <br />
        </Text>
      </Card>
      <Card withBorder p="xl" radius="md" className={classes.card}>
        <Text size="xl" weight={700}>
          Kargo
        </Text>
        <Text mt="md">
          {customer?.cargoAddress || "-"}
          <br />
          {customer?.cargoCity || "-"} / {customer?.cargoProvince || "-"}
        </Text>
      </Card>
    </SimpleGrid>
  );
};
