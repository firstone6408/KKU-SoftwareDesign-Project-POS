import z from "zod";

export const userSchema = z.object({
  id: z.string(),
  email: z.string(),
  name: z.string(),
  role: z.string(),
  lastLoginAt: z.string(),
});

export type IUser = z.infer<typeof userSchema>;
