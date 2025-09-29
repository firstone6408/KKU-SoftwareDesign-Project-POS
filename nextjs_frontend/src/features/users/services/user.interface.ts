import { UserRoleEnum } from "./user.enum";

export interface IUpsertUser {
  userName: string;
  userEmail: string;
  userPassword: string | null;
  userRole: UserRoleEnum;
}
