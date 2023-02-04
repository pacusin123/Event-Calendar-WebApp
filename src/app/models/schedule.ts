import { ScheduleEvent } from "./schedule-event";
import { User } from "./user";

export class Schedule {
  ScheduleId!: number;
  Name!: string;
  UserId!: number;
  User!: User;
  ScheduleEvents!: Array<ScheduleEvent>;

  constructor(data: any) {
    Object.assign(this, data);
  }
}
