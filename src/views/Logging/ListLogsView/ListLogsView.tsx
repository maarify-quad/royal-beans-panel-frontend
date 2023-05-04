import dayjs from "dayjs";

// Services
import { useGetAllLogsQuery } from "@services/loggingApi";

// Mantine
import { Button, Paper, Table } from "@mantine/core";
import { Prism } from "@mantine/prism";
import { openModal } from "@mantine/modals";

// Layout
import { PageLayout } from "@layouts/PageLayout/PageLayout";

export const ListLogsView = () => {
  const { data: logs, isLoading, isFetching, error } = useGetAllLogsQuery();

  const showJsonParams = (jsonParams: string) => {
    openModal({
      title: "Parametreler",
      children: (
        <Prism language="json" withLineNumbers>
          {JSON.stringify(JSON.parse(jsonParams), null, 2)}
        </Prism>
      ),
    });
  };

  return (
    <PageLayout
      title="Loglar"
      breadcrumbs={[
        {
          label: "Panel",
          href: "/dashboard",
        },
        {
          label: "Loglar",
          href: "/dashboard/logs",
        },
      ]}
      isLoading={isLoading || isFetching}
      error={error}
    >
      <Paper withBorder p="md" mt="md">
        <Table highlightOnHover>
          <thead>
            <tr>
              <th>Kullanıcı</th>
              <th>Mesaj</th>
              <th>Parametreler</th>
              <th>Tarih</th>
            </tr>
          </thead>
          <tbody>
            {logs?.map((log) => (
              <tr key={log.id}>
                <td>{log.user?.username || "Sistem"}</td>
                <td>{log.message}</td>
                <td>
                  {log.jsonParams ? (
                    <Button compact onClick={() => showJsonParams(log.jsonParams || "")}>
                      Göster
                    </Button>
                  ) : (
                    "-"
                  )}
                </td>
                <td>{dayjs(log.createdAt).format("DD MMM YYYY | HH:mm")}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Paper>
    </PageLayout>
  );
};
