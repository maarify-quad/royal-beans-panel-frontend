import React from "react";

// UI Components
import { ActionIcon, Alert, Button, Card, Group, Stack, Text } from "@mantine/core";

// UI Utils
import { UseFormReturnType } from "@mantine/form";

// Icons
import { IconTrash, IconInfoCircle } from "@tabler/icons";

// Validation
import { Inputs } from "../Form/validation/Inputs";

// Props
type SummaryProps = {
  form: UseFormReturnType<Inputs>;
};

export const Summary: React.FC<SummaryProps> = ({ form }) => {
  const handleRemoveProduct = (index: number) => () => {
    form.removeListItem("deliveryDetails", index);
  };

  return (
    <>
      <Stack mt="md">
        {form.values.deliveryDetails.map((deliveryDetail, index) => (
          <Card withBorder shadow="xs" key={index}>
            <Card.Section inheritPadding py="xs">
              <Group position="apart">
                <div>
                  <Text color="dimmed" size="sm">
                    {deliveryDetail.product.storageType} / {deliveryDetail.quantity}{" "}
                    {deliveryDetail.unit}
                  </Text>
                  <Text weight={700}>{deliveryDetail.product.name}</Text>
                  <Text size="sm">
                    {deliveryDetail.unitPriceTRY} ₺ x {deliveryDetail.quantity}{" "}
                    {deliveryDetail.unit} = {deliveryDetail.subTotal} ₺
                  </Text>
                  <Text size="sm">
                    {deliveryDetail.subTotal} ₺ + %{deliveryDetail.taxRate} = {deliveryDetail.total}{" "}
                    ₺
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
      {form.values.deliveryDetails.length > 0 ? (
        <Button mt="md" type="submit">
          Sevkiyat oluştur
        </Button>
      ) : (
        <Alert icon={<IconInfoCircle />} color="cyan">
          Sepette ürün bulunmamaktadır
        </Alert>
      )}
    </>
  );
};
