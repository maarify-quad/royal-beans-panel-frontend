import { useState } from "react";

// Services
import { useUpdateProductMutation } from "@services/productApi";

// Mantine
import { Button, Group, NumberInput, Paper, Table } from "@mantine/core";
import { showNotification } from "@mantine/notifications";

// Icons
import { IconCircleCheck } from "@tabler/icons";

// Components
import SelectTag from "@components/Tag/SelectTag";
import SelectDeci from "@components/Deci/SelectDeci";

// Interfaces
import { Product } from "@interfaces/product";

// Props
type SummaryTabProps = {
  product: Product;
};

export const SummaryTab = ({ product }: SummaryTabProps) => {
  const [weight, setWeight] = useState(product.weight ?? undefined);
  const [deci, setDeci] = useState(product.deci ?? undefined);
  const [tag, setTag] = useState(product.tag);

  // Mutations
  const [updateProduct] = useUpdateProductMutation();

  const handleUpdateProduct = async () => {
    try {
      await updateProduct({
        ...product,
        tag,
        ...(weight && { weight }),
        ...(deci && { deci }),
      }).unwrap();

      showNotification({
        title: "Başarılı",
        message: "Ürün başarıyla güncellendi",
        color: "green",
        icon: <IconCircleCheck />,
      });
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
      <Paper mt="md" p="md" radius="md" withBorder>
        <Group>
          <SelectTag
            label="Etiket"
            placeholder="Etiket seçiniz"
            nothingFound="Etiket bulunamadı"
            searchable
            clearable
            value={tag}
            onChange={(value) => setTag(value)}
            onTagCreate={(name) => setTag(name)}
          />
          <SelectDeci
            label="Desi"
            placeholder="Desi seçiniz"
            nothingFound="Desi bulunamadı"
            searchable
            clearable
            value={deci?.toString()}
            onChange={(value) => setDeci(value ? parseInt(value) : undefined)}
          />
          <NumberInput
            label="Ağırlık (kg)"
            placeholder="Ürünün ağırlığı"
            precision={2}
            step={0.25}
            value={weight}
            onChange={(value) => setWeight(value)}
          />
        </Group>
        <Button
          disabled={product.tag === tag && product.weight === weight}
          onClick={handleUpdateProduct}
          mt="md"
        >
          Kaydet
        </Button>
      </Paper>
    </>
  );
};
