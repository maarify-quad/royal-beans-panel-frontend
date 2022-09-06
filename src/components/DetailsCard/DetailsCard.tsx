import React, { ReactNode } from "react";

// UI Components
import { Button, Card, Group, Text } from "@mantine/core";

// Icons
import { Edit as EditIcon } from "tabler-icons-react";

// Props
type DetailsCardProps = {
  title: string | number | ReactNode;
  value: string | number | ReactNode;
  editAction?: () => void;
};

export const DetailsCard: React.FC<DetailsCardProps> = ({ title, value, editAction }) => {
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
      <Group position="apart">
        <Text size="lg" weight={700}>
          {title}
        </Text>
        {editAction && (
          <Button px={4} size="xs" variant="subtle" color="gray" onClick={editAction}>
            <EditIcon size={18} />
          </Button>
        )}
      </Group>
      <Text mt="md">{value}</Text>
    </Card>
  );
};
