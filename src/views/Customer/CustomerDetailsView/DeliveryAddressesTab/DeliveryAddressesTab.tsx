import { lazy, Suspense, useState } from "react";

// Services
import { useDeleteDeliveryAddressMutation } from "@services/deliveryAddressApi";

// UI Components
import { ActionIcon, Alert, Card, Flex, Group, LoadingOverlay, Stack, Text } from "@mantine/core";

// UI Utils
import { openConfirmModal, openModal } from "@mantine/modals";

// Icons
import { IconEdit, IconInfoCircle, IconTrash } from "@tabler/icons";

// Interfaces
import { Customer } from "@interfaces/customer";
import { DeliveryAddress } from "@interfaces/deliveryAddress";

// Lazy Components
const CreateDeliveryAddress = lazy(
  () => import("@components/DeliveryAddress/CreateDeliveryAddress")
);

// Props
type DeliveryAddressesTabProps = {
  customer: Customer;
};

export const DeliveryAddressesTab = ({ customer }: DeliveryAddressesTabProps) => {
  const [deletedId, setDeletedId] = useState(-1);
  const [deleteDeliveryAddress, { isLoading }] = useDeleteDeliveryAddressMutation();

  if (!customer.deliveryAddresses.length) {
    return (
      <Alert color="cyan" icon={<IconInfoCircle />}>
        Bu müşteriye henüz teslimat adresi eklenmemiş.
      </Alert>
    );
  }

  const handleEditDeliveryAddress = (deliveryAddress: DeliveryAddress) => {
    openModal({
      title: "Teslimat Adresi Düzenle",
      children: (
        <Suspense fallback={<LoadingOverlay visible />}>
          <CreateDeliveryAddress customerId={customer.id} deliveryAddress={deliveryAddress} />
        </Suspense>
      ),
    });
  };

  const handleDeleteDeliveryAddress = (id: number) => {
    openConfirmModal({
      title: "Teslimat adresini silmek istediğinize emin misiniz?",
      labels: { cancel: "İptal", confirm: "Sil" },
      confirmProps: { color: "red" },
      centered: true,
      onConfirm: () => {
        setDeletedId(id);
        deleteDeliveryAddress({ id, customerId: customer.id }).finally(() => setDeletedId(-1));
      },
    });
  };

  return (
    <Stack>
      {customer.deliveryAddresses.map((deliveryAddress) => (
        <Card withBorder key={deliveryAddress.id} style={{ position: "relative" }}>
          <LoadingOverlay visible={isLoading && deletedId === deliveryAddress.id} />
          <Group position="apart">
            <Flex direction="column">
              <Group spacing="sm">
                <Text size="lg" weight="bold">
                  {deliveryAddress.title}
                </Text>
                {deliveryAddress.isPrimary && (
                  <Text size="sm" color="dimmed">
                    (Birincil)
                  </Text>
                )}
              </Group>
              <Text>
                {deliveryAddress.receiverName} ({deliveryAddress.receiverPhone})
              </Text>
              <Text>{deliveryAddress.receiverAddress}</Text>
              <Text>
                {deliveryAddress.receiverProvince} / {deliveryAddress.receiverCity}
              </Text>
            </Flex>
            <Group>
              <ActionIcon onClick={() => handleEditDeliveryAddress(deliveryAddress)}>
                <IconEdit size={18} />
              </ActionIcon>
              <ActionIcon
                color="red"
                onClick={() => handleDeleteDeliveryAddress(deliveryAddress.id)}
              >
                <IconTrash size={18} />
              </ActionIcon>
            </Group>
          </Group>
        </Card>
      ))}
    </Stack>
  );
};
