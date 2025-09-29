import z from "zod";
import { UserRoleEnum } from "../services/user.enum";

export const upsertUserSchema = z.object({
  userName: z.string().min(2, { message: "ชือต้องมีมากกว่า 1 ตัวอักษร" }),
  userEmail: z.string(),
  userPassword: z.string().nullable(),
  userRole: z.nativeEnum(UserRoleEnum),
});
