export class ScheduleEventParameters {
  ScheduleId!: Number;
  EventDate!: Date;
  WithTime!: boolean;
  constructor(obj: any) {
    this.ScheduleId = obj.ScheduleId;
    this.EventDate = obj.EventDate;
    this.WithTime = obj.WithTime;
  }
}
