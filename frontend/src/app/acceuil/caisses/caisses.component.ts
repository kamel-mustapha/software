import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-caisses',
  templateUrl: './caisses.component.html',
  styleUrls: ['./caisses.component.css'],
})
export class CaissesComponent implements OnInit {
  constructor(private shared: SharedService) {}
  @Input() total_caisses: any;
  @Input() selected_caisse: any;

  ngOnInit(): void {}

  change_caisse(caisse: any) {
    this.shared.change_caisse(caisse);
  }
}
