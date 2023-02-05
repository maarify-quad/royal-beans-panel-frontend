import React from "react";

// Routing
import { Link, NavLink, useMatch } from "react-router-dom";

// UI Components
import { Navbar as MantineNavbar, ScrollArea, createStyles, Menu } from "@mantine/core";

// Hooks
import { useNavLinks } from "@hooks/layout/useNavLinks";

// Icons
import { IconSettings, IconLogout } from "@tabler/icons";

// Components
import { UserButton } from "./UserButton";

// Styles
const useStyles = createStyles((theme, _params, getRef) => {
  const icon: any = getRef("icon");
  return {
    navbar: {
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
      paddingBottom: 0,
    },
    link: {
      ...theme.fn.focusStyles(),
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
      fontSize: theme.fontSizes.sm,
      color: theme.colorScheme === "dark" ? theme.colors.dark[1] : theme.colors.gray[7],
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      borderRadius: theme.radius.sm,
      fontWeight: 500,
      "&:hover": {
        backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0],
        color: theme.colorScheme === "dark" ? theme.white : theme.black,

        [`& .${icon}`]: {
          color: theme.colorScheme === "dark" ? theme.white : theme.black,
        },
      },
    },
    linkIcon: {
      ref: icon,
      color: theme.colorScheme === "dark" ? theme.colors.dark[2] : theme.colors.gray[6],
      marginRight: theme.spacing.sm,
    },
    linkActive: {
      "&, &:hover": {
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.fn.rgba(theme.colors[theme.primaryColor][8], 0.25)
            : theme.colors[theme.primaryColor][0],
        color: theme.colorScheme === "dark" ? theme.white : theme.colors[theme.primaryColor][7],
        [`& .${icon}`]: {
          color: theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 5 : 7],
        },
      },
    },
    footer: {
      paddingTop: theme.spacing.md,
      marginTop: theme.spacing.md,
      borderTop: `1px solid ${
        theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]
      }`,
    },
  };
});

// Props
type NavbarProps = {
  onLogout: () => void;
};

export const Navbar = ({ onLogout }: NavbarProps) => {
  const { classes, cx } = useStyles();
  const match = useMatch(window.location.pathname);
  const { navLinks } = useNavLinks();

  return (
    <MantineNavbar p="md" hiddenBreakpoint="sm" width={{ base: 240 }} className={classes.navbar}>
      <MantineNavbar.Section grow component={ScrollArea}>
        {navLinks.map((item) => (
          <NavLink
            className={cx(classes.link, {
              [classes.linkActive]: item.match.test(match?.pathname || ""),
            })}
            to={item.link}
            key={item.label}
          >
            <item.icon className={classes.linkIcon} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </MantineNavbar.Section>

      <MantineNavbar.Section className={classes.footer}>
        <Menu position="right-end" width={200}>
          <Menu.Target>
            <UserButton />
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item component={Link} to="/dashboard/settings" icon={<IconSettings />}>
              Ayarlar
            </Menu.Item>
            <Menu.Item color="red" icon={<IconLogout />} onClick={onLogout}>
              Çıkış yap
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </MantineNavbar.Section>
    </MantineNavbar>
  );
};
