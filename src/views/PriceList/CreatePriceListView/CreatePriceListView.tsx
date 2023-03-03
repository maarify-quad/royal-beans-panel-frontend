// Routing
import { useNavigate } from "react-router-dom";

// Services
import { useCreatePriceListWithProductsMutation } from "@services/priceListApi";

// UI Components
import { Button, TextInput } from "@mantine/core";

// UI Utils
import { useForm, zodResolver } from "@mantine/form";
import { showNotification } from "@mantine/notifications";

// Icons
import { IconCircleCheck, IconPlus } from "@tabler/icons";

// Layouts
import { PageLayout } from "@layouts/PageLayout/PageLayout";

// Components
import AddProduct from "./AddProduct";

// Validation
import {
  CreatePriceListValues,
  createPriceListSchema,
  initialValues,
} from "./createPriceListValidation";

// Utils
import { handleFormError } from "@utils/form";

export const CreatePriceListView = () => {
  const [createPriceList, { isLoading }] = useCreatePriceListWithProductsMutation();

  const navigate = useNavigate();
  const form = useForm<CreatePriceListValues>({
    initialValues,
    validate: zodResolver(createPriceListSchema),
  });

  const handleSubmit = async (values: CreatePriceListValues) => {
    try {
      const priceList = await createPriceList(values).unwrap();

      showNotification({
        title: "Başarılı",
        message: "Fiyat listesi başarıyla oluşturuldu",
        color: "green",
        icon: <IconCircleCheck />,
      });

      navigate(`/dashboard/price-lists/${priceList.id}`);
    } catch {}
  };

  return (
    <PageLayout
      breadcrumbs={[
        {
          label: "Panel",
          href: "/dashboard",
        },
        {
          label: "Fiyat Listeleri",
          href: "/dashboard/price-lists",
        },
        {
          label: "Yeni Fiyat Listesi",
          href: "/dashboard/price-lists/create",
        },
      ]}
      title="Yeni Fiyat Listesi"
      actions={
        <Button
          leftIcon={<IconPlus />}
          disabled={isLoading}
          loading={isLoading}
          type="submit"
          form="createPriceList"
        >
          Fiyat Listesini Oluştur
        </Button>
      }
    >
      <form id="createPriceList" onSubmit={form.onSubmit(handleSubmit, handleFormError)}>
        <TextInput
          label="Fiyat Listesi Adı"
          placeholder="Fiyat listesi adını giriniz"
          withAsterisk
          mt="md"
          {...form.getInputProps("name")}
        />
        <AddProduct form={form} />
      </form>
    </PageLayout>
  );
};
