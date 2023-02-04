export type Inputs = {
  name: string;
  companyTitle: string;
  contactName: string;
  contactTitle: string;
  secondContactName: string;
  secondContactTitle: string;
  priceListId: string;
  email: string;
  phone: string;
  address: string;
  province: string;
  city: string;
  cargoAddress: string;
  cargoProvince: string;
  cargoCity: string;
  taxOffice: string;
  taxNo: string;
  startBalance: number;
  commercialPrinciple: string;
  comment: string;
  specialNote: string;
};

export const initialValues: Inputs = {
  name: "",
  companyTitle: "",
  contactName: "",
  contactTitle: "",
  secondContactName: "",
  secondContactTitle: "",
  priceListId: "0",
  email: "",
  phone: "",
  address: "",
  province: "",
  city: "",
  cargoAddress: "",
  cargoProvince: "",
  cargoCity: "",
  taxOffice: "",
  taxNo: "",
  startBalance: 0,
  commercialPrinciple: "",
  comment: "",
  specialNote: "",
};
