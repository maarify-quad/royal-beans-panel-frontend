import React, { ReactNode } from "react";

// UI Components
import { Card, Text } from "@mantine/core";

// Props
type DetailsCardProps = {
  title: string | number | ReactNode;
  value: string | number | ReactNode;
};

export const DetailsCard: React.FC<DetailsCardProps> = ({ title, value }) => {
  return (
    <Card
      withBorder
      p="xl"
      radius="md"
      shadow="xs"
      sx={(theme) => ({
        backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
      })}
    >
      <Text size="xl" weight={700}>
        {title}
      </Text>
      <Text mt="md">{value}</Text>
    </Card>
  );
};
