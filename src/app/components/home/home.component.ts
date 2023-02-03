import { Component } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { EventComponent } from '../event/event.component';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { ScheduleService } from 'src/app/services/schedule.service';
import { Schedule } from 'src/app/models/schedule';
import { ScheduleComponent } from '../schedule/schedule.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  events = [
    {
      title: 'Present', date: '2023-02-01', color: '#0000FF'
    }
  ];
  existSchedule: boolean = false;
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin],
    events: this.events,
    eventClick: this.showDayEvents.bind(this)
  };
  schedule: Schedule = new Schedule({});
  userId: number;
  constructor(
    private matDialog: MatDialog,
    private userService: UserService,
    private scheduleService: ScheduleService
  ) {
    this.userId = this.userService.currentUser.getValue().UserId as number;
    this.verifyScheduleExist();
  }

  verifyScheduleExist() {

    this.scheduleService.verifyScheduleExist(this.userId).subscribe(p => {
      if (p) {
        this.existSchedule = true;
        this.getScheduleByUserId();
      } else {
        this.createSchedule();
      }
    })
  }

  getScheduleByUserId() {
    this.scheduleService.getScheduleByUserId(this.userId).subscribe(p => {
      this.schedule = p;
      this.existSchedule = true;
    })
  }

  showDayEvents() {
    this.matDialog.open(EventComponent, {
      width: '30%',
      data: "John",
      autoFocus: false
    });
  }

  createSchedule() {
    this.matDialog.open(ScheduleComponent, {
      width: '30%',
      data: new Schedule({ UserId: this.userId }),
      autoFocus: false
    }).afterClosed().subscribe(val => {
      if (val === 'save') {
        this.getScheduleByUserId();
      }
    });
  }

}
