import z from "zod";

export const productCategorySchema = z.object({
  id: z.string(),
  name: z.string(),
});

export type IProductCategory = z.infer<typeof productCategorySchema>;
