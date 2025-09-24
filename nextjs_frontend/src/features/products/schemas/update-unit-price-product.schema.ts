import z from "zod";

export const updateUnitPriceProductSchema = z.object({
  productUnitPrice: z.number().min(0, "ราคาสินค้าต้องไม่ติดลบ"),
});
