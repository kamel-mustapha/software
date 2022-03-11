import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.css'],
})
export class DateComponent implements OnInit {
  date: any;
  time: any;
  constructor() {}

  ngOnInit(): void {
    this.get_time();
    setInterval(() => {
      this.get_time();
    }, 60000);
  }

  get_time() {
    let date = new Date().toLocaleString().split(',');
    this.date = date[0];
    if (date[1][5] == ':') {
      this.time = date[1].substring(0, 5);
    } else {
      this.time = date[1].substring(0, 6);
    }
  }
}
