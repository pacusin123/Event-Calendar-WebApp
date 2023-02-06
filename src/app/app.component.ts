import { Component } from '@angular/core';
import { LoadingService } from './services/spinner-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loading$ = this.loader.loading$;
  title = 'Event-Calendar-WebApp';
  constructor(public loader: LoadingService) {

  }
}
