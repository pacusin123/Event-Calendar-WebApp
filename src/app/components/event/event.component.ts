import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ScheduleEvent } from 'src/app/models/schedule-event';
import { TypeEventEnum } from 'src/app/models/type-event-enum';
import { ScheduleEventService } from 'src/app/services/schedule-event.service';
import * as moment from 'moment';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  eventTypes = Object.keys(TypeEventEnum).filter(k => typeof TypeEventEnum[k as any] === "number");
  eventTypeSelected = "Private"
  eventForm !: FormGroup;

  @ViewChild('picker') picker: any;

  date!: moment.Moment;
  disabled = false;
  showSpinners = true;
  showSeconds = false;
  touchUi = false;
  enableMeridian = false;
  minDate!: moment.Moment;
  maxDate!: moment.Moment;
  stepHour = 1;
  stepMinute = 1;
  stepSecond = 1;
  color: ThemePalette = 'primary';

  formGroup = new FormGroup({
    date: new FormControl(null, [Validators.required]),
    date2: new FormControl(null, [Validators.required])
  })
  dateControl = new FormControl(new Date(2021, 9, 4, 5, 6, 7));
  dateControlMinMax = new FormControl(new Date());


  options = [
    { value: true, label: 'True' },
    { value: false, label: 'False' }
  ];

  listColors = ['primary', 'accent', 'warn'];

  stepHours = [1, 2, 3, 4, 5];
  stepMinutes = [1, 5, 10, 15, 20, 25];
  stepSeconds = [1, 5, 10, 15, 20, 25];

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
      typeEvent: ['', Validators.required]
    })
    if (this.data && this.data[0]) {
      this.eventForm.controls['name'].setValue(this.data[0].Name)
      this.eventForm.controls['description'].setValue(this.data[0].Description)
      this.eventForm.controls['creationDate'].setValue(this.data[0].CreationDate)
      this.eventForm.controls['place'].setValue(this.data[0].Place)
      this.eventForm.controls['typeEvent'].setValue(this.data[0].TypeEventEnum)
    }
  }

  saveEvent() {
    if (this.eventForm.valid) {
      const eventSchedule = this.eventForm.value as ScheduleEvent
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
    }
  }

}
