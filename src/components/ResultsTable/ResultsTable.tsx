import React from "react";

// Routing
import { Link } from "react-router-dom";

// UI Components
import { Table } from "@mantine/core";

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
};

export const ResultsTable: React.FC<ResultsTableProps> = ({
  headers,
  rows,
  pagination,
  onRowClick,
  rowStyles,
}) => {
  return (
    <div>
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
      {pagination && pagination.totalPage > 1 ? (
        <Pagination
          onPageChange={pagination.onPageChange}
          total={pagination.totalPage}
          page={pagination.currentPage}
        />
      ) : null}
    </div>
  );
};
