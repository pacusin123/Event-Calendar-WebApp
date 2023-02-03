import { User } from "./user";

export class Schedule {
  ScheduleId!: number;
  Name!: string;
  UserId!: number;
  User!: User;
  ScheduleEvents!: Array<Event>;

  constructor(data: any) {
    Object.assign(this, data);
  }
}
