import React, { forwardRef } from "react";

// Redux
import { useReduxSelector } from "@app/hook";
import { selectUser } from "@slices/authSlice";

// UI Components
import { Group, UnstyledButton, Text } from "@mantine/core";

// Icons
import { IconChevronRight } from "@tabler/icons";

export const UserButton = forwardRef<HTMLButtonElement>((props, ref) => {
  const user = useReduxSelector(selectUser);

  return (
    <UnstyledButton
      ref={ref}
      sx={(theme) => ({
        display: "block",
        width: "100%",
        padding: theme.spacing.md,
        color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

        "&:hover": {
          backgroundColor:
            theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      })}
      {...props}
    >
      <Group position="apart">
        <div>
          <Text size="sm" weight={500}>
            {user?.firstName} {user?.lastName}
          </Text>
          <Text size="xs" color="dimmed">
            {user?.email}
          </Text>
        </div>

        <IconChevronRight size={16} />
      </Group>
    </UnstyledButton>
  );
});
