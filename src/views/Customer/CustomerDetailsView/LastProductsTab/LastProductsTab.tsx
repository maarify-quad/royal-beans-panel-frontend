import React from "react";

// Services
import { useGetLatestOrderProductsByCustomerQuery } from "@services/orderProductApi";

// UI Components
import { Alert, Loader } from "@mantine/core";

// Icons
import { IconInfoCircle } from "@tabler/icons";

// Components
import { ResultsTable } from "@components/ResultsTable";

// Props
type LastProductsTabProps = {
  customer: string;
};

export const LastProductsTab: React.FC<LastProductsTabProps> = ({ customer }) => {
  // Queries
  const { data, isLoading, error } = useGetLatestOrderProductsByCustomerQuery(customer);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <Alert
        icon={<IconInfoCircle />}
        color="red"
        title="Ürünlere ulaşılamadı"
        variant="filled"
        mt="md"
      >
        {(error as any)?.data?.message || "Beklenmedik bir hata oluştu"}
      </Alert>
    );
  }

  if (data?.orderProducts.length === 0) {
    return (
      <Alert color="cyan" mt="md" icon={<IconInfoCircle />}>
        Ürün bulunmamaktadır
      </Alert>
    );
  }

  return (
    <div>
      <ResultsTable
        headers={[
          { value: "Ürün" },
          { value: "Adet" },
          { value: "Öğütüm" },
          { value: "Birim Fiyat" },
        ]}
        rows={
          data?.orderProducts.map((orderProduct) => [
            { value: orderProduct.priceListProduct.product.name },
            { value: orderProduct.quantity },
            { value: orderProduct.grindType },
            { value: `${orderProduct.unitPrice.toFixed(2)} ₺` },
          ]) || []
        }
      />
    </div>
  );
};
