export type Inputs = {
  title: string;
  receiverName: string;
  receiverPhone: string;
  receiverAddress: string;
  receiverProvince: string;
  receiverCity: string;
  isPrimary: boolean;
};

export const initialValues: Inputs = {
  title: "",
  receiverName: "",
  receiverPhone: "",
  receiverAddress: "",
  receiverProvince: "",
  receiverCity: "",
  isPrimary: false,
};
