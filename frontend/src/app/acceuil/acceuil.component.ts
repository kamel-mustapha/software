import { Component, OnInit } from '@angular/core';
import { SharedService } from './shared.service';
import { HttpService } from './http.service';

@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.component.html',
  styleUrls: ['./acceuil.component.css'],
})
export class AcceuilComponent implements OnInit {
  constructor(private shared: SharedService, private http: HttpService) {}
  ngOnInit(): void {
    this.shared.caisse_subject.subscribe((value: any) => {
      this.selected_caisse = value;
    });

    this.shared.vente_subject.subscribe((value: any) => {
      this.total_price = value;
    });

    this.shared.set_vente(this.selected_caisse, []);
    this.http.get_produts().subscribe((products: any[]) => {
      this.all_products = products;
    });
  }

  total_caisses = [
    {
      name: 'caisse_1',
    },
    {
      name: 'caisse_2',
    },
    {
      name: 'caisse_3',
    },
    {
      name: 'caisse_4',
    },
  ];
  total_price: any = {};
  selected_caisse = 'caisse_1';
  all_products: any[] = [];
}
