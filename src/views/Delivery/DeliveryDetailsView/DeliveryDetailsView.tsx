import React from "react";

// Routing
import { Link, Navigate, useParams } from "react-router-dom";

// Services
import { useGetDeliveryByIdQuery } from "@services/deliveryApi";

// UI Components
import {
  createStyles,
  Title,
  Breadcrumbs,
  Anchor,
  Alert,
  Center,
  Loader,
  Box,
} from "@mantine/core";

// Icons
import { IconInfoCircle } from "@tabler/icons";

// Components
import { Results } from "./Results";

// Styles
const useStyles = createStyles((theme) => ({
  root: {
    height: "100%",
  },
  rootTitle: {
    color: theme.colorScheme === "dark" ? theme.colors.gray[4] : theme.black,
  },
  titleLink: {
    textDecoration: "none",
    color: theme.colorScheme === "dark" ? theme.colors.gray[4] : theme.black,
    "&:hover": {
      textDecoration: "underline",
    },
  },
}));

export const DeliveryDetailsView = () => {
  const { id } = useParams();
  const { classes } = useStyles();

  const { data, isLoading, error } = useGetDeliveryByIdQuery(id!, {
    skip: !id,
  });

  if (!id) {
    return <Navigate to="/dashboard" replace />;
  }

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
        <Anchor component={Link} to="/dashboard/deliveries">
          Sevkiyatlar
        </Anchor>
        <Anchor component={Link} to={`/dashboard/deliveries/${id}`}>
          {id}
        </Anchor>
      </Breadcrumbs>
      <Link className={classes.titleLink} to={`/dashboard/suppliers/${data?.supplier.id}`}>
        <Title order={2} className={classes.rootTitle}>
          {data?.supplier.name}
        </Title>
      </Link>
      <Box mt="md">{data && <Results delivery={data} />}</Box>
    </div>
  );
};
