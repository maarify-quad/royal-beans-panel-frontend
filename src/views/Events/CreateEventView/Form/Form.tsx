// Routing
import { useNavigate } from "react-router-dom";

// Services
import { useCreateEventMutation } from "@services/eventsApi";

// UI Components
import {
  TextInput,
  Textarea,
  Button,
  Group,
  LoadingOverlay,
  Paper,
  NumberInput,
} from "@mantine/core";

// UI Utils
import { useForm, zodResolver } from "@mantine/form";
import { showNotification } from "@mantine/notifications";

// Icons
import { IconCircleCheck } from "@tabler/icons";

// Validation
import { Inputs, initialValues } from "../validation/Inputs";
import { schema } from "../validation/schema";

// Utils
import { handleFormError } from "@utils/form";

export const Form = () => {
  const navigate = useNavigate();

  // Mutations
  const [createEvent, { isLoading }] = useCreateEventMutation();

  // Form utils
  const form = useForm<Inputs>({
    initialValues,
    validate: zodResolver(schema),
  });

  const onSubmit = async (values: Inputs) => {
    try {
      await createEvent(values).unwrap();

      showNotification({
        title: "Başarılı",
        message: "Etkinlik başarıyla oluşturuldu.",
        icon: <IconCircleCheck />,
        color: "green",
      });

      navigate("/dashboard/events");
    } catch {
      // Error is handled by the RTK Query middleware at @app/middlewares/rtkQueryErrorLogger.ts
    }
  };

  return (
    <Paper radius="md" p="xl" withBorder>
      <form onSubmit={form.onSubmit(onSubmit, handleFormError)}>
        <LoadingOverlay visible={isLoading} />
        <TextInput
          label="Başlık (Opsiyonel)"
          placeholder="Etkinlik başlığı"
          {...form.getInputProps("title")}
        />
        <Textarea
          label="Açıklama (Opsiyonel)"
          placeholder="Etkinlik açıklaması"
          mt="md"
          {...form.getInputProps("description")}
        />
        <TextInput
          required
          label="Kod"
          placeholder="Etkinlik kodu"
          mt="md"
          {...form.getInputProps("code")}
        />
        <TextInput
          required
          label="Bitiş Kodu"
          placeholder="Etkinlik bitiş kodu"
          mt="md"
          {...form.getInputProps("finisherCode")}
        />
        <NumberInput
          required
          label="Kazanan Sayısı"
          placeholder="Etkinlik kazanan sayısı"
          mt="md"
          {...form.getInputProps("winnerCount")}
        />
        <Group position="right" mt="xl">
          <Button variant="default" onClick={() => navigate("/dashboard/events")}>
            İptal
          </Button>
          <Button type="submit">Oluştur</Button>
        </Group>
      </form>
    </Paper>
  );
};
