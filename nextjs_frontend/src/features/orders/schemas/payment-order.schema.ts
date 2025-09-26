import z from "zod";
import { OrderPaymentMethodEnum } from "../services/order.enum";

export const paymentOrderSchema = z.object({
  orderPaidAmount: z.number().min(0, { message: "จำนวนต้องไม่ติดลบ" }),
  orderDiscount: z.number(),
  orderPaymentMethod: z.nativeEnum(OrderPaymentMethodEnum),
  orderSlipImage: z.instanceof(File),
  orderInoviceDate: z.string(),
});
