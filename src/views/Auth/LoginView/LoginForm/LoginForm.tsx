import React, { useEffect } from "react";

// Services
import { useLoginMutation } from "@services/authApi";

// Redux
import { useReduxDispatch } from "@app/hook";
import { setAuthentication, setUser } from "@slices/authSlice";

// UI Components
import { TextInput, PasswordInput, Checkbox, Anchor, Group, Button } from "@mantine/core";

// UI Utils
import { showNotification } from "@mantine/notifications";
import { useForm, zodResolver } from "@mantine/form";

// Icons
import { X as ErrorIcon } from "tabler-icons-react";

// Validation
import { Inputs } from "./validation/Inputs";
import { schema } from "./validation/schema";

export const LoginForm = () => {
  const dispatch = useReduxDispatch();
  const [login, { isLoading, data, error }] = useLoginMutation();
  const form = useForm<Inputs>({
    initialValues: {
      username: "",
      password: "",
    },
    validate: zodResolver(schema),
  });

  const onLoginSubmit = async (inputs: typeof form.values) => {
    try {
      await login(inputs);
    } catch (error) {
      console.log(error);
      showNotification({
        title: "Giriş başarısız",
        message: "Beklenmedik bir hata oluştu",
        icon: <ErrorIcon />,
        color: "red",
      });
    }
  };

  useEffect(() => {
    if (error) {
      showNotification({
        title: "Giriş başarısız",
        message: (error as any)?.data?.message || "Beklenmedik bir hata oluştu",
        icon: <ErrorIcon />,
        color: "red",
      });
    }
  }, [(error as any)?.data?.message]);

  useEffect(() => {
    if (data) {
      localStorage.setItem("accessToken", data.accessToken);
      dispatch(setAuthentication({ isAuthenticated: true, user: data.user }));
      dispatch(setUser(data.user));
    }
  }, [data]);

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
      <Group position="apart" mt="md">
        <Checkbox label="Beni hatırla" />
        <Anchor<"a"> onClick={(event) => event.preventDefault()} href="#" size="sm">
          Şifremi unuttum
        </Anchor>
      </Group>
      <Button fullWidth type="submit" mt="xl" loading={isLoading}>
        Giriş yap
      </Button>
    </form>
  );
};
