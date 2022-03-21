import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  constructor(private shared: SharedService) {}
  ngOnInit(): void {
    for (let i = 1; i <= 4; i++) {
      this.sold_products[`caisse_${i}`] = [];
    }
  }

  // Variables
  @Input() all_products: any[] = [];
  @Input() selected_caisse: any;
  sold_products: any = {};
  searched_product: any = [];
  show_suggestions: boolean = false;
  selected_suggestions: any = {};
  suggestions_products: any = [];
  suggestion_selected_id: any;

  // functions
  add_to_sold_products(product: any) {
    let is_product_in_sold = this.sold_products[this.selected_caisse].find(
      (element: any) => element.id == product.id
    );
    if (is_product_in_sold) {
      this.sold_products[this.selected_caisse].find(
        (sold_element: any) => sold_element.id == product.id
      ).quantite++;
    } else {
      this.sold_products[this.selected_caisse].push({ ...product });
      this.show_suggestions = false;
    }
    this.show_suggestions = false;
    this.shared.set_vente(this.selected_caisse, this.sold_products[this.selected_caisse]);
  }

  suggestions_show(form: NgForm): void {
    console.log(this.all_products);
    if (form.value.input_search.length > 0) {
      this.all_products.forEach((element: any) => {
        if (element.code_bar == form.value.input_search) {
          form.reset();
          this.show_suggestions = false;
          this.add_to_sold_products(element);
          return;
        }
      });
      this.suggestions_products = this.all_products.filter((element: any) => {
        if (
          element.nom.startsWith(form.value.input_search) ||
          element.nom.toLowerCase().startsWith(form.value.input_search) ||
          element.nom.toUpperCase().startsWith(form.value.input_search) ||
          (element.reference && element.reference.startsWith(form.value.input_search))
        ) {
          return true;
        } else {
          return false;
        }
      });
      this.show_suggestions = true;
    } else {
      this.show_suggestions = false;
    }
  }

  submit_search(id: number, form: NgForm): void {
    let searched_product = this.all_products.find((element: any) => element.id == id);
    this.add_to_sold_products(searched_product);
    form.reset();
    this.shared.set_vente(this.selected_caisse, this.sold_products[this.selected_caisse]);
  }

  delete_product(id: any, form: NgForm): void {
    this.sold_products[this.selected_caisse] = this.sold_products[this.selected_caisse].filter(
      (element: any) => element.id !== id
    );
    form.reset();
    this.shared.set_vente(this.selected_caisse, this.sold_products[this.selected_caisse]);
  }

  change_quantite(id: number, event: any) {
    this.sold_products[this.selected_caisse].find((product: any) => product.id == id).quantite =
      event.target.value;
    this.shared.set_vente(this.selected_caisse, this.sold_products[this.selected_caisse]);
  }
}
