import React from "react";

// UI Components
import { Loader, Tabs } from "@mantine/core";

// Components
import { ManualCreate } from "./ManualCreate";

// Interfaces
import { PriceListProduct } from "@interfaces/priceListProduct";

// Props
type CreatePriceListProductProps = {
  priceListId: number;
  priceListProducts?: PriceListProduct[];
};

// Lazy Components
const ExcelCreate = React.lazy(() =>
  import("./ExcelCreate").then((module) => ({ default: module.ExcelCreate }))
);

export const CreatePriceListProduct: React.FC<CreatePriceListProductProps> = ({
  priceListId,
  priceListProducts,
}) => {
  return (
    <Tabs defaultValue="manual" mt="md">
      <Tabs.List>
        <Tabs.Tab value="manual">Manuel Oluştur</Tabs.Tab>
        <Tabs.Tab value="excel">Excel Yükle</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="manual" mt="md">
        <ManualCreate priceListId={priceListId} priceListProducts={priceListProducts} />
      </Tabs.Panel>
      <Tabs.Panel value="excel" mt="md">
        <React.Suspense fallback={<Loader />}>
          <ExcelCreate priceListId={priceListId} />
        </React.Suspense>
      </Tabs.Panel>
    </Tabs>
  );
};
