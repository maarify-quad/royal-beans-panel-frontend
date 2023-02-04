import dayjs from "dayjs";

// Routing
import { Navigate, useParams } from "react-router-dom";

// Services
import { useGetRoastByIdQuery } from "@services/roastApi";

// UI Components
import { Alert, Loader, Text, Stack } from "@mantine/core";

// Icons
import { IconAlertCircle } from "@tabler/icons";

// Components
import { RoastedCoffees } from "./RoastedCoffees";
import { RoundsTable } from "./RoundsTable";

// Styles
import { PageLayout } from "@layouts/PageLayout/PageLayout";

export const RoastDetailsView = () => {
  const { id } = useParams();

  const { data, isLoading, error } = useGetRoastByIdQuery(id!, {
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
      title={data?.roast.id}
      breadcrumbs={[
        {
          label: "Panel",
          href: "/dashboard",
        },
        {
          label: "Kavrumlar",
          href: "/dashboard/roasts",
        },
        {
          label: id,
          href: `/dashboard/roasts/${id}`,
        },
      ]}
    >
      <Text color="dimmed">{dayjs(data?.roast.date).format("DD MMM YYYY")}</Text>
      <Stack spacing="lg" mt="md">
        <RoastedCoffees roastDetails={data?.roast.roastDetails} />
        <RoundsTable roastDetails={data?.roast.roastDetails} />
      </Stack>
    </PageLayout>
  );
};
