import z from "zod";
import { UserRoleEnum } from "../services/user.enum";

export const userSchema = z.object({
  id: z.string(),
  email: z.string(),
  name: z.string(),
  role: z.nativeEnum(UserRoleEnum),
  lastLoginAt: z.string().nullable(),
});

export type IUser = z.infer<typeof userSchema>;
