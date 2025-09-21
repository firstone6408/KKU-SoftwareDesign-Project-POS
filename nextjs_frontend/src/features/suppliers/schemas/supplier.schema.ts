import z from "zod";

export const supplierSchema = z.object({
  id: z.string(),
  name: z.string(),
  contactInfo: z.string().nullable(),
});

export type ISupplier = z.infer<typeof supplierSchema>;
