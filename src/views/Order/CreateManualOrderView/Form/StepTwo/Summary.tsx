import React from "react";

// UI Components
import { ActionIcon, Alert, Button, Card, Group, Stack, Text } from "@mantine/core";

// UI Utils
import { UseFormReturnType } from "@mantine/form";

// Icons
import { IconTrash, IconInfoCircle } from "@tabler/icons";

// Validation
import { Inputs } from "../validation/Inputs";

// Props
type SummaryProps = {
  form: UseFormReturnType<Inputs>;
};

export const Summary: React.FC<SummaryProps> = ({ form }) => {
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
                  <Text color="dimmed" size="sm">
                    {orderProduct.grindType} / {orderProduct.quantity} adet
                  </Text>
                  <Text weight={700}>{orderProduct.product.name}</Text>
                  <Text size="sm">
                    {orderProduct.unitPrice} ₺ x {orderProduct.quantity}= {orderProduct.subTotal} ₺
                  </Text>
                  <Text size="sm">
                    {orderProduct.subTotal} ₺ + %{orderProduct.taxRate} = {orderProduct.total} ₺
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
        <Button mt="md" type="submit">
          Gönderi Oluştur
        </Button>
      ) : (
        <Alert icon={<IconInfoCircle />} color="cyan">
          Sepette ürün bulunmamaktadır
        </Alert>
      )}
    </>
  );
};
