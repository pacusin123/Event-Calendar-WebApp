import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Schedule } from 'src/app/models/schedule';
import { ScheduleService } from 'src/app/services/schedule.service';
import { ScheduleComponent } from './schedule.component';

@Component({
  selector: 'app-search-schedule',
  templateUrl: './search-schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class SearchScheduleComponent {

  displayedColumns: string[] = ['ScheduleId', 'Name','Actions'];
  dataSource!: MatTableDataSource<Schedule>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private scheduleService: ScheduleService,
    private matDialog: MatDialog
  ) {
    this.getAllSchedules();
  }

  getAllSchedules() {
    this.scheduleService.getSchedules().subscribe(p => {
      this.dataSource = new MatTableDataSource(p);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  createSchedule(): void {
    this.openModalSchedule();
  }

  editSchedule(row: Schedule): void {
    this.openModalSchedule(row)
  }

  deleteSchedule(id: number) {
    this.scheduleService.deleteSchedule(id).subscribe(() => this.getAllSchedules())
  }


  private openModalSchedule(row?: Schedule) {
    this.matDialog.open(ScheduleComponent, {
      width: '30%',
      data: row,
      autoFocus: false
    }).afterClosed().subscribe(val => {
      if (val === 'save') {
        this.getAllSchedules();
      }
    });
  }

}
