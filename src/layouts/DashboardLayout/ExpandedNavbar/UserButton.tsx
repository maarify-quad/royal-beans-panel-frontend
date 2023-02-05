// Redux
import { useReduxSelector } from "@app/hook";
import { selectUser } from "@slices/authSlice";

// UI Components
import { UnstyledButton, Group, Avatar, Text, createStyles, Menu } from "@mantine/core";

// Icons
import { IconChevronRight } from "@tabler/icons";

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
    <Menu position="right-end" withArrow withinPortal>
      <Menu.Target>
        <UnstyledButton className={classes.user}>
          <Group position="apart">
            <Group>
              <Avatar src={""} radius="xl" />

              <Text size="sm" weight={500}>
                {user?.firstName} {user?.lastName}
              </Text>
            </Group>

            <IconChevronRight size={14} stroke={1.5} />
          </Group>
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
