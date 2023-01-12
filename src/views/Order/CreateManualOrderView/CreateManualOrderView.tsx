import React from "react";

// Routing
import { Link } from "react-router-dom";

// UI Components
import { createStyles, Title, Breadcrumbs, Anchor } from "@mantine/core";

// Components
import { Form } from "./Form";

// Styles
const useStyles = createStyles((theme) => ({
  root: {
    height: "100%",
    position: "relative",
  },
  rootTitle: {
    color: theme.colorScheme === "dark" ? theme.colors.gray[4] : theme.black,
  },
}));

export const CreateManualOrderView = () => {
  const { classes } = useStyles();

  return (
    <div className={classes.root}>
      <Breadcrumbs mb={16}>
        <Anchor component={Link} to="/dashboard">
          Panel
        </Anchor>
        <Anchor component={Link} to="/dashboard/orders">
          Siparişler
        </Anchor>
        <Anchor component={Link} to="/dashboard/orders/manual/create">
          Yeni Manuel Gönderi
        </Anchor>
      </Breadcrumbs>
      <Title order={2} className={classes.rootTitle}>
        Manuel Gönderi Oluştur
      </Title>
      <Form />
    </div>
  );
};
