import z from "zod";

export const createCustomerSchema = z.object({
  name: z.string(),
  contract: z.string(),
});
