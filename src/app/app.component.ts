import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'client';

  constructor(private http: HttpClient, public auth: AuthService, @Inject(DOCUMENT) public document: Document) { }

  callAPI(){
    this.http.get('/api/message').subscribe(
    {
      next: (resp: any) => { console.log('resp', resp.data) }
    });
  }
}
