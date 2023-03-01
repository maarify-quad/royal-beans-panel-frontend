import { z } from "zod";

export type EditSupplierValues = {
  address: string | null;
  taxNo: string | null;
  taxOffice: string | null;
  contactName: string | null;
  contactPosition: string | null;
  contactPhone: string | null;
  contactEmail: string | null;
};

export const editSupplierSchema = z.object({
  address: z.string().nullable(),
  taxNo: z.string().max(255, "Vergi numarası 255 karakterden uzun olamaz").nullable(),
  taxOffice: z.string().max(255, "Vergi dairesi 255 karakterden uzun olamaz").nullable(),
  contactName: z.string().max(255, "Yetkili ismi 255 karakterden uzun olamaz").nullable(),
  contactPosition: z.string().max(255, "Yetkili pozisyonu 255 karakterden uzun olamaz").nullable(),
  contactPhone: z
    .string()
    .max(255, "Yetkili telefon numarası 255 karakterden uzun olamaz")
    .nullable(),
  contactEmail: z
    .string()
    .email("Yetkili e-posta adresi geçerli bir e-posta adresi olmalıdır")
    .or(z.literal(""))
    .nullable(),
});
