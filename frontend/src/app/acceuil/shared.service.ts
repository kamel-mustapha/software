import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor() {}

  caisse_subject = new Subject();
  vente_subject = new Subject();
  total_price: any = {
    caisse_1: 0,
    caisse_2: 0,
    caisse_3: 0,
    caisse_4: 0,
  };

  change_caisse(caisse: any) {
    return this.caisse_subject.next(caisse);
  }

  set_vente(caisse: any, products: []) {
    let caisse_price = 0;
    products.forEach((element: any) => {
      caisse_price += element.quantite * element.prix_vente;
    });
    this.total_price[caisse] = caisse_price;
    this.vente_subject.next(this.total_price);
  }
}
