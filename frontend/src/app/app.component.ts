import { Component } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [trigger('fade', [transition('void => *', [style({ opacity: 0 }), animate(200)]), transition('* => void', [animate(200, style({ opacity: 0 }))])])],
})
export class AppComponent {
  aria: any = {};
  dark_mode: boolean = false;
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
  }
}
