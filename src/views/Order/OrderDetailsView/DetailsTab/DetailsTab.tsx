import React from "react";

// UI Components
import { Card, SimpleGrid, Text, createStyles } from "@mantine/core";

// Interfaces
import { OrderWithAll } from "@interfaces/order";
import dayjs from "dayjs";

// Styles
const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },
}));

// Props
type DetailsTabProps = {
  order: OrderWithAll;
};

export const DetailsTab: React.FC<DetailsTabProps> = ({ order }) => {
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
          Müşteri
        </Text>
        <Text mt="md">{order.customer.name}</Text>
      </Card>
      <Card withBorder p="xl" radius="md" className={classes.card}>
        <Text size="xl" weight={700}>
          Müşteri Bakiye (Sipariş Sonrası)
        </Text>
        <Text mt="md">{order.customerBalanceAfterOrder} ₺</Text>
      </Card>
      <Card withBorder p="xl" radius="md" className={classes.card}>
        <Text size="xl" weight={700}>
          Tutar
        </Text>
        <Text mt="md">{order.total} ₺</Text>
      </Card>
      <Card withBorder p="xl" radius="md" className={classes.card}>
        <Text size="xl" weight={700}>
          Özel Not
        </Text>
        <Text mt="md">{order.specialNote || "-"}</Text>
      </Card>
      <Card withBorder p="xl" radius="md" className={classes.card}>
        <Text size="xl" weight={700}>
          Faturalandırma
        </Text>
        <Text mt="md" color={order.isParasutVerified ? "green" : "red"}>
          {order.isParasutVerified ? "RESMİLEŞTİ" : "RESMİLEŞMEDİ"}
        </Text>
      </Card>
      <Card withBorder p="xl" radius="md" className={classes.card}>
        <Text size="xl" weight={700}>
          Gönderi Tipi
        </Text>
        <Text mt="md">{order.deliveryType}</Text>
      </Card>
      <Card withBorder p="xl" radius="md" className={classes.card}>
        <Text size="xl" weight={700}>
          Gönderi Durumu
        </Text>
        <Text mt="md">{order.status}</Text>
      </Card>
      <Card withBorder p="xl" radius="md" className={classes.card}>
        <Text size="xl" weight={700}>
          Kargo Takip No
        </Text>
        <Text mt="md">{order.cargoTrackNo || "-"}</Text>
      </Card>
      <Card withBorder p="xl" radius="md" className={classes.card}>
        <Text size="xl" weight={700}>
          Gönderi Tarihi
        </Text>
        <Text mt="md">{dayjs(order.deliveryDate).format("DD MMM YYYY")}</Text>
      </Card>
      <Card withBorder p="xl" radius="md" className={classes.card}>
        <Text size="xl" weight={700}>
          Sipariş Tarihi
        </Text>
        <Text mt="md">{dayjs(order.createdAt).format("DD MMM YYYY")}</Text>
      </Card>
    </SimpleGrid>
  );
};
