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
  setRoundId: React.Dispatch<React.SetStateAction<number>>;
};

export const Rounds: React.FC<RoundsProps> = ({ form, setRoundId }) => {
  const handleRemoveProduct = (roundId: number, index: number) => () => {
    // Remove the product from the round
    form.removeListItem(`roastDetails.${roundId}`, index);

    // Check if the removed product was the only item in that round
    if (form.values.roastDetails[roundId].length === 1) {
      // If it was the only product than remove that round too
      form.removeListItem("roastDetails", roundId);

      // If round id was bigger than 1 then set the latest round id to the previous one
      if (roundId > 1) {
        return setRoundId((prev) => prev - 1);
      }

      // If round id was 1 then set the latest round id to 1
      setRoundId(1);
    }
  };

  return (
    <div>
      {form.values.roastDetails.map((roastDetail, roundId) => (
        <div key={roundId}>
          <Text my="md" size="xl">
            {roundId + 1}. Posta
          </Text>
          {roastDetail.length === 0 && (
            <Alert color="cyan" icon={<InfoCircleIcon />}>
              Bu posta için ürün eklenmemiş.
            </Alert>
          )}
          <Stack>
            {roastDetail.map((detail, i) => (
              <Card withBorder shadow="xs" key={i}>
                <Group position="apart">
                  <div>
                    <Text weight={700}>{detail.product.name}</Text>
                  </div>
                  <ActionIcon color="red" onClick={handleRemoveProduct(roundId, i)}>
                    <TrashIcon size={16} />
                  </ActionIcon>
                </Group>
                <div>
                  <Text>Atılan: {detail.inputAmount} kg</Text>
                  <Text>Alınan: {detail.outputAmount} kg</Text>
                </div>
              </Card>
            ))}
          </Stack>
        </div>
      ))}
      {form.values.roastDetails[0]?.length > 0 && (
        <Button mt="md" type="submit">
          Kavrum oluştur
        </Button>
      )}
    </div>
  );
};
