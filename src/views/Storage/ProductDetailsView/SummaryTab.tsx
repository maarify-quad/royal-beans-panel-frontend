// Services
import { useUpdateProductMutation } from "@services/productApi";

// UI Components
import { Group, LoadingOverlay, Paper, Select, Table } from "@mantine/core";

// Interfaces
import { Product } from "@interfaces/product";
import SelectTag from "@components/Tag/SelectTag";

// Props
type SummaryTabProps = {
  product: Product;
};

export const SummaryTab = ({ product }: SummaryTabProps) => {
  const [updateProduct] = useUpdateProductMutation();

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
      <Group mt="md">
        <SelectTag
          label="Etiket"
          placeholder="Etiket seçiniz"
          nothingFound="Etiket bulunamadı"
          searchable
          clearable
          value={product.tag}
          onChange={handleTagChange}
          onTagCreate={handleTagChange}
        />
      </Group>
    </>
  );
};
