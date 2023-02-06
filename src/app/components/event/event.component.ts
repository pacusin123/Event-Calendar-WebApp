import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ScheduleEvent } from 'src/app/models/schedule-event';
import { TypeEventEnum } from 'src/app/models/type-event-enum';
import { ScheduleEventService } from 'src/app/services/schedule-event.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  eventTypes: string[] = Object.keys(TypeEventEnum).filter(k => typeof TypeEventEnum[k as any] === "number");
  eventTypeSelected: string = TypeEventEnum[TypeEventEnum.Exclusive];
  eventForm !: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private scheduleEventService: ScheduleEventService,
    private dialogRef: MatDialogRef<EventComponent>,
    @Inject(MAT_DIALOG_DATA) public data: [ScheduleEvent, number]
  ) {
    if (this.data && this.data[0] && this.data[0].TypeEventName)
      this.eventTypeSelected = this.data[0].TypeEventName;
  }

  ngOnInit(): void {
    this.eventForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      creationDate: ['', Validators.required],
      place: ['', Validators.required],
      participants: ['', Validators.required],
      typeEvent: ['', Validators.required]
    })
    if (this.data && this.data[0]) {
      this.eventForm.controls['name'].setValue(this.data[0].Name)
      this.eventForm.controls['description'].setValue(this.data[0].Description)
      this.eventForm.controls['creationDate'].setValue(new Date(this.data[0].CreationDate))
      this.eventForm.controls['place'].setValue(this.data[0].Place)
      this.eventForm.controls['participants'].setValue(this.data[0].Participants)
      this.eventForm.controls['typeEvent'].setValue(this.data[0].TypeEventEnum)
    }
  }

  saveEvent(): void {
    if (this.eventForm.valid) {
      const eventSchedule = this.eventForm.value as any
      eventSchedule.creationDate = new Date(Date.UTC(
        eventSchedule.creationDate.getFullYear(),
        eventSchedule.creationDate.getMonth(),
        eventSchedule.creationDate.getDate(),
        eventSchedule.creationDate.getHours(),
        eventSchedule.creationDate.getMinutes()
      ));
      eventSchedule.TypeEventEnum = Number(TypeEventEnum[this.eventForm.controls['typeEvent'].value]);
      if (this.data && this.data[1])
        eventSchedule.ScheduleId = this.data[1];
      if (this.data && this.data[0] && this.data[0].ScheduleEventId)
        eventSchedule.ScheduleEventId = this.data[0].ScheduleEventId;
      eventSchedule.ParentEventId = null;
      this.scheduleEventService.saveScheduleEvent(eventSchedule).subscribe(() => {
        this.eventForm.reset();
        this.dialogRef.close('save');
      })
    } else {
      alert("fill in the required fields *")
    }
  }

}
