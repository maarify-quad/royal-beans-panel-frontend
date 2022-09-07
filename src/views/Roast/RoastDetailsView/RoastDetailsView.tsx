import React from "react";
import dayjs from "dayjs";

// Routing
import { Link, Navigate, useParams } from "react-router-dom";

// Services
import { useGetRoastByIdQuery } from "@services/roastApi";

// UI Components
import {
  createStyles,
  Title,
  Breadcrumbs,
  Anchor,
  Alert,
  Loader,
  Center,
  Text,
  Stack,
} from "@mantine/core";

// Icons
import { IconInfoCircle } from "@tabler/icons";

// Components
import { RoastedCoffees } from "./RoastedCoffees";
import { RoundsTable } from "./RoundsTable";

// Styles
const useStyles = createStyles((theme) => ({
  root: {
    height: "100%",
  },
  rootTitle: {
    color: theme.colorScheme === "dark" ? theme.colors.gray[4] : theme.black,
  },
}));

export const RoastDetailsView = () => {
  const { id } = useParams();
  const { classes } = useStyles();

  if (!id) {
    return <Navigate to="/dashboard" replace />;
  }

  const { data, isLoading, error } = useGetRoastByIdQuery(id);

  if (error) {
    return (
      <Alert
        icon={<IconInfoCircle />}
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
    <Center style={{ height: "100%" }}>
      <Loader />
    </Center>;
  }

  return (
    <div className={classes.root}>
      <Breadcrumbs mb={16}>
        <Anchor component={Link} to="/dashboard">
          Panel
        </Anchor>
        <Anchor component={Link} to="/dashboard/roasts">
          Kavrumlar
        </Anchor>
        <Anchor component={Link} to={`/dashboard/roasts/${id}`}>
          {id}
        </Anchor>
      </Breadcrumbs>
      <Title order={2} className={classes.rootTitle}>
        {data?.roast.id}
      </Title>
      <Text color="dimmed">{dayjs(data?.roast.date).format("DD MMM YYYY")}</Text>
      <Stack spacing="lg" mt="md">
        <RoastedCoffees roastDetails={data?.roast.roastDetails} />
        <RoundsTable roastDetails={data?.roast.roastDetails} />
      </Stack>
    </div>
  );
};
