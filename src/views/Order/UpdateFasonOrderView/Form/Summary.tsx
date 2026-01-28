import React from "react";

// UI Components
import { ActionIcon, Alert, Button, Card, Group, Stack, Text } from "@mantine/core";

// UI Utils
import { UseFormReturnType } from "@mantine/form";

// Icons
import { IconTrash, IconInfoCircle } from "@tabler/icons";

// Validation
import { Inputs } from "./validation/Inputs";

// Props
type SummaryProps = {
  form: UseFormReturnType<Inputs>;
  submitProps?: {
    text: string;
    loading: boolean;
  };
};

export const Summary: React.FC<SummaryProps> = ({ form, submitProps }) => {
  const handleRemoveProduct = (index: number) => () => {
    form.removeListItem("orderProducts", index);
  };

  return (
    <>
      <Stack mt="md">
        {form.values.orderProducts.map((orderProduct, index) => (
          <Card withBorder shadow="xs" key={index}>
            <Card.Section inheritPadding py="xs">
              <Group position="apart">
                <div>
                  <Text weight={700}>{orderProduct.product?.name}</Text>
                  <Text color="dimmed" size="sm">
                    {orderProduct.grindType} / {orderProduct.weight}
                  </Text>
                  <Text size="sm">Miktar: {orderProduct.quantity} adet</Text>
                  <Text size="sm" color="dimmed">
                    Fiyat: 0,00 ₺
                  </Text>
                </div>
                <ActionIcon color="red" onClick={handleRemoveProduct(index)}>
                  <IconTrash size={16} />
                </ActionIcon>
              </Group>
            </Card.Section>
          </Card>
        ))}
      </Stack>
      {form.values.orderProducts.length > 0 ? (
        <Button
          mt="md"
          type="submit"
          loading={submitProps?.loading}
          disabled={submitProps?.loading}
        >
          {submitProps?.text || "Kaydet"}
        </Button>
      ) : (
        <Alert icon={<IconInfoCircle />} color="cyan">
          Sepette ürün bulunmamaktadır
        </Alert>
      )}
    </>
  );
};
