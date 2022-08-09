import React from "react";

// Routing
import { NavLink, useMatch } from "react-router-dom";

// Redux
import { useReduxDispatch, useReduxSelector } from "@app/hook";
import { toggleDrawer, selectIsDrawerOpen } from "@slices/layoutSlice";

// UI Components
import { createStyles, Drawer as MantineDrawer, Stack } from "@mantine/core";

// Icons
import {
  TruckDelivery as TruckDeliveryIcon,
  Users as UsersIcon,
  Package as PackageIcon,
  Coffee as CoffeeIcon,
} from "tabler-icons-react";

// Styles
const useStyles = createStyles((theme, _params, getRef) => {
  const icon: any = getRef("icon");
  return {
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
        backgroundColor:
          theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0],
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
        color:
          theme.colorScheme === "dark" ? theme.white : theme.colors[theme.primaryColor][7],
        [`& .${icon}`]: {
          color: theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 5 : 7],
        },
      },
    },
  };
});

const navLinks = [
  {
    label: "Tedarikçiler",
    icon: UsersIcon,
    match: "/suppliers",
    link: "/dashboard/suppliers",
  },
  {
    label: "Sevkiyatlar",
    icon: TruckDeliveryIcon,
    match: "/deliveries",
    link: "/dashboard/deliveries",
  },
  {
    label: "Depo",
    icon: PackageIcon,
    match: "storage",
    link: "/dashboard/storage",
  },
  {
    label: "Kavrum",
    icon: CoffeeIcon,
    match: "roasts",
    link: "/dashboard/roasts",
  },
];

export const Drawer = () => {
  const { classes, cx } = useStyles();
  const dispatch = useReduxDispatch();
  const isDrawerOpen = useReduxSelector(selectIsDrawerOpen);
  const match = useMatch(window.location.pathname);

  const onDrawerClose = () => {
    dispatch(toggleDrawer());
  };

  return (
    <MantineDrawer opened={isDrawerOpen} onClose={onDrawerClose}>
      <Stack justify="space-between" style={{ height: "100%" }}>
        <div>
          {navLinks.map((item) => (
            <NavLink
              className={cx(classes.link, {
                [classes.linkActive]: match?.pathname.includes(item.match),
              })}
              onClick={onDrawerClose}
              to={item.link}
              key={item.label}
            >
              <item.icon className={classes.linkIcon} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </div>
        <div
          style={{
            flexDirection: "column",
            height: "100%",
          }}
        >
          UserButton
        </div>
      </Stack>
    </MantineDrawer>
  );
};
