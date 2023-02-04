// Routing
import { Link } from "react-router-dom";

// UI Components
import { createStyles, Title, Group, Button, Breadcrumbs, Anchor } from "@mantine/core";

// Styles
const useStyles = createStyles((theme) => ({
  root: {
    height: "100%",
  },
  rootTitle: {
    color: theme.colorScheme === "dark" ? theme.colors.gray[4] : theme.black,
  },
}));

// Props
type PageLayoutProps = {
  title?: string;
  breadcrumbs: {
    label?: string;
    href: string;
  }[];
  children: React.ReactNode;
  actions?: React.ReactNode;
};

export const PageLayout = ({ title, breadcrumbs, children, actions }: PageLayoutProps) => {
  const { classes } = useStyles();

  return (
    <div className={classes.root}>
      <Breadcrumbs>
        {breadcrumbs.map((breadcrumb) => (
          <Anchor component={Link} to={breadcrumb.href} key={breadcrumb.href}>
            {breadcrumb.label}
          </Anchor>
        ))}
      </Breadcrumbs>
      <Group align="center" position="apart" mt="md">
        <Title order={2} className={classes.rootTitle}>
          {title}
        </Title>
        {actions}
      </Group>
      {children}
    </div>
  );
};
