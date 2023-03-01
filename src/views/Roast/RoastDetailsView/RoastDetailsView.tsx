import dayjs from "dayjs";

// Routing
import { Navigate, useParams } from "react-router-dom";

// Services
import { useGetRoastByIdQuery } from "@services/roastApi";
import { skipToken } from "@reduxjs/toolkit/dist/query";

// UI Components
import { Text, Stack } from "@mantine/core";

// Components
import RoastedCoffees from "./RoastedCoffees";
import RoundsTable from "./RoundsTable";

// Layout
import { PageLayout } from "@layouts/PageLayout/PageLayout";

export const RoastDetailsView = () => {
  const { id } = useParams();

  const { roast, isLoading, error } = useGetRoastByIdQuery(id ?? skipToken, {
    selectFromResult: ({ data, ...rest }) => ({
      ...rest,
      roast: data?.roast,
    }),
  });

  if (!id) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <PageLayout
      title={`Kavrum - ${roast?.id}`}
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
      isLoading={isLoading}
      error={error}
    >
      {roast && (
        <>
          <Text color="dimmed">{dayjs(roast.date).format("DD MMMM YYYY")}</Text>
          <Stack spacing="lg" mt="md">
            <RoastedCoffees roastDetails={roast.roastDetails} />
            <RoundsTable roastDetails={roast.roastDetails} />
          </Stack>
        </>
      )}
    </PageLayout>
  );
};
