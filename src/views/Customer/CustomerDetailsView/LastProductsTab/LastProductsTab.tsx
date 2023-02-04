import React from "react";

// Services
import { useGetLatestOrderProductsByCustomerQuery } from "@services/orderProductApi";

// UI Components
import { Alert, Loader } from "@mantine/core";

// Icons
import { IconAlertCircle } from "@tabler/icons";

// Components
import { ResultsTable } from "@components/ResultsTable";

// Utils
import { formatCurrency } from "@utils/localization";

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
        icon={<IconAlertCircle />}
        color="red"
        title="Ürünlere ulaşılamadı"
        variant="filled"
        mt="md"
      >
        {(error as any)?.data?.message || "Beklenmedik bir hata oluştu"}
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
            { value: formatCurrency(orderProduct.unitPrice) },
          ]) || []
        }
      />
    </div>
  );
};
