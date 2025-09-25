import z from "zod";

export const addItemInOrderSchema = z.object({
  productId: z.string(),
  quantity: z.number().min(1, { message: "จำนวนมากกว่า 0" }),
  productUnitPrice: z.number(),
});
