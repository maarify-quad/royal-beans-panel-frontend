import React from "react";

// Routing
import { Navigate, useNavigate, useParams } from "react-router-dom";

// Services
import { useGetDeliveryByIdQuery, useDeleteDeliveryMutation } from "@services/deliveryApi";
import { skipToken } from "@reduxjs/toolkit/dist/query";

// UI Components
import { Alert, Loader, Box, Button, Text } from "@mantine/core";

// UI Utils
import { openConfirmModal } from "@mantine/modals";

// Icons
import { IconAlertCircle, IconTrash } from "@tabler/icons";

// Components
import { Results } from "./Results";

// Layouts
import { PageLayout } from "@layouts/PageLayout/PageLayout";

export const DeliveryDetailsView = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Queries
  const { data, isLoading, error } = useGetDeliveryByIdQuery(id ?? skipToken);

  // Mutations
  const [deleteDelivery, { isLoading: isDeleting }] = useDeleteDeliveryMutation();

  const handleDeleteDelivery = () => {
    openConfirmModal({
      title: "Sevkiyatı silmek istediğinize emin misiniz?",
      labels: { cancel: "Vazgeç", confirm: "Sil" },
      confirmProps: { color: "red" },
      centered: true,
      onConfirm: async () => {
        try {
          if (!id) return;
          await deleteDelivery(id).unwrap();
          navigate("/dashboard/deliveries", { replace: true });
        } catch {}
      },
    });
  };

  if (!id) {
    return <Navigate to="/dashboard" replace />;
  }

  if (error) {
    return (
      <Alert
        icon={<IconAlertCircle />}
        color="red"
        title="Tedarikçiye ulaşılamadı"
        variant="filled"
        mt="md"
      >
        {(error as any)?.data?.message || "Beklenmedik bir hata oluştu"}
      </Alert>
    );
  }

  if (isLoading || isDeleting) {
    return <Loader />;
  }

  return (
    <>
      {data?.deletedAt && (
        <Alert icon={<IconAlertCircle />} variant="filled" color="red" mb="md">
          <Text weight="bold">Bu sevkiyat silinmiştir</Text>
        </Alert>
      )}
      <PageLayout
        title={`${id} - ${data?.supplier.name}`}
        breadcrumbs={[
          {
            label: "Panel",
            href: "/dashboard",
          },
          {
            label: "Sevkiyatlar",
            href: "/dashboard/deliveries",
          },
          {
            label: id,
            href: `/dashboard/deliveries/${id}`,
          },
        ]}
        actions={
          !data?.deletedAt && (
            <Button
              leftIcon={<IconTrash />}
              variant="subtle"
              color="red"
              onClick={handleDeleteDelivery}
            >
              Sevkiyatı Sil
            </Button>
          )
        }
      >
        <Box mt="md">{data && <Results delivery={data} />}</Box>
      </PageLayout>
    </>
  );
};
