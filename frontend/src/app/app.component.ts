import { Component, OnInit } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('fade', [
      transition('void => *', [style({ opacity: 0 }), animate(200)]),
      transition('* => void', [animate(200, style({ opacity: 0 }))]),
    ]),
  ],
})
export class AppComponent implements OnInit {
  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.http.get<{}>(this.APIUrl + 'data/user/').subscribe((user: any) => {
      this.user = user;
      this.dark_mode = user.dark_mode;
    });
  }
  APIUrl = 'http://localhost:8000/';
  user: any = {};
  aria: any = {};
  dark_mode: boolean = this.user.dark_mode;
  navbar_elements = [
    { name: 'Acceuil', icon: 'house-chimney', link: '' },
    { name: 'Réglages', icon: 'gear', link: 'settings' },
    { name: 'Administration', icon: 'screwdriver-wrench' },
  ];
  show_aria(name: any) {
    this.aria[name] = true;
  }
  hide_aria(name: any) {
    this.aria[name] = false;
  }

  enable_dark_mode() {
    this.dark_mode = !this.dark_mode;
    let data = {
      dark_mode: this.dark_mode,
    };
    this.http.post(this.APIUrl + 'data/user/', data).subscribe();
  }
}
