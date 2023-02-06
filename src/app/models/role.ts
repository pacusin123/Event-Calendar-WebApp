export class Role {
  RoleId!: number;
  Name!: string;

  constructor(data: any) {
    Object.assign(this, data);
  }
}
