import { Suspense, lazy } from "react";

// Services
import { useDeleteCustomerMutation } from "@services/customerApi";

// UI Components
import { Button, Flex, Group, LoadingOverlay, SimpleGrid, Stack, Text } from "@mantine/core";

// UI Utils
import { openModal, openConfirmModal } from "@mantine/modals";

// Icons
import { IconUserOff } from "@tabler/icons";

// Components
import { DetailsCard } from "@components/DetailsCard";

// Utils
import { formatCurrency } from "@utils/localization";

// Interfaces
import { Customer } from "@interfaces/customer";

// Props
type DetailsTabProps = {
  customer: Customer;
};

// Lazy Imports
const EditCustomer = lazy(() => import("@components/Customer/EditCustomer"));

export const DetailsTab = ({ customer }: DetailsTabProps) => {
  const openEditCustomer = (
    title: string,
    fields: {
      label: string;
      key: string;
    }[]
  ) => {
    openModal({
      key: "editCustomer",
      title,
      children: (
        <Suspense fallback={<LoadingOverlay visible />}>
          <EditCustomer fields={fields} customer={customer} />
        </Suspense>
      ),
    });
  };

  // Mutations
  const [deleteCustomer, { isLoading: isDeleting }] = useDeleteCustomerMutation();

  const handleDeactivateCustomer = async () => {
    openConfirmModal({
      title: "Müşteriyi devre dışı bırakmak istediğinize emin misiniz?",
      labels: { cancel: "İptal", confirm: "Sil" },
      confirmProps: { color: "red" },
      centered: true,
      onConfirm: async () => {
        try {
          await deleteCustomer(customer.id).unwrap();
        } catch {}
      },
    });
  };

  console.log(customer);

  return (
    <>
      <LoadingOverlay visible={isDeleting} />
      <SimpleGrid
        breakpoints={[
          { minWidth: "sm", cols: 2 },
          { minWidth: "md", cols: 3 },
        ]}
        style={{ alignItems: "stretch" }}
      >
        <DetailsCard title="Bakiye" value={formatCurrency(customer.currentBalance)} />
        <DetailsCard title="Fiyat Listesi" value={customer.priceList?.name || "-"} />
        <DetailsCard
          title="Çalışma Prensibi"
          value={customer.commercialPrinciple || "-"}
          editAction={() => {
            openEditCustomer("Çalışma Prensibi Güncelle", [
              { label: "Çalışma prensibi", key: "commercialPrinciple" },
            ]);
          }}
        />
        <DetailsCard title="Performans" value={"TODO"} />
        <DetailsCard
          title="Ekstra"
          value={
            <>
              Özel Not: {customer?.specialNote || "-"}
              <br />
              Yorum: {customer?.comment || "-"}
            </>
          }
          editAction={() => {
            openEditCustomer("Ekstra Güncelle", [
              { label: "Özel not", key: "specialNote" },
              { label: "Yorum", key: "comment" },
            ]);
          }}
        />
        <DetailsCard
          title="Vergi"
          value={
            <>
              Vergi Dairesi: {customer?.taxOffice || "-"}
              <br />
              Vergi No: {customer?.taxNo || "-"}
            </>
          }
          editAction={() => {
            openEditCustomer("Vergi Güncelle", [
              { label: "Vergi dairesi", key: "taxOffice" },
              { label: "Vergi no", key: "taxNo" },
            ]);
          }}
        />
        <DetailsCard
          title="İletişim"
          value={
            <>
              {customer?.companyTitle || "-"}
              <br />
              {customer?.contactName || "-"} / {customer?.contactTitle || "-"}
              <br />
              {customer?.secondContactName || "-"} / {customer?.secondContactTitle || "-"}
              <br />
              {customer?.address || "-"}
              <br />
              {customer?.province || "-"} / {customer?.city || "-"}
              <br />
              {customer?.phone || "-"} / {customer?.email || "-"}
              <br />
            </>
          }
          editAction={() => {
            openEditCustomer("İletişim Güncelle", [
              { label: "Firma unvanı", key: "companyTitle" },
              { label: "Yetkili adı", key: "contactName" },
              { label: "Yetkili unvanı", key: "contactTitle" },
              { label: "İkincil yetkili adı", key: "secondContactName" },
              { label: "İkincil yetkili unvanı", key: "secondContactTitle" },
              { label: "Adres", key: "address" },
              { label: "İl", key: "city" },
              { label: "İlçe", key: "province" },
              { label: "Telefon", key: "phone" },
              { label: "E-posta", key: "email" },
            ]);
          }}
        />
        <DetailsCard
          title="Kargo"
          value={
            <Stack>
              {customer.deliveryAddresses.map((address) => (
                <Flex direction="column">
                  <Group spacing="sm">
                    <Text size="lg" weight="bold">
                      {address.title}
                    </Text>
                    {address.isPrimary && (
                      <Text size="sm" color="dimmed">
                        (Birincil)
                      </Text>
                    )}
                  </Group>
                  <Text>
                    {address.receiverName} ({address.receiverPhone})
                  </Text>
                  <Text>{address.receiverAddress}</Text>
                  <Text>
                    {address.receiverProvince} / {address.receiverCity}
                  </Text>
                </Flex>
              ))}
            </Stack>
          }
        />
      </SimpleGrid>
      {!customer.deletedAt && (
        <Group position="left">
          <Button
            onClick={handleDeactivateCustomer}
            leftIcon={<IconUserOff />}
            color="red"
            mt="lg"
            variant="subtle"
          >
            Devre Dışı Bırak
          </Button>
        </Group>
      )}
    </>
  );
};
