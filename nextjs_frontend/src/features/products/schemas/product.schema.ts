import { productCategorySchema } from "@/features/product-categories/schemas/product-category.schema";
import { supplierSchema } from "@/features/suppliers/schemas/supplier.schema";
import z from "zod";

export const productSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  imageUrl: z.string().nullable(),
  stockLevel: z.number(),
  unitPrice: z.number(),
  category: productCategorySchema,
  supplier: supplierSchema,
});

export type IProduct = z.infer<typeof productSchema>;
