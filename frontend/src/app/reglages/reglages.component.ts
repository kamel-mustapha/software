import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reglages',
  templateUrl: './reglages.component.html',
  styleUrls: ['./reglages.component.css'],
})
export class ReglagesComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.navigate(['/settings/base']);
  }
}
