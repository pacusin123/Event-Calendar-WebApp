import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ScheduleEvent } from '../models/schedule-event';
import { map, Observable } from 'rxjs';
import { ScheduleEventParameters } from '../models/schedule-event-parameters';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ScheduleEventService {

  baseUrl = environment.baseUrl;
  constructor(
    private httpService: HttpClient,
  ) { }

  saveScheduleEvent(scheduleEvent: ScheduleEvent): Observable<ScheduleEvent> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
    if (scheduleEvent.ScheduleEventId)
      return this.httpService.put<ScheduleEvent>(this.baseUrl + '/scheduleEvent/UpdateScheduleEvent', JSON.stringify(scheduleEvent), httpOptions);
    else
      return this.httpService.post<ScheduleEvent>(this.baseUrl + '/scheduleEvent/SaveScheduleEvent', JSON.stringify(scheduleEvent), httpOptions);
  }

  getScheduleEvents(): Observable<Array<ScheduleEvent>> {
    return this.httpService.get<Array<ScheduleEvent>>(this.baseUrl + '/scheduleEvent/GetScheduleEvents');
  }

  deleteScheduleEvent(id: number): Observable<any> {
    return this.httpService.delete<any>(this.baseUrl + '/scheduleEvent/deleteScheduleEvent/' + id);
  }

  verifyScheduleEventExist(id: Number): Observable<boolean> {
    return this.httpService.get<boolean>(this.baseUrl + '/scheduleEvent/verifyScheduleEventExist/' + id);
  }

  getScheduleEventsByScheduleId(id: Number): Observable<Array<ScheduleEvent>> {
    return this.httpService.get<Array<ScheduleEvent>>(this.baseUrl + '/scheduleEvent/getScheduleEventsByScheduleId/' + id).pipe(
      map(p => {
        const temp = new Array<ScheduleEvent>();
        p.forEach(element => {
          temp.push(new ScheduleEvent(element));
        });
        return temp;
      })
    );
  }

  getScheduleEventShared(id: Number): Observable<Array<ScheduleEvent>> {
    return this.httpService.get<Array<ScheduleEvent>>(this.baseUrl + '/scheduleEvent/getScheduleEventShared/' + id).pipe(
      map(p => {
        const temp = new Array<ScheduleEvent>();
        p.forEach(element => {
          temp.push(new ScheduleEvent(element));
        });
        return temp;
      })
    );
  }

  getScheduleEventsByDate(eventDate: Date, withTime: boolean): Observable<Array<ScheduleEvent>> {
    const params: HttpParams = new HttpParams()
      .append('eventDate', eventDate.toDateString())
      .append('withTime', withTime.toString());
    return this.httpService.post<Array<ScheduleEvent>>(this.baseUrl + '/scheduleEvent/GetScheduleEventsByDate', null, { params }).pipe(
      map(p => {
        const temp = new Array<ScheduleEvent>();
        p.forEach(element => {
          temp.push(new ScheduleEvent(element));
        });
        return temp;
      })
    );
  }

  getScheduleEventsSharedByDate(scheduleId: Number, eventDate: Date, withTime: boolean): Observable<Array<ScheduleEvent>> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
    const scheduleEventParameters: ScheduleEventParameters = ({
      ScheduleId: scheduleId,
      EventDate: eventDate,
      WithTime: withTime
    });
    return this.httpService.post<Array<ScheduleEvent>>(this.baseUrl + '/scheduleEvent/getScheduleEventsSharedByDate', JSON.stringify(scheduleEventParameters), httpOptions).pipe(
      map(p => {
        const temp = new Array<ScheduleEvent>();
        p.forEach(element => {
          temp.push(new ScheduleEvent(element));
        });
        return temp;
      })
    );
  }
}
