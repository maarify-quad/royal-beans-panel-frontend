import { FormErrors } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { IconAlertCircle } from "@tabler/icons";

export const handleFormError = (errors: FormErrors) => {
  const errorMessages = Object.values(errors).map((error: any) => error);
  showNotification({
    title: "Hata",
    message: errorMessages.join(", "),
    color: "red",
    icon: <IconAlertCircle />,
  });
};
