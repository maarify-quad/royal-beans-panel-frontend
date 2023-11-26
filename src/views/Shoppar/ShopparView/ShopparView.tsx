import { useState } from "react";
import dayjs from "dayjs";

// Services
import {
  useGetSummaryQuery,
  useGenerateSalesInvoceMutation,
  useGenerateCargoExcelsMutation,
} from "@services/shopparApi";

// Mantine
import {
  Alert,
  Box,
  Button,
  Card,
  Divider,
  Group,
  Loader,
  LoadingOverlay,
  Text,
  TextInput,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";

// Icons
import { IconAlertCircle, IconCircleCheck, IconFileDownload } from "@tabler/icons";

// Layouts
import { PageLayout } from "@layouts/PageLayout/PageLayout";

export const ShopparView = () => {
  // Queries
  const { data, isLoading, isFetching, error } = useGetSummaryQuery();

  // Mutations
  const [generateCargoExcels, { isLoading: isGeneratingExcels }] = useGenerateCargoExcelsMutation();
  const [generateSalesInvoce, { isLoading: isGeneratingSalesInvoice }] =
    useGenerateSalesInvoceMutation();

  // States
  const [sinceOrderId, setSinceOrderId] = useState("");

  const handleGenerateSalesInvoice = async () => {
    try {
      await generateSalesInvoce({ sinceOrderId }).unwrap();

      showNotification({
        title: "Başarılı",
        message: "Sistem başarıyla çalıştırıldı",
        color: "green",
        icon: <IconCircleCheck />,
      });
    } catch {}
  };

  const handleDownloadExcel = async () => {
    try {
      const urls = await generateCargoExcels().unwrap();

      showNotification({
        title: "Başarılı",
        message: "Excel dosyaları oluşturuldu",
        color: "green",
        icon: <IconCircleCheck />,
      });

      urls.forEach((item) => {
        window.open(item.url, "_blank");
      });
    } catch {}
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <Alert
        icon={<IconAlertCircle />}
        color="red"
        title="Shoppar'a ulaşılamadı"
        variant="filled"
        mt="md"
      >
        {(error as any)?.data?.message || "Beklenmedik bir hata oluştu"}
      </Alert>
    );
  }

  return (
    <PageLayout
      title="Shoppar V3"
      breadcrumbs={[
        {
          label: "Panel",
          href: "/dashboard",
        },
        {
          label: "Shoppar",
          href: "/dashboard/shoppar",
        },
      ]}
      actions={
        <Button
          color="green"
          leftIcon={<IconFileDownload />}
          onClick={handleDownloadExcel}
          loading={isGeneratingExcels}
          disabled={isGeneratingSalesInvoice}
        >
          Excel Al
        </Button>
      }
    >
      <LoadingOverlay visible={isFetching} />
      <Box mt="md">
        <TextInput
          label="Sipariş ID"
          placeholder="Shopify sipariş ID'sini giriniz (sipariş numarası ve ID farklı)"
          withAsterisk
          value={sinceOrderId}
          onChange={(event) => setSinceOrderId(event.currentTarget.value)}
        />
        <Button
          loading={isGeneratingSalesInvoice}
          disabled={isGeneratingExcels || !sinceOrderId}
          mt="md"
        >
          Çalıştır
        </Button>
      </Box>
      {data && (
        <Group mt="lg">
          <Card p="md" radius="md" shadow="sm" withBorder>
            <Group position="apart">
              <Text>Son işlenen sipariş:</Text>
              <b>#{data.lastShopifyOrderNumber}</b>
            </Group>
            <Divider my={4} />
            <Group position="apart">
              <Text>Son excel alınma:</Text>
              <b>
                {data.lastExcelExportDate
                  ? dayjs(data.lastExcelExportDate).format("DD MMMM - HH:mm")
                  : "-"}
              </b>
            </Group>
            <Divider my={4} />
            <Group position="apart">
              <Text>Excel bekleyen sipariş:</Text>
              <b>{data.orderCount}</b>
            </Group>
          </Card>
        </Group>
      )}
    </PageLayout>
  );
};
