import React, { ReactNode } from "react";

// Routing
import { Link } from "react-router-dom";

// UI Components
import { Table } from "@mantine/core";

// Interfaces
import { RowDef } from "./interfaces/RowDef";
import { HeaderDef } from "./interfaces/HeaderDef";

// Props
type ResultsTableProps = {
  headers: HeaderDef[];
  rows: RowDef[][];
  onRowClick?: (index: number) => () => void;
};

export const ResultsTable: React.FC<ResultsTableProps> = ({ headers, rows, onRowClick }) => {
  return (
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
          <tr onClick={onRowClick ? onRowClick(i) : undefined} key={i}>
            {row.map((data, j) => (
              <td key={j}>
                {data.link ? (
                  <Link style={{ color: "inherit" }} to={data.link}>
                    {data.value}
                  </Link>
                ) : (
                  data.value
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
