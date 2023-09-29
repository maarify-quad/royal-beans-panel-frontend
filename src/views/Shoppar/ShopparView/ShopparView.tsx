import dayjs from "dayjs";

// Services
import { useGetSummaryQuery, useGenerateCargoExcelsMutation } from "@services/shopparApi";

// UI Components
import { Alert, Box, Button, Card, Divider, Group, Loader, Text, TextInput } from "@mantine/core";

// UI Utils
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

  if (isLoading || isFetching) {
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
        window.open(item.url);
      });
    } catch {}
  };

  return (
    <PageLayout
      title="Shoppar"
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
        >
          Excel Al
        </Button>
      }
    >
      <Box mt="md">
        <TextInput label="Shopify Sipariş ID" withAsterisk />
        <Button mt="md">Çalıştır</Button>
      </Box>
      {data && (
        <Group mt="lg">
          <Card p="md" radius="md" shadow="sm" withBorder>
            <Group position="apart">
              <Text>Son işlenen sipariş:</Text>
              <b>{data.lastShopifyOrderNumber}</b>
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
