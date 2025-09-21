import z from "zod";

export const upsertSupplierSchema = z.object({
  supplierName: z
    .string()
    .min(2, { message: "ชื่อต้องมีอย่างน้อย 2 ตัวอักษร" }),
  supplierContactInfo: z.string().nullable(),
});
