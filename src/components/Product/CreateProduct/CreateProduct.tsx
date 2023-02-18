import React from "react";

// UI Components
import { Loader, Tabs } from "@mantine/core";

// Components
import { ManualCreate } from "./ManualCreate";

// Lazy Components
const ExcelCreate = React.lazy(() =>
  import("./ExcelCreate").then((module) => ({ default: module.ExcelCreate }))
);

// Props
type CreateProductProps = {
  productName?: string;
  onManualCreate?: () => void;
};

export const CreateProduct = ({ productName, onManualCreate }: CreateProductProps) => {
  return (
    <Tabs defaultValue="manual" mt="md">
      <Tabs.List>
        <Tabs.Tab value="manual">Manuel Oluştur</Tabs.Tab>
        {!productName && <Tabs.Tab value="excel">Excel Yükle</Tabs.Tab>}
      </Tabs.List>

      <Tabs.Panel value="manual" mt="md">
        <ManualCreate productName={productName} onManualCreate={onManualCreate} />
      </Tabs.Panel>
      {!productName && (
        <Tabs.Panel value="excel" mt="md">
          <React.Suspense fallback={<Loader />}>
            <ExcelCreate />
          </React.Suspense>
        </Tabs.Panel>
      )}
    </Tabs>
  );
};
