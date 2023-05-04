import React from "react";

// Services
import { useLazyLogoutQuery } from "@services/authApi";

// Routing
import { Outlet } from "react-router-dom";

// UI Components
import { AppShell, useMantineTheme, createStyles, LoadingOverlay } from "@mantine/core";

// UI Utils
import { showNotification } from "@mantine/notifications";
import { useLocalStorage, useMediaQuery } from "@mantine/hooks";

// Icons
import { IconX } from "@tabler/icons";

// Components
import Header from "./Header";
import ExpandedNavbar from "./ExpandedNavbar";
import CollapsedNavbar from "./CollapsedNavbar";

// Lazy Components
const Drawer = React.lazy(() => import("./Drawer"));

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
  // Styles
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const isMediumScreen = useMediaQuery(`(max-width: ${theme.breakpoints.md}px)`);

  // Queries
  const [logout, { isLoading: isLogoutLoading }] = useLazyLogoutQuery();

  // Persist navbar state in local storage
  const [isNavbarExpanded, setIsNavbarExpanded] = useLocalStorage({
    key: "isNavbarExpanded",
    defaultValue: true,
  });

  const handleLogout = async () => {
    try {
      await logout().unwrap();
    } catch (error) {
      showNotification({
        title: "Çıkış başarısız",
        message: (error as any)?.data?.message || "Beklenmedik bir hata oluştu",
        icon: <IconX />,
        color: "red",
      });
    }
  };

  return (
    <AppShell
      navbarOffsetBreakpoint="md"
      padding={16}
      className={classes.main}
      fixed
      navbar={
        isMediumScreen ? (
          <Drawer onLogout={handleLogout} />
        ) : isNavbarExpanded ? (
          <ExpandedNavbar onLogout={handleLogout} />
        ) : (
          <CollapsedNavbar onLogout={handleLogout} />
        )
      }
      header={
        <Header isNavbarExpanded={isNavbarExpanded} setIsNavbarExpanded={setIsNavbarExpanded} />
      }
    >
      <LoadingOverlay visible={isLogoutLoading} />
      {children}
      <Outlet />
    </AppShell>
  );
};
