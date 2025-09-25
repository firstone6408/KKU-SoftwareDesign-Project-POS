import { FILE_CONFIG } from "@/configs/file.config";
import z from "zod";

export const updateProductSchema = z.object({
  productName: z
    .string()
    .min(2, { message: "ชื่อต้องมีอย่างน้อย 2 ตัวอักษร" }),
  productBarcode: z
    .string()
    .length(13, { message: "Barcode ต้องมี 13 ตัวอักษร" }),
  productDescription: z.string().nullable(),
  categoryId: z.string(),
  supplierId: z.string(),
  productImage: z
    .instanceof(File)
    .nullable()
    .refine(
      (file) => !file || file.size <= FILE_CONFIG.UPLOAD.IMAGE.MAX_SIZE,
      { message: "ไฟล์ต้องมีขนาดไม่เกิน 5MB" }
    ),
});
