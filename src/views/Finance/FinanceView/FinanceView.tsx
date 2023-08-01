// Services
import { useGetFinanceMutation } from "@services/financeApi";

// Mantine
import { Button, NumberInput, Select, Stack } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";

// Layouts
import { PageLayout } from "@layouts/PageLayout/PageLayout";

// Validation
import { financeValidation, FinanceValues } from "./financeValidation";

// Dayjs
import dayjs from "dayjs";

// Constants
import { FINANCE_KEY_LABELS } from "src/constants";

const numberFormatter = new Intl.NumberFormat("tr-TR", {
  style: "currency",
  currency: "TRY",
});

export const FinanceView = () => {
  // Mutations
  const [getFinance, { data, isLoading }] = useGetFinanceMutation();

  const form = useForm<FinanceValues>({
    initialValues: {
      month: dayjs().month().toString(),
      totalConstantExpense: 0,
      marketingExpense: 0,
      generalCost: 0,
      cargoCost: 0,
      bulkOrderCargoCost: 0,
      manualOrderCargoCost: 0,
      shopifyOrderCargoCost: 0,
    },
    validate: zodResolver(financeValidation),
  });

  const handleSubmit = async (values: FinanceValues) => {
    try {
      const month = +values.month;
      await getFinance({ ...values, month }).unwrap();
    } catch {}
  };

  return (
    <PageLayout
      title="Finans"
      breadcrumbs={[
        {
          label: "Panel",
          href: "/dashboard",
        },
        {
          label: "Finans",
          href: "/dashboard/finance",
        },
      ]}
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack spacing="xs">
          <Select
            label="Geçerli Ay"
            placeholder="Ay Seçin"
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
            precision={2}
            withAsterisk
            {...form.getInputProps("totalConstantExpense")}
          />
          <NumberInput
            label="Reklam Gider"
            precision={2}
            withAsterisk
            {...form.getInputProps("marketingExpense")}
          />
          <NumberInput
            label="Maliyet Genel"
            precision={2}
            withAsterisk
            {...form.getInputProps("generalCost")}
          />
          <NumberInput
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
          />
        </Stack>
        <Button mt="md" type="submit" loading={isLoading}>
          Hesapla
        </Button>
      </form>
      {data && (
        <Stack mt="md" spacing="xs">
          {Object.entries(data).map(([key, value]) => (
            <div key={key}>
              {FINANCE_KEY_LABELS[key]}: {numberFormatter.format(value)}
            </div>
          ))}
        </Stack>
      )}
    </PageLayout>
  );
};
