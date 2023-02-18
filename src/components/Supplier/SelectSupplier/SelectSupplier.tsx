import { lazy, Suspense, useMemo } from "react";

// Services
import { useGetSuppliersQuery } from "@services/supplierApi";

// UI Components
import { LoadingOverlay, Select, SelectProps } from "@mantine/core";

// UI Utils
import { openModal } from "@mantine/modals";

// Interfaces
import { Supplier } from "@interfaces/supplier";

// Lazy Components
const CreateSupplier = lazy(() => import("@components/Supplier/CreateSupplier"));

// Props
type Props = Omit<SelectProps, "data" | "disabled" | "onChange"> & {
  onChange: (value: string | null, supplier: Supplier | undefined) => void;
};

export const SelectSupplier = ({ onChange, ...rest }: Props) => {
  const { suppliers, isLoading, isFetching, refetch } = useGetSuppliersQuery(undefined, {
    selectFromResult: ({ data, ...rest }) => ({
      ...rest,
      suppliers: data?.suppliers,
    }),
  });

  const supplierSelectOptions = useMemo(
    () =>
      suppliers?.map((supplier) => ({
        value: supplier.id.toString(),
        label: supplier.name,
      })) || [],
    [suppliers]
  );

  const handleCreateSupplier = (value: string) => {
    openModal({
      title: "Tedarikçi Oluştur",
      children: (
        <Suspense fallback={<LoadingOverlay visible />}>
          <CreateSupplier supplier={{ name: value }} onCreate={() => refetch()} />
        </Suspense>
      ),
    });
    return null;
  };

  return (
    <Select
      {...rest}
      disabled={isLoading || isFetching}
      data={supplierSelectOptions}
      onChange={(value) => {
        const selectedSupplier = suppliers?.find((supplier) => supplier.id.toString() === value);
        onChange(value, selectedSupplier);
      }}
      {...(rest.creatable && {
        onCreate: handleCreateSupplier,
      })}
    />
  );
};
