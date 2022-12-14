import React, { useEffect } from "react";

// Services
import { useLazyLogoutQuery } from "@services/authApi";

// Routing
import { Outlet } from "react-router-dom";

// Redux
import { useReduxDispatch, useReduxSelector } from "@app/hook";
import { toggleDrawer, selectIsDrawerOpen } from "@slices/layoutSlice";

// UI Components
import {
  AppShell,
  Burger,
  Header,
  useMantineTheme,
  createStyles,
  MediaQuery,
  Group,
  Title,
  LoadingOverlay,
} from "@mantine/core";

// UI Utils
import { showNotification } from "@mantine/notifications";
import { useMediaQuery } from "@mantine/hooks";

// Icons
import { IconX } from "@tabler/icons";

// Components
import { ColorSchemeToggler } from "@components/ColorSchemeToggler";

// Lazy Components
const Navbar = React.lazy(() => import("./Navbar").then((module) => ({ default: module.Navbar })));
const Drawer = React.lazy(() =>
  import("./Drawer").then((module) => ({
    default: module.Drawer,
  }))
);

// Styles
const useStyles = createStyles((theme) => ({
  main: {
    height: "100%",
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[0],
  },
  title: {
    fontSize: theme.fontSizes.xl,
    color: theme.colorScheme === "dark" ? theme.white : theme.colors.dark[7],
  },
}));

// Props
type DashboardLayoutProps = {
  children?: React.ReactNode;
};

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const dispatch = useReduxDispatch();
  const isDrawerOpen = useReduxSelector(selectIsDrawerOpen);
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const isMediumScreen = useMediaQuery(`(max-width: ${theme.breakpoints.md}px)`);
  const [logout, { isLoading: isLogoutLoading, error: logoutError }] = useLazyLogoutQuery();

  const handleLogout = async () => {
    await logout();
  };

  useEffect(() => {
    if (logoutError) {
      showNotification({
        title: "Çıkış başarısız",
        message: (logoutError as any)?.data?.message || "Beklenmedik bir hata oluştu",
        icon: <IconX />,
        color: "red",
      });
    }
  }, [(logoutError as any)?.data?.message]);

  const onBurgerClick = () => {
    dispatch(toggleDrawer());
  };

  return (
    <AppShell
      // navbarOffsetBreakpoint controls when navbar should no longer be offset with padding-left
      navbarOffsetBreakpoint="md"
      padding={16}
      // fixed prop on AppShell will be automatically added to Header and Navbar
      className={classes.main}
      fixed
      navbar={isMediumScreen ? <Drawer /> : <Navbar onLogout={handleLogout} />}
      header={
        <Header height={70} p="md">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              height: "100%",
              width: "100%",
            }}
          >
            <Group align="center">
              <MediaQuery largerThan="md" styles={{ display: "none" }}>
                <Burger
                  opened={isDrawerOpen}
                  onClick={onBurgerClick}
                  size="sm"
                  color={theme.colors.gray[6]}
                />
              </MediaQuery>
              <Title className={classes.title}>Royal Beans</Title>
            </Group>
            <ColorSchemeToggler />
          </div>
        </Header>
      }
    >
      <LoadingOverlay visible={isLogoutLoading} />
      {children}
      <Outlet />
    </AppShell>
  );
};
