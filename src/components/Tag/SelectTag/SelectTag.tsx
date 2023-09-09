import { useMemo } from "react";

// Services
import { useGetTagsQuery, useCreateTagMutation } from "@services/tagApi";

// UI Components
import { Select, SelectProps } from "@mantine/core";

// Props
type Props = Omit<SelectProps, "data" | "onCreate" | "creatable"> & {
  onTagCreate?: (name: string) => void;
};

export const SelectTag = (props: Props) => {
  const { onTagCreate, ...restProps } = props;

  const [createTag, { isLoading: isCreating }] = useCreateTagMutation();

  const { tags, isLoading, isFetching } = useGetTagsQuery(undefined, {
    selectFromResult: ({ data, ...rest }) => ({
      ...rest,
      tags: data?.tags,
    }),
  });

  const tagSelectOptions = useMemo(
    () =>
      tags?.map((tag) => ({
        value: tag.name,
        label: tag.name,
      })) || [],
    [tags]
  );

  const handleCreateTag = (name: string) => {
    createTag({ name }).then(() => {
      onTagCreate?.(name);
    });
    return null;
  };

  return (
    <Select
      {...restProps}
      disabled={isLoading || isFetching || isCreating}
      data={tagSelectOptions}
      creatable
      getCreateLabel={(name) => `+ ${name} oluştur`}
      onCreate={handleCreateTag}
    />
  );
};
