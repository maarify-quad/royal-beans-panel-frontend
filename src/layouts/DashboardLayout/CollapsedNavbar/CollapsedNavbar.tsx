// UI Components
import { createStyles, Navbar, ScrollArea } from "@mantine/core";

// Components
import { LinksGroup } from "./LinksGroup";
import { UserButton } from "./UserButton";

// Hooks
import { useNavLinks } from "@hooks/layout/useNavLinks";

// Styles
const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
    paddingBottom: 0,
  },

  header: {
    padding: theme.spacing.md,
    paddingTop: 0,
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    borderBottom: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  links: {
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
  },

  linksInner: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    rowGap: theme.spacing.md,
    paddingBottom: theme.spacing.xl,
  },

  footer: {
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
  },
}));

// Props
type CollapsedNavbarProps = {
  onLogout: () => void;
};

export const CollapsedNavbar = ({ onLogout }: CollapsedNavbarProps) => {
  const { classes } = useStyles();
  const { navLinks } = useNavLinks();

  const links = navLinks.map((item) => <LinksGroup {...item} key={item.label} />);

  return (
    <Navbar width={{ sm: 70 }} p="md" className={classes.navbar}>
      <Navbar.Section grow className={classes.links} component={ScrollArea}>
        <div className={classes.linksInner}>{links}</div>
      </Navbar.Section>

      <Navbar.Section className={classes.footer}>
        <UserButton onLogout={onLogout} />
      </Navbar.Section>
    </Navbar>
  );
};
