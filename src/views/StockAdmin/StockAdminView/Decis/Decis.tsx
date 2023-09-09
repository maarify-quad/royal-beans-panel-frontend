import { Suspense, lazy, useMemo } from "react";

// Services
import { Deci, useGetAllDecisQuery } from "@services/deciApi";

// Mantine
import { Button, LoadingOverlay, Paper } from "@mantine/core";
import { DataTable, DataTableColumn } from "mantine-datatable";

// Icons
import { IconEdit, IconPlus } from "@tabler/icons";
import { openModal } from "@mantine/modals";

// Lazy components
const CreateDeci = lazy(() => import("@components/Deci/CreateDeci"));
const EditDeci = lazy(() => import("@components/Deci/EditDeci"));

const currencyFormatter = Intl.NumberFormat("tr-TR", {
  style: "currency",
  currency: "TRY",
});

export const Decis = () => {
  const { data: decis, isLoading, isFetching } = useGetAllDecisQuery();

  const handleCreateDeci = () => {
    openModal({
      title: "Desi Oluştur",
      children: (
        <Suspense fallback={<LoadingOverlay visible />}>
          <CreateDeci />
        </Suspense>
      ),
    });
  };

  const handleEditDeci = (deci: Deci) => {
    openModal({
      title: "Desi Düzenle",
      children: (
        <Suspense fallback={<LoadingOverlay visible />}>
          <EditDeci deci={deci} />
        </Suspense>
      ),
    });
  };

  const columns = useMemo<DataTableColumn<Deci>[]>(
    () => [
      {
        title: "Desi",
        accessor: "value",
      },
      {
        title: "Fiyat",
        accessor: "price",
        render: ({ price }) => currencyFormatter.format(price),
      },
      {
        title: "İşlem",
        accessor: "action",
        render: (deci) => (
          <Button
            size="xs"
            color="gray"
            variant="subtle"
            leftIcon={<IconEdit size={18} />}
            onClick={() => handleEditDeci(deci)}
          >
            Düzenle
          </Button>
        ),
      },
    ],
    [decis]
  );

  return (
    <div>
      <Paper radius="md" shadow="sm" p="md" mt="md" withBorder>
        <DataTable
          highlightOnHover
          records={decis}
          columns={columns}
          fetching={isLoading || isFetching}
          noRecordsText="Kayıt bulunamadı"
          loadingText="Yükleniyor"
          recordsPerPage={decis?.length || 0}
          totalRecords={decis?.length}
          page={1}
          onPageChange={() => {}}
        />
      </Paper>
      <Button onClick={handleCreateDeci} mt="md" leftIcon={<IconPlus />}>
        Desi Oluştur
      </Button>
    </div>
  );
};
