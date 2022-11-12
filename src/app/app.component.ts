import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'client';

  constructor(private http: HttpClient) {
    this.http.get('/api/message').subscribe(
    {
      next: (resp: any) => { console.log('resp', resp.data) }
    });
  }
}
