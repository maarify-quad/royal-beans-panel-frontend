import React from "react";

// UI Components
import { LoadingOverlay, SimpleGrid } from "@mantine/core";

// UI Utils
import { openModal } from "@mantine/modals";

// Components
import { DetailsCard } from "@components/DetailsCard";

// Interfaces
import { Customer } from "@interfaces/customer";

// Props
type DetailsTabProps = {
  customer: Customer;
};

// Lazy Imports
const EditCustomer = React.lazy(() =>
  import("../../../../components/Customer/EditCustomer").then((module) => ({
    default: module.EditCustomer,
  }))
);

export const DetailsTab: React.FC<DetailsTabProps> = ({ customer }) => {
  const openEditCustomer = (
    title: string,
    fields: {
      label: string;
      key: string;
    }[]
  ) => {
    openModal({
      key: "editCustomer",
      title,
      children: (
        <React.Suspense fallback={<LoadingOverlay visible />}>
          <EditCustomer fields={fields} customer={customer} />
        </React.Suspense>
      ),
    });
  };

  return (
    <SimpleGrid
      breakpoints={[
        { minWidth: "sm", cols: 2 },
        { minWidth: "md", cols: 3 },
      ]}
      style={{ alignItems: "stretch" }}
    >
      <DetailsCard title="Bakiye" value={`${customer.currentBalance.toFixed(2)} ₺`} />
      <DetailsCard title="Fiyat Listesi" value={customer.priceList?.name || "-"} />
      <DetailsCard
        title="Çalışma Prensibi"
        value={customer.commercialPrinciple || "-"}
        editAction={() => {
          openEditCustomer("Çalışma Prensibi Güncelle", [
            { label: "Çalışma prensibi", key: "commercialPrinciple" },
          ]);
        }}
      />
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
        editAction={() => {
          openEditCustomer("Ekstra Güncelle", [
            { label: "Özel not", key: "specialNote" },
            { label: "Yorum", key: "comment" },
          ]);
        }}
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
        editAction={() => {
          openEditCustomer("Vergi Güncelle", [
            { label: "Vergi dairesi", key: "taxOffice" },
            { label: "Vergi no", key: "taxNo" },
          ]);
        }}
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
        editAction={() => {
          openEditCustomer("İletişim Güncelle", [
            { label: "Firma unvanı", key: "companyTitle" },
            { label: "Yetkili adı", key: "contactName" },
            { label: "Yetkili unvanı", key: "contactTitle" },
            { label: "İkincil yetkili adı", key: "secondContactName" },
            { label: "İkincil yetkili unvanı", key: "secondContactTitle" },
            { label: "Adres", key: "address" },
            { label: "İl", key: "city" },
            { label: "İlçe", key: "province" },
            { label: "Telefon", key: "phone" },
            { label: "E-posta", key: "email" },
          ]);
        }}
      />
      <DetailsCard
        title="Kargo"
        value={
          <>
            {customer?.cargoAddress || "-"}
            <br />
            {customer?.cargoProvince || "-"} / {customer?.cargoCity || "-"}
          </>
        }
        editAction={() => {
          openEditCustomer("Kargo Güncelle", [
            { label: "Kargo adresi", key: "cargoAddress" },
            { label: "Kargo il", key: "cargoCity" },
            { label: "Kargo ilçe", key: "cargoProvince" },
          ]);
        }}
      />
    </SimpleGrid>
  );
};
