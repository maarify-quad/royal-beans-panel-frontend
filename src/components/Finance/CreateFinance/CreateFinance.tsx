import dayjs from "dayjs";

// Routing
import { useNavigate } from "react-router-dom";

// Services
import { useCalculateFinanceMutation } from "@services/financeApi";

// UI Components
import { Button, NumberInput, Select, Stack } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { closeAllModals } from "@mantine/modals";

// Icons
import { IconCircleCheck } from "@tabler/icons";

// Form
import { CreateFinanceValues, createFinanceValidation } from "./createFinanceValidation";

export const CreateFinance = () => {
  // Routing
  const navigate = useNavigate();

  // Mutations
  const [calculateFinance, { isLoading }] = useCalculateFinanceMutation();

  const form = useForm<CreateFinanceValues>({
    initialValues: {
      month: dayjs().month().toString(),
      totalConstantExpense: 0,
      marketingExpense: 0,
      generalCost: 0,
      //   cargoCost: 0,
      //   bulkOrderCargoCost: 0,
      //   manualOrderCargoCost: 0,
      //   shopifyOrderCargoCost: 0,
    },
    validate: zodResolver(createFinanceValidation),
  });

  const handleSubmit = async (values: CreateFinanceValues) => {
    try {
      const month = parseInt(values.month, 10);

      const startDate = dayjs().set("month", month).startOf("month").toISOString();
      const endDate = dayjs().set("month", month).endOf("month").toISOString();

      const { id } = await calculateFinance({ ...values, startDate, endDate }).unwrap();

      showNotification({
        title: "Başarılı",
        message: "Yeni dönem finans oluşturuldu",
        color: "green",
        icon: <IconCircleCheck />,
      });

      closeAllModals();

      navigate(`/dashboard/finance/${id}`);
    } catch {}
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack spacing="xs">
        <Select
          label="Dönem"
          placeholder="Dönem Seçin"
          searchable
          data={[
            { value: "1", label: "Ocak" },
            { value: "2", label: "Şubat" },
            { value: "3", label: "Mart" },
            { value: "4", label: "Nisan" },
            { value: "5", label: "Mayıs" },
            { value: "6", label: "Haziran" },
            { value: "7", label: "Temmuz" },
            { value: "8", label: "Ağustos" },
            { value: "9", label: "Eylül" },
            { value: "10", label: "Ekim" },
            { value: "11", label: "Kasım" },
            { value: "12", label: "Aralık" },
          ]}
          {...form.getInputProps("month")}
        />
        <NumberInput
          label="Tüm Sabit Gider"
          icon="₺"
          precision={2}
          withAsterisk
          {...form.getInputProps("totalConstantExpense")}
        />
        <NumberInput
          label="Reklam Gideri"
          icon="₺"
          precision={2}
          withAsterisk
          {...form.getInputProps("marketingExpense")}
        />
        <NumberInput
          label="Genel Maliyet"
          icon="₺"
          precision={2}
          withAsterisk
          {...form.getInputProps("generalCost")}
        />
        {/* <NumberInput
          label="Maliyet Kargo"
          precision={2}
          withAsterisk
          {...form.getInputProps("cargoCost")}
        />
        <NumberInput
          label="Maliyet S Kargo"
          precision={2}
          withAsterisk
          {...form.getInputProps("bulkOrderCargoCost")}
        />
        <NumberInput
          label="Maliyet MG Kargo"
          precision={2}
          withAsterisk
          {...form.getInputProps("manualOrderCargoCost")}
        />
        <NumberInput
          label="Maliyet Shopify Kargo"
          precision={2}
          withAsterisk
          {...form.getInputProps("shopifyOrderCargoCost")}
        /> */}
      </Stack>
      <Button mt="md" type="submit" loading={isLoading}>
        Oluştur
      </Button>
    </form>
  );
};
