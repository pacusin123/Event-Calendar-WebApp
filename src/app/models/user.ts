export class User {
  UserId!: number;
  FirstName!: string;
  LastName!: string;
  Email!: string;
  UserName!: string;
  Password!: string;

  constructor(data: any) {
    Object.assign(this, data);
  }
}
