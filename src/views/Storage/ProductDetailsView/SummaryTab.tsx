// UI Components
import { Paper, Table } from "@mantine/core";

// Interfaces
import { Product } from "@interfaces/product";

// Props
type SummaryTabProps = {
  product: Product;
};

export const SummaryTab = ({ product }: SummaryTabProps) => {
  return (
    <Paper p="md" radius="md" withBorder>
      <Table highlightOnHover>
        <thead>
          <tr>
            <th>Ürün</th>
            <th>Depo Tipi</th>
            <th>Stok Kodu</th>
            <th>Birim</th>
            <th>Miktar</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{product.name}</td>
            <td>{product.storageType}</td>
            <td>{product.stockCode}</td>
            <td>{product.amountUnit}</td>
            <td>{product.amount}</td>
          </tr>
        </tbody>
      </Table>
    </Paper>
  );
};
