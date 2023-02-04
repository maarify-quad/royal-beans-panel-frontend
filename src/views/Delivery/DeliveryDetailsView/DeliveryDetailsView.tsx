import React from "react";

// Routing
import { Navigate, useParams } from "react-router-dom";

// Services
import { useGetDeliveryByIdQuery } from "@services/deliveryApi";

// UI Components
import { Alert, Loader, Box } from "@mantine/core";

// Icons
import { IconAlertCircle } from "@tabler/icons";

// Components
import { Results } from "./Results";

// Layouts
import { PageLayout } from "@layouts/PageLayout/PageLayout";

export const DeliveryDetailsView = () => {
  const { id } = useParams();

  const { data, isLoading, error } = useGetDeliveryByIdQuery(id!, {
    skip: !id,
  });

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

  if (isLoading) {
    return <Loader />;
  }

  return (
    <PageLayout
      title={data?.supplier.name}
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
    >
      <Box mt="md">{data && <Results delivery={data} />}</Box>
    </PageLayout>
  );
};
