import dayjs from "dayjs";

// Redux
import { useReduxDispatch, useReduxSelector } from "@app/hook";
import { toggleDrawer, selectIsDrawerOpen } from "@slices/layoutSlice";

// UI Components
import {
  Burger,
  Button,
  createStyles,
  Group,
  Header as MantineHeader,
  MediaQuery,
  Text,
} from "@mantine/core";

// Components
import { ColorSchemeToggler } from "@components/ColorSchemeToggler";

// Icons
import { IconMenu2 } from "@tabler/icons";

// Styles
const usestyles = createStyles((theme) => ({
  title: {
    fontSize: theme.fontSizes.xl,
    color: theme.colorScheme === "dark" ? theme.white : theme.colors.dark[7],
  },
}));

// Props
type HeaderProps = {
  isNavbarExpanded: boolean;
  setIsNavbarExpanded: (value: boolean) => void;
};

export const Header = ({ isNavbarExpanded, setIsNavbarExpanded }: HeaderProps) => {
  const dispatch = useReduxDispatch();
  const isDrawerOpen = useReduxSelector(selectIsDrawerOpen);

  const { classes, theme } = usestyles();

  return (
    <MantineHeader height={50} p="xs" style={{
      borderBottom: '1px solid #c92a2b'
    }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "100%",
          width: "100%",
        }}
      >
        <Group align="center" position="apart" style={{ width: "100%" }}>
          <Group align="center" spacing="xs">
            <MediaQuery smallerThan="md" styles={{ display: "none" }}>
              <Button
                variant="subtle"
                color="gray"
                compact
                onClick={() => setIsNavbarExpanded(!isNavbarExpanded)}
              >
                <IconMenu2 />
              </Button>
            </MediaQuery>
            <MediaQuery largerThan="md" styles={{ display: "none" }}>
              <Burger
                opened={isDrawerOpen}
                onClick={() => dispatch(toggleDrawer())}
                size="sm"
                color={theme.colors.gray[6]}
              />
            </MediaQuery>
            <img src={theme.colorScheme === "dark" ? "/taft-logo-yan-light.png" : "/taft-logo-yan-dark.png"} alt="TAFT Coffee Co." height={20} />
          </Group>
          <Group>
            <MediaQuery smallerThan="md" styles={{ display: "none" }}>
              <Text color="dimmed" size="sm">
                {dayjs().format("DD MMMM YYYY, dddd")}
              </Text>
            </MediaQuery>
            <ColorSchemeToggler />
          </Group>
        </Group>
      </div>
    </MantineHeader>
  );
};
