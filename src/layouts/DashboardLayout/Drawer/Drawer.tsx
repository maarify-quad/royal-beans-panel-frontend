// Redux
import { useReduxDispatch, useReduxSelector } from "@app/hook";
import { toggleDrawer, selectIsDrawerOpen } from "@slices/layoutSlice";

// UI Components
import { Drawer as MantineDrawer, Stack } from "@mantine/core";

// Components
import { UserButton } from "../ExpandedNavbar/UserButton";
import { LinksGroup } from "../ExpandedNavbar/LinksGroup";

// Hooks
import { useNavLinks } from "@hooks/layout/useNavLinks";

// Props
type DrawerProps = {
  onLogout: () => void;
};

export const Drawer = ({ onLogout }: DrawerProps) => {
  const dispatch = useReduxDispatch();
  const isDrawerOpen = useReduxSelector(selectIsDrawerOpen);
  const { navLinks } = useNavLinks();

  const handleDrawerClose = () => {
    dispatch(toggleDrawer(false));
  };

  const links = navLinks.map((item) => (
    <LinksGroup {...item} key={item.label} onClick={handleDrawerClose} />
  ));

  return (
    <MantineDrawer
      opened={isDrawerOpen}
      onClose={handleDrawerClose}
      styles={{ body: { height: "calc(100% - 44px)" } }}
    >
      <Stack justify="space-between" style={{ height: "100%" }}>
        <div>{links}</div>
        <UserButton onLogout={onLogout} />
      </Stack>
    </MantineDrawer>
  );
};
