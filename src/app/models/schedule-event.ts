import { Schedule } from "./schedule";
import { TypeEventEnum } from "./type-event-enum";

export class ScheduleEvent {
  ScheduleEventId!: number;
  Name!: string;
  Description!: string;
  CreationDate!: Date;
  Place!: string;
  TypeEventEnum!: number;
  Schedule!: Schedule;
  ScheduleId!: number;
  ParentEventId!: number |  null;

  get TypeEventName() : string {
    return TypeEventEnum[this.TypeEventEnum];
  }


  constructor(data: any) {
    Object.assign(this, data);
  }
}
