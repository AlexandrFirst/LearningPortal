import { UserRole } from "enums";

export interface IUser {
  name: string;
  surname: string;
  email: string;
  userRole: UserRole;
}
