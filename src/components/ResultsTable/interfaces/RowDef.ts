import { ReactNode } from "react";

export interface RowDef {
  value: string | number | ReactNode;
  link?: string;
  renderCell?: () => ReactNode;
}
