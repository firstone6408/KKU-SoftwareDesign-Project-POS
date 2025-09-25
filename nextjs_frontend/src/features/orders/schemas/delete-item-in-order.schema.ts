import z from "zod";

export const deleteItemInOrderSchema = z.object({
  quantity: z.number().min(1, { message: "จำนวนต้องมากกว่า 0" }),
});
