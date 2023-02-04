import React from "react";

// Routing
import { Link } from "react-router-dom";

// UI Components
import { Card, Group, LoadingOverlay, NativeSelect, Table } from "@mantine/core";

// Components
import { Pagination } from "./Pagination";

// Interfaces
import { RowDef } from "./interfaces/RowDef";
import { HeaderDef } from "./interfaces/HeaderDef";
import { Pagination as IPagination } from "./interfaces/Pagination";

// Props
type ResultsTableProps = {
  headers: HeaderDef[];
  rows: RowDef[][];
  pagination?: IPagination;
  onRowClick?: (row: RowDef[], index: number) => void;
  rowStyles?: React.CSSProperties;
  isLoading?: boolean;
};

export const ResultsTable = ({
  headers,
  rows,
  pagination,
  onRowClick,
  rowStyles,
  isLoading,
}: ResultsTableProps) => {
  return (
    <div style={{ position: "relative" }}>
      <LoadingOverlay visible={isLoading ?? false} />
      <Card withBorder shadow="xs" radius="md">
        <Table highlightOnHover verticalSpacing="sm">
          <thead>
            <tr>
              {headers.map((header, index) => (
                <th key={index}>{header.value}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                style={rowStyles}
                onClick={onRowClick ? () => onRowClick(row, i) : undefined}
                key={i}
              >
                {row.map(({ value, link, renderCell }, j) => (
                  <td key={j}>
                    {link ? (
                      <Link style={{ color: "inherit" }} to={link}>
                        {renderCell ? renderCell() : value}
                      </Link>
                    ) : (
                      <>{renderCell ? renderCell() : value}</>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
      <Group position="right" align="center" mt="md">
        {pagination?.onPageSizeChange && (
          <NativeSelect
            data={[
              { label: "25", value: "25" },
              { label: "50", value: "50" },
              { label: "100", value: "100" },
            ]}
            placeholder="Limit"
            style={{ width: 100 }}
            defaultValue={"50"}
            onChange={(e) => pagination.onPageSizeChange?.(Number(e.currentTarget.value))}
          />
        )}
        {pagination && pagination.totalPage > 1 ? (
          <Pagination
            onPageChange={pagination.onPageChange}
            total={pagination.totalPage}
            page={pagination.currentPage}
          />
        ) : null}
      </Group>
    </div>
  );
};
