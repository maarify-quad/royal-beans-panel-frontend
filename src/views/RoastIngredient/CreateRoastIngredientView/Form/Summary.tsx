// UI Components
import { ActionIcon, Button, Card, Group, List, Text } from "@mantine/core";

// UI Utils
import { UseFormReturnType } from "@mantine/form";
import { IconTrash } from "@tabler/icons";

// Validation
import { Inputs } from "./validation/Inputs";

type Props = {
  form: UseFormReturnType<Inputs>;
  isLoading: boolean;
};

export const Summary = ({ form, isLoading }: Props) => {
  return (
    <div>
      {form.values.roastIngredients.map((roastIngredient, index) => (
        <Card withBorder shadow="xs" key={index}>
          <Card.Section inheritPadding py="xs">
            <Group position="apart">
              <div>
                <Text weight={700}>{roastIngredient.product.name}</Text>
                <Text size="sm">
                  {roastIngredient.ingredient.name} - %{roastIngredient.rate}
                </Text>
              </div>
              <ActionIcon
                color="red"
                onClick={() => form.removeListItem("roastIngredients", index)}
              >
                <IconTrash size={16} />
              </ActionIcon>
            </Group>
          </Card.Section>
        </Card>
      ))}
      {form.values.product && form.values.roastIngredients.length > 0 ? (
        <Card withBorder shadow="xs" mt="md">
          <Text>100 kg {form.values.product.name} kavrulduğunda: </Text>
          <List my="sm" pl="md">
            {form.values.roastIngredients.map((roastIngredient, index) => (
              <List.Item key={index}>
                <Text weight="bold">
                  {roastIngredient.rate} kg {roastIngredient.ingredient.name}
                </Text>
              </List.Item>
            ))}
          </List>
          <Text>işlenecektir</Text>
        </Card>
      ) : null}
      <Button
        form="roastIngredientForm"
        mt="lg"
        type="submit"
        loading={isLoading}
        disabled={form.values.roastIngredients.length === 0}
      >
        Oluştur
      </Button>
    </div>
  );
};
