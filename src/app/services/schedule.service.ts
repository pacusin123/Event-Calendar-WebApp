import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Schedule } from '../models/schedule';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { ScheduleEvent } from '../models/schedule-event';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  baseUrl = environment.baseUrl;
  scheduleId: BehaviorSubject<any> = new BehaviorSubject(null);
  constructor(
    private httpService: HttpClient,
  ) { }

  saveSchedule(schedule: Schedule): Observable<Schedule> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
    if (schedule.ScheduleId)
      return this.httpService.put<Schedule>(this.baseUrl + '/schedule/UpdateSchedule', JSON.stringify(schedule), httpOptions);
    else
      return this.httpService.post<Schedule>(this.baseUrl + '/schedule/SaveSchedule', JSON.stringify(schedule), httpOptions);
  }

  getSchedules(): Observable<Array<Schedule>> {
    return this.httpService.get<Array<Schedule>>(this.baseUrl + '/schedule/GetSchedules');
  }

  deleteSchedule(id: number): Observable<any> {
    return this.httpService.delete<any>(this.baseUrl + '/schedule/deleteSchedule/' + id);
  }

  verifyScheduleExist(id: Number): Observable<boolean> {
    return this.httpService.get<boolean>(this.baseUrl + '/schedule/verifyScheduleExist/' + id);
  }

  getScheduleByUserId(id: Number): Observable<Schedule> {
    return this.httpService.get<Schedule>(this.baseUrl + '/schedule/getScheduleByUserId/' + id).pipe(
      map(p => {
        const temp = new Array<ScheduleEvent>();
        p.ScheduleEvents?.forEach(element => {
          temp.push(new ScheduleEvent(element));
        });
        p.ScheduleEvents = temp;
        this.scheduleId.next(p.ScheduleId);
        return p
      })
    );
  }
}
