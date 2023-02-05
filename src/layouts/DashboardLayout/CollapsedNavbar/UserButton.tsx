// Redux
import { useReduxSelector } from "@app/hook";
import { selectUser } from "@slices/authSlice";

// UI Components
import { UnstyledButton, Avatar, createStyles, Menu } from "@mantine/core";

// Styles
const useStyles = createStyles((theme) => ({
  user: {
    display: "block",
    width: "100%",
    padding: theme.spacing.md,
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

    "&:hover": {
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[0],
    },
  },
}));

// Props
type UserButtonProps = {
  onLogout: () => void;
};

export const UserButton = ({ onLogout }: UserButtonProps) => {
  const { classes } = useStyles();
  const user = useReduxSelector(selectUser);

  return (
    <Menu position="right-end" trigger="hover" withArrow withinPortal>
      <Menu.Target>
        <UnstyledButton className={classes.user}>
          <Avatar src={""} radius="xl" />
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>
          {user?.firstName} {user?.lastName}
        </Menu.Label>
        <Menu.Item>Ayarlar</Menu.Item>
        <Menu.Item color="red" onClick={onLogout}>
          Çıkış Yap
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
