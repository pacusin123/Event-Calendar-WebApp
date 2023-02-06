import { Role } from "./role";
export class User {
  UserId!: number;
  FirstName!: string;
  LastName!: string;
  Email!: string;
  UserName!: string;
  Password!: string;
  Role!: Role;
  RoleId!: number;

  constructor(data: any) {
    Object.assign(this, data);
  }
}
