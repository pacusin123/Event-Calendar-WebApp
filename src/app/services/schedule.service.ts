import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Schedule } from '../models/schedule';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { ScheduleEvent } from '../models/schedule-event';
@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  scheduleId: BehaviorSubject<any> = new BehaviorSubject(null);
  constructor(
    private httpService: HttpClient,
  ) { }

  saveSchedule(schedule: Schedule): Observable<Schedule> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
    if (schedule.ScheduleId)
      return this.httpService.put<Schedule>('https://localhost:7124/api/schedule/UpdateSchedule', JSON.stringify(schedule), httpOptions);
    else
      return this.httpService.post<Schedule>('https://localhost:7124/api/schedule/SaveSchedule', JSON.stringify(schedule), httpOptions);
  }

  getSchedules(): Observable<Array<Schedule>> {
    return this.httpService.get<Array<Schedule>>('https://localhost:7124/api/schedule/GetSchedules');
  }

  deleteSchedule(id: number): Observable<any> {
    return this.httpService.delete<any>('https://localhost:7124/api/schedule/deleteSchedule/' + id);
  }

  verifyScheduleExist(id: Number): Observable<boolean> {
    return this.httpService.get<boolean>('https://localhost:7124/api/schedule/verifyScheduleExist/' + id);
  }

  getScheduleByUserId(id: Number): Observable<Schedule> {
    return this.httpService.get<Schedule>('https://localhost:7124/api/schedule/getScheduleByUserId/' + id).pipe(
      map(p => {
        const temp = new Array<ScheduleEvent>();
        p.ScheduleEvents.forEach(element => {
          temp.push(new ScheduleEvent(element));
        });
        p.ScheduleEvents = temp;
        this.scheduleId.next(p.ScheduleId);
        return p
      })
    );
  }
}
