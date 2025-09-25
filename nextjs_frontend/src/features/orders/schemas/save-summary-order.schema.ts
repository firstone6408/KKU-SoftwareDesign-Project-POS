import z from "zod";

export const saveSummaryOrderSchema = z.object({
  orderDiscount: z.number().min(0, { message: "ส่วนลดไม่สามารถติดลบได้" }),
  orderDeliveryDate: z.string(),
  orderNote: z.string().nullable(),
});
