import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ScheduleEvent } from 'src/app/models/schedule-event';
import { ScheduleEventService } from 'src/app/services/schedule-event.service';
import { ScheduleService } from 'src/app/services/schedule.service';
import { EventComponent } from './event.component';

@Component({
  selector: 'app-search-event',
  templateUrl: './search-event.component.html',
  styleUrls: ['./event.component.css']
})
export class SearchEventComponent implements OnInit {

  displayedColumns: string[] = ['ScheduleEventId', 'Name', 'Description', 'Date', 'Place', 'TypeEvent', 'Actions'];
  dataSource!: MatTableDataSource<ScheduleEvent>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @Input() scheduleId!: number | null | undefined;
  @Input() showShared!: boolean;
  @Output() onAddSharedEvent: EventEmitter<any> = new EventEmitter;

  selectFilter: string = 'filterText';
  filterDateValue!: Date;
  filterTimeValue!: Date;
  constructor(
    private datePipe: DatePipe,
    private scheduleEventService: ScheduleEventService,
    private scheduleService: ScheduleService,
    private matDialog: MatDialog
  ) {

  }

  ngOnInit(): void {
    if (!this.showShared) {
      this.scheduleId = this.scheduleService.scheduleId.value;
      this.getAllScheduleEvents();
    }
  }

  getAllScheduleEvents() {
    this.scheduleEventService.getScheduleEventsByScheduleId(Number(this.scheduleId)).subscribe(p => {
      this.setDatatoTable(p);
    })
  }

  getScheduleEventShared() {
    this.scheduleEventService.getScheduleEventShared(Number(this.scheduleId)).subscribe(p => {
      this.setDatatoTable(p);

    })
  }

  setDatatoTable(p: ScheduleEvent[]) {
    this.dataSource = new MatTableDataSource(p);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: any): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  filterByDate(eventDate: any) {
    this.filterDateValue = eventDate.value;
    this.filterByDateTimeInternal();
  }

  filterByDateAndTime(eventTime: any) {
    this.filterTimeValue = eventTime.value;
    this.filterByDateTimeInternal()
  }


  createScheduleEvent(): void {
    this.openModalScheduleEvent();
  }

  editScheduleEvent(row: ScheduleEvent): void {
    this.openModalScheduleEvent(row)
  }

  deleteScheduleEvent(id: number) {
    this.scheduleEventService.deleteScheduleEvent(id).subscribe(() => this.getAllScheduleEvents())
  }

  addSharedScheduleEvent(row: ScheduleEvent) {
    row.ScheduleId = Number(this.scheduleId);
    row.ParentEventId = row.ScheduleEventId;
    row.ScheduleEventId = 0;
    this.scheduleEventService.saveScheduleEvent(row).subscribe(() => {
      this.onAddSharedEvent.emit();
    })
  }

  filterByDateTimeInternal(): void {
    if (this.filterDateValue) {
      const dateParam = new Date(Date.UTC(
        this.filterDateValue.getFullYear(),
        this.filterDateValue.getMonth(),
        this.filterDateValue.getDate(),
        this.filterTimeValue ? this.filterTimeValue.getHours() : this.filterDateValue.getHours(),
        this.filterTimeValue ? this.filterTimeValue.getMinutes() : this.filterDateValue.getMinutes(),
      ));

      if (this.showShared) {
        this.scheduleEventService.getScheduleEventsSharedByDate(Number(this.scheduleId), dateParam, !!this.filterTimeValue).subscribe(p => {
          this.setDatatoTable(p);
        });
      } else {
        this.scheduleEventService.getScheduleEventsByDate(dateParam, !!this.filterTimeValue).subscribe(p => {
          this.setDatatoTable(p);
        });
      }
    }
    else if (this.showShared) {
      this.getScheduleEventShared();

    } else {
      this.getAllScheduleEvents();
    }
  }

  private openModalScheduleEvent(row?: ScheduleEvent) {
    this.matDialog.open(EventComponent, {
      width: '30%',
      data: [row, this.scheduleId],
      autoFocus: false
    }).afterClosed().subscribe(val => {
      if (val === 'save') {
        this.getAllScheduleEvents();
      }
    });
  }
}
