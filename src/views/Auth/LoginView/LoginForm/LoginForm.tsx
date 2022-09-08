import React from "react";

// Services
import { useLoginMutation } from "@services/authApi";

// UI Components
import { TextInput, PasswordInput, Button } from "@mantine/core";

// UI Utils
import { useForm, zodResolver } from "@mantine/form";

// Validation
import { Inputs } from "./validation/Inputs";
import { schema } from "./validation/schema";

export const LoginForm = () => {
  // Mutations
  const [login, { isLoading }] = useLoginMutation();

  // Form utils
  const form = useForm<Inputs>({
    initialValues: {
      username: "",
      password: "",
    },
    validate: zodResolver(schema),
  });

  const onLoginSubmit = async (inputs: typeof form.values) => {
    await login(inputs);
  };

  return (
    <form onSubmit={form.onSubmit(onLoginSubmit)}>
      <TextInput
        label="Kullanıcı adı"
        placeholder="coffee_master"
        type="text"
        autoFocus
        {...form.getInputProps("username")}
      />
      <PasswordInput
        label="Şifre"
        placeholder="********"
        mt="md"
        {...form.getInputProps("password")}
      />
      <Button fullWidth variant="gradient" type="submit" mt="xl" loading={isLoading}>
        Giriş yap
      </Button>
    </form>
  );
};
