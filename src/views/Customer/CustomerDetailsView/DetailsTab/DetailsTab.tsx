import React from "react";

// UI Components
import { SimpleGrid } from "@mantine/core";

// Components
import { DetailsCard } from "@components/DetailsCard";

// Interfaces
import { Customer } from "@interfaces/customer";

// Props
type DetailsTabProps = {
  customer: Customer;
};

export const DetailsTab: React.FC<DetailsTabProps> = ({ customer }) => {
  return (
    <SimpleGrid
      breakpoints={[
        { minWidth: "sm", cols: 2 },
        { minWidth: "md", cols: 3 },
      ]}
      style={{ alignItems: "stretch" }}
    >
      <DetailsCard title="Bakiye" value={`${customer.currentBalance} ₺`} />
      <DetailsCard title="Fiyat Listesi" value={customer.priceList?.name || "-"} />
      <DetailsCard title="Çalışma Prensibi" value={customer.commercialPrinciple || "-"} />
      <DetailsCard title="Performans" value={"TODO"} />
      <DetailsCard
        title="Ekstra"
        value={
          <>
            Özel Not: {customer?.specialNote || "-"}
            <br />
            Yorum: {customer?.comment || "-"}
          </>
        }
      />
      <DetailsCard
        title="Vergi"
        value={
          <>
            Vergi Dairesi: {customer?.taxOffice || "-"}
            <br />
            Vergi No: {customer?.taxNo || "-"}
          </>
        }
      />
      <DetailsCard
        title="İletişim"
        value={
          <>
            {customer?.companyTitle || "-"}
            <br />
            {customer?.contactName || "-"} / {customer?.contactTitle || "-"}
            <br />
            {customer?.secondContactName || "-"} / {customer?.secondContactTitle || "-"}
            <br />
            {customer?.address || "-"}
            <br />
            {customer?.province || "-"} / {customer?.city || "-"}
            <br />
            {customer?.phone || "-"} / {customer?.email || "-"}
            <br />
          </>
        }
      />
      <DetailsCard
        title="Kargo"
        value={
          <>
            {customer?.cargoAddress || "-"}
            <br />
            {customer?.cargoCity || "-"} / {customer?.cargoProvince || "-"}
          </>
        }
      />
    </SimpleGrid>
  );
};
