import React from "react";

// UI Components
import { Card, Group, Text, ActionIcon, Stack, Button, Alert } from "@mantine/core";

// UI Utils
import { UseFormReturnType } from "@mantine/form";

// Icons
import { Trash as TrashIcon, InfoCircle as InfoCircleIcon } from "tabler-icons-react";

// Validation
import { Inputs } from "../Form/validation/Inputs";

// Props
type RoundsProps = {
  form: UseFormReturnType<Inputs>;
};

export const Rounds: React.FC<RoundsProps> = ({ form }) => {
  const handleRemoveProduct = (index: number) => () => {
    // Remove the product from the round
    form.removeListItem(`roastDetails`, index);
  };

  return (
    <div>
      {form.values.roastDetails.map((roastDetail, index) => (
        <div key={index}>
          <Text my="md" size="xl">
            {index + 1}. Posta
          </Text>
          <Stack>
            <Card withBorder shadow="xs">
              <Group position="apart">
                <div>
                  <Text weight={700}>{roastDetail.product.name}</Text>
                </div>
                <ActionIcon color="red" onClick={handleRemoveProduct(index)}>
                  <TrashIcon size={16} />
                </ActionIcon>
              </Group>
              <div>
                <Text>Atılan: {roastDetail.inputAmount} kg</Text>
                <Text>Alınan: {roastDetail.outputAmount} kg</Text>
              </div>
            </Card>
          </Stack>
        </div>
      ))}
      {form.values.roastDetails.length > 0 && (
        <Button mt="md" type="submit">
          Kavrum oluştur
        </Button>
      )}
    </div>
  );
};
