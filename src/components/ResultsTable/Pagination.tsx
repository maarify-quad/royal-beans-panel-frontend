import React from "react";

// UI Components
import { Group, Pagination as MantinePagination } from "@mantine/core";

// Props
type PaginationProps = {
  page: number;
  total: number;
  onPageChange: (page: number) => void;
};

export const Pagination: React.FC<PaginationProps> = ({ page, total, onPageChange }) => {
  return (
    <Group position="center">
      <MantinePagination onChange={onPageChange} total={total} page={page} />
    </Group>
  );
};
