import React from "react";

// UI Components
import { Paper, Container, Title, createStyles } from "@mantine/core";

// Components
import { ColorSchemeToggler } from "@components/ColorSchemeToggler";
import { LoginForm } from "./LoginForm";

// Styles
const useStyles = createStyles((theme) => ({
  root: {
    borderRadius: 0,
    height: "100vh",
    display: "flex",
    placeItems: "center",
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[0],
  },
  title: {
    textAlign: "center",
    color: theme.colorScheme === "dark" ? theme.colors.gray[4] : theme.colors.dark[7],
  },
}));

export const LoginView = () => {
  const { classes } = useStyles();

  return (
    <div className={classes.root}>
      <Container size={380} style={{ width: "100%" }}>
        <div style={{ position: "absolute", top: 20, left: 20 }}>
          <ColorSchemeToggler />
        </div>
        <Title className={classes.title}>Royal Beans</Title>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <LoginForm />
        </Paper>
      </Container>
    </div>
  );
};
