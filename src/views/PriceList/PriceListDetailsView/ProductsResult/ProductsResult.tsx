import React from "react";

// UI Components
import { Table, Container, Alert } from "@mantine/core";

// Icons
import { IconInfoCircle } from "@tabler/icons";

// Interfaces
import { PriceListProduct } from "@interfaces/priceListProduct";

// Props
type ProductsResultProps = {
  priceListProducts?: PriceListProduct[];
};

export const ProductsResult: React.FC<ProductsResultProps> = ({ priceListProducts }) => {
  if (priceListProducts?.length === 0) {
    return (
      <Alert icon={<IconInfoCircle />} color="cyan">
        Bu fiyat listesinde ürün bulunmamaktadır.
      </Alert>
    );
  }

  return (
    <Container fluid p={0}>
      <Table highlightOnHover verticalSpacing="sm">
        <thead>
          <tr>
            <th>Ürün</th>
            <th>Birim Fiyat</th>
            <th>Vergi</th>
          </tr>
        </thead>
        <tbody>
          {priceListProducts?.map((priceListProduct, i) => (
            <tr key={i}>
              <td>{priceListProduct.product.name}</td>
              <td>{priceListProduct.unitPrice.toFixed(2)} ₺</td>
              <td>{priceListProduct.taxRate} %</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};
