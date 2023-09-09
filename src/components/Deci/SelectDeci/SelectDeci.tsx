import { useMemo } from "react";

// Services
import { useGetAllDecisQuery } from "@services/deciApi";

// UI Components
import { Select, SelectProps } from "@mantine/core";

// Props
type Props = Omit<SelectProps, "data">;

export const SelectDeci = (props: Props) => {
  const { data: decis, isLoading, isFetching } = useGetAllDecisQuery();

  const deciSelectOptions = useMemo(
    () =>
      decis?.map((deci) => ({
        value: deci.id.toString(),
        label: deci.value.toString(),
      })) || [],
    [decis]
  );

  return <Select {...props} disabled={isLoading || isFetching} data={deciSelectOptions} />;
};
