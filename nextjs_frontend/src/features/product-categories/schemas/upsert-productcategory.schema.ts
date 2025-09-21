import z from "zod";

export const upsertProductCategorySchema = z.object({
  productCategoryName: z
    .string()
    .min(2, { message: "ชื่อต้องมีอย่างน้อย 2 ตัวอักษร" }),
});
