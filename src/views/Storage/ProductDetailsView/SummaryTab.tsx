// Services
import { useUpdateProductMutation } from "@services/productApi";

// UI Components
import { Group, LoadingOverlay, Paper, Select, Table } from "@mantine/core";

// Interfaces
import { Product } from "@interfaces/product";

// Props
type SummaryTabProps = {
  product: Product;
};

export const SummaryTab = ({ product }: SummaryTabProps) => {
  const [updateProduct, { isLoading }] = useUpdateProductMutation();

  const handleTagChange = async (tag: string | null) => {
    try {
      await updateProduct({
        ...product,
        tag,
      }).unwrap();
    } catch {}
  };

  return (
    <>
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
      <Group style={{ position: "relative" }}>
        <LoadingOverlay visible={isLoading} />
        <Select
          label="Etiket"
          placeholder="Etiket seçin"
          mt="md"
          clearable
          value={product.tag}
          onChange={handleTagChange}
          data={[
            {
              label: "Kahve",
              value: "kahve",
            },
          ]}
        />
      </Group>
    </>
  );
};
