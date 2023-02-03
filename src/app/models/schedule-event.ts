import { Schedule } from "./schedule";

export class ScheduleEvent {
  ScheduleEventId!: number;
  Name!: string;
  Description!: string;
  CreationDate!: Date;
  Place!: string;
  TypeEventEnum!: number;
  Schedule!: Schedule;

  constructor(data: any) {
    Object.assign(this, data);
  }
}
