import { Component, ViewChild } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventClickArg, EventSourceInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { EventComponent } from '../event/event.component';
import { MatDialog } from '@angular/material/dialog';
import { ScheduleService } from 'src/app/services/schedule.service';
import { Schedule } from 'src/app/models/schedule';
import { ScheduleComponent } from '../schedule/schedule.component';
import { SearchEventComponent } from '../event/search-event.component';
import interactionPlugin from '@fullcalendar/interaction';
import { ScheduleEvent } from 'src/app/models/schedule-event';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { TypeEventEnum } from 'src/app/models/type-event-enum';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { UserLoginService } from 'src/app/services/user-login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  @ViewChild('tt', { static: false }) mytooltip!: NgbTooltip;
  @ViewChild('calendar') calendarComponent!: FullCalendarComponent;
  @ViewChild('searchEventComponent') searchEventComponent!: SearchEventComponent

  events: any = [];
  eventSelected: ScheduleEvent = new ScheduleEvent({});
  calendarOptions: CalendarOptions = {
    headerToolbar: { center: 'dayGridMonth,dayGridWeek' },
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
    eventMouseEnter: this.openToolTip.bind(this),
    eventClick: this.editEvent.bind(this),
    select: this.handleDateSelect.bind(this),
  };
  schedule!: Schedule;
  userId: number;

  constructor(
    private matDialog: MatDialog,
    private userLoginService: UserLoginService,
    private scheduleService: ScheduleService
  ) {
    this.userId = this.userLoginService.currentUser.getValue().UserId as number;
    this.verifyScheduleExist();
  }

  verifyScheduleExist(): void {
    this.scheduleService.verifyScheduleExist(this.userId).subscribe(p => {
      if (p) {
        this.getScheduleByUserId();
      } else {
        this.createSchedule();
      }
    })
  }

  getScheduleByUserId(): void {
    this.scheduleService.getScheduleByUserId(this.userId).subscribe(p => {
      this.schedule = p;
      setTimeout(() => {
        this.searchEventComponent.filterByDateTimeInternal();
      }, 0);
      const events: EventSourceInput = [];
      p.ScheduleEvents.forEach(element => {
        const eventSchedule = {
          id: element.ScheduleEventId.toString(),
          title: element.Name,
          extendedProps: {
            description: element.Description,
            place: element.Place,
            typeEvent: element.TypeEventEnum,
            parentEventId: element.ParentEventId,
            colorEvent: element.TypeEventEnum == TypeEventEnum.Exclusive ? '#ff9900' : element.ParentEventId ? 'green' : 'blue',
            iconEvent: element.TypeEventEnum == TypeEventEnum.Exclusive ? 'star' : element.ParentEventId ? 'co_present' : 'share'
          },
          start: element.CreationDate,
          end: element.CreationDate
        };
        events.push(eventSchedule);
      });

      setTimeout(() => {
        this.calendarComponent.getApi().setOption("events", events);
      }, 0);
    });
  }

  openToolTip(info: any): void {
    this.eventSelected.ScheduleEventId = info.event.id;
    this.eventSelected.Name = info.event.title
    this.eventSelected.Description = info.event.extendedProps.description;
    this.eventSelected.CreationDate = info.event.start;
    this.eventSelected.TypeEventEnum = info.event.extendedProps.typeEvent;
    this.eventSelected.Place = info.event.extendedProps.place;
    this.eventSelected.ParentEventId = info.event.extendedProps.parentEventId;
  }

  handleDateSelect(selectInfo: DateSelectArg): void {
    const calendarApi = selectInfo.view.calendar;
    calendarApi.unselect();
    const scheduleEvent = new ScheduleEvent({ CreationDate: selectInfo.start })
    this.openEvent(scheduleEvent);
  }

  editEvent(clickInfo?: EventClickArg): void {
    const scheduleEvent = this.schedule.ScheduleEvents.find(e => e.ScheduleEventId.toString() === clickInfo?.event.id);
    this.openEvent(scheduleEvent);
  }

  openEvent(scheduleEvent?: ScheduleEvent): void {
    if (scheduleEvent?.ParentEventId)
      alert("Your cannot edit a event shared of other user");
    else {
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
  }

  createSchedule(): void {
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

  removeSchedule(): void {
    this.scheduleService.deleteSchedule(this.schedule.ScheduleId).subscribe(() => {
      this.schedule = new Schedule({});
      this.scheduleService.scheduleId.next(null);
      alert('The Schedule was deleted successfull');
    })
  }

}
