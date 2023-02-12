// Routing
import { Link } from "react-router-dom";

// UI Components
import { createStyles, Title, Group, Breadcrumbs, Anchor, Loader, Alert } from "@mantine/core";

// Icons
import { IconAlertCircle } from "@tabler/icons";

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
  isLoading?: boolean;
  error?: any;
};

export const PageLayout = ({
  title,
  breadcrumbs,
  children,
  actions,
  isLoading,
  error,
}: PageLayoutProps) => {
  const { classes } = useStyles();

  if (isLoading) {
    return (
      <div
        style={{
          width: "100%",
          height: "calc(100% - 50px)",
          display: "grid",
          placeItems: "center",
        }}
      >
        <Loader size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert icon={<IconAlertCircle />} color="red" title="Hata" variant="filled" mt="md">
        {(error as any)?.data?.message || "Beklenmedik bir hata oluştu"}
      </Alert>
    );
  }

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
