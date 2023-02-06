import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Schedule } from 'src/app/models/schedule';
import { ScheduleService } from 'src/app/services/schedule.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  scheduleForm !: FormGroup;
  constructor(
    private scheduleService: ScheduleService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<ScheduleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Schedule
  ) {
  }

  ngOnInit(): void {
    this.scheduleForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  createSchedule() {
    if (this.scheduleForm.valid) {
      var schedule = this.scheduleForm.value as Schedule;
      if (this.data) {
        schedule.ScheduleId = this.data.ScheduleId;
        schedule.UserId = this.data.UserId;
      }

      this.scheduleService.saveSchedule(schedule).subscribe({});
      this.scheduleForm.reset();
      this.dialogRef.close('save');
    } else {
      alert("fill in the required fields *")
    }
  }

}
