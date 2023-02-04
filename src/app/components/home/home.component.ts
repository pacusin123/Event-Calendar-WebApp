import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventApi, EventClickArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { EventComponent } from '../event/event.component';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { ScheduleService } from 'src/app/services/schedule.service';
import { Schedule } from 'src/app/models/schedule';
import { ScheduleComponent } from '../schedule/schedule.component';
import { SearchEventComponent } from '../event/search-event.component';
import interactionPlugin from '@fullcalendar/interaction';
import { ScheduleEvent } from 'src/app/models/schedule-event';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  @ViewChild('searchEventComponent') searchEventComponent!: SearchEventComponent
  events: any = [];
  existSchedule: boolean = false;
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [
      interactionPlugin,
      dayGridPlugin,
    ],
    selectable: true,
    weekends: true,
    editable: true,
    selectMirror: true,
    dayMaxEvents: true,
    eventClick: this.editEvent.bind(this),
    select: this.handleDateSelect.bind(this),
  };
  schedule!: Schedule;
  userId: number;
  constructor(
    private matDialog: MatDialog,
    private userService: UserService,
    private scheduleService: ScheduleService,
    private changeDetector: ChangeDetectorRef
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
      setTimeout(() => {
        this.searchEventComponent.getScheduleEventShared();
      }, 0);
      const events: any = [];
      p.ScheduleEvents.forEach(element => {
        const eventSchedule = {
          id: element.ScheduleEventId,
          title: element.Name,
          description: element.Description,
          start: element.CreationDate,
        };
        events.push(eventSchedule);
        this.existSchedule = true;
      });

      this.calendarOptions.events = events;
      this.calendarOptions.eventBackgroundColor = '#3f51b5';
    });
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    const calendarApi = selectInfo.view.calendar;
    calendarApi.unselect();
    const scheduleEvent = new ScheduleEvent({ CreationDate: selectInfo.start })
    this.openEvent(scheduleEvent);
  }

  handleEvents(events: EventApi[]) {
    this.events = events;
    this.changeDetector.detectChanges();
  }

  editEvent(clickInfo?: EventClickArg) {
    const scheduleEvent = this.schedule.ScheduleEvents.find(e => e.ScheduleEventId.toString() === clickInfo?.event.id);
    this.openEvent(scheduleEvent);
  }

  openEvent(scheduleEvent?: ScheduleEvent) {
    this.matDialog.open(EventComponent, {
      width: '30%',
      data: [scheduleEvent, this.schedule.ScheduleId],
      autoFocus: false
    }).afterClosed().subscribe(val => {
      if (val === 'save') {
        this.getScheduleByUserId();
      }
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
