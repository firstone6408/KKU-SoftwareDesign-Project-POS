import { FILE_CONFIG } from "@/configs/file.config";
import z from "zod";

export const createProductSchema = z.object({
  productName: z
    .string()
    .min(2, { message: "ชื่อต้องมีอย่างน้อย 2 ตัวอักษร" }),
  productDescription: z.string().nullable(),
  productStockLevel: z
    .number()
    .min(0, { message: "จำนวนสินค้าต้องไม่น้อยกว่า 0" }),
  productUnitPrice: z
    .number()
    .min(0, { message: "ราคาต้องไม่น้อยกว่า 0" }),
  categoryId: z.string(),
  supplierId: z.string(),
  productImage: z
    .instanceof(File)
    .refine(
      (file) => !file || file.size <= FILE_CONFIG.UPLOAD.IMAGE.MAX_SIZE,
      { message: "ไฟล์ต้องมีขนาดไม่เกิน 5MB" }
    )
    .nullable(),
});
