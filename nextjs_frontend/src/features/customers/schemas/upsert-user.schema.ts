import z from "zod";

export const upsertCustomerSchema = z.object({
  customerName: z
    .string()
    .min(2, { message: "ชื่อต้องมีมากกว่า 1 ตัวอักษร" }),
  customerContactInfo: z.string().nullable(),
});
