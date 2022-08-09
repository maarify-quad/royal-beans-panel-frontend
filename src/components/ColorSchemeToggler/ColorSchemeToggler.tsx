import React from "react";

// UI Components
import { ActionIcon, useMantineColorScheme } from "@mantine/core";

// Icons
import { Sun, MoonStars } from "tabler-icons-react";

export const ColorSchemeToggler = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <ActionIcon
      onClick={() => toggleColorScheme()}
      size="lg"
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0],
        color: theme.colorScheme === "dark" ? theme.colors.yellow[4] : theme.colors.blue[6],
      })}
    >
      {colorScheme === "dark" ? <Sun size={18} /> : <MoonStars size={18} />}
    </ActionIcon>
  );
};
