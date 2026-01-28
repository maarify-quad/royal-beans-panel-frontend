// Routing
import { useNavigate, useSearchParams } from "react-router-dom";

// Services
import { useCreatePriceListWithProductsMutation } from "@services/priceListApi";
import { useUpdateCustomerMutation } from "@services/customerApi";

// UI Components
import { Alert, Button, TextInput } from "@mantine/core";

// UI Utils
import { useForm, zodResolver } from "@mantine/form";
import { showNotification } from "@mantine/notifications";

// Icons
import { IconCircleCheck, IconInfoCircle, IconPlus } from "@tabler/icons";

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
  const [searchParams] = useSearchParams();
  const customerId = searchParams.get("customerId");

  const [createPriceList, { isLoading }] = useCreatePriceListWithProductsMutation();
  const [updateCustomer, { isLoading: isUpdating }] = useUpdateCustomerMutation();

  const navigate = useNavigate();
  const form = useForm<CreatePriceListValues>({
    initialValues,
    validate: zodResolver(createPriceListSchema),
  });

  const handleSubmit = async (values: CreatePriceListValues) => {
    try {
      const priceList = await createPriceList(values).unwrap();

      // If customerId is provided, assign the new price list to the customer
      if (customerId) {
        await updateCustomer({
          id: customerId,
          priceListId: priceList.id,
        }).unwrap();

        showNotification({
          title: "Başarılı",
          message: "Fiyat listesi oluşturuldu ve müşteriye atandı",
          color: "green",
          icon: <IconCircleCheck />,
        });

        navigate(`/dashboard/customers/${customerId}?tab=priceList`);
      } else {
        showNotification({
          title: "Başarılı",
          message: "Fiyat listesi başarıyla oluşturuldu",
          color: "green",
          icon: <IconCircleCheck />,
        });

        navigate(`/dashboard/price-lists/${priceList.id}`);
      }
    } catch {}
  };

  const isSubmitting = isLoading || isUpdating;

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
          disabled={isSubmitting}
          loading={isSubmitting}
          type="submit"
          form="createPriceList"
        >
          Fiyat Listesini Oluştur
        </Button>
      }
    >
      <form id="createPriceList" onSubmit={form.onSubmit(handleSubmit, handleFormError)}>
        {customerId && (
          <Alert icon={<IconInfoCircle />} color="cyan" my="md">
            Bu fiyat listesi <strong>{customerId}</strong> id'li müşteri için oluşturulacaktır
          </Alert>
        )}
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
