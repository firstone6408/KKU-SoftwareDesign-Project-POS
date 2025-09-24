import z from "zod";
import { AdjustStockProductEnum } from "../services/product.enum";

export const updateStockProductSchema = z.object({
  quantity: z.number().min(0, { message: "จำนวนต้องไม่ติดลบ" }),
  adjustStockType: z.nativeEnum(AdjustStockProductEnum),
});
