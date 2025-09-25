import z from "zod";

export const customerSchema = z.object({
  id: z.string(),
  customerCode: z.string(),
  name: z.string(),
  contactInfo: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type ICustomer = z.infer<typeof customerSchema>;
