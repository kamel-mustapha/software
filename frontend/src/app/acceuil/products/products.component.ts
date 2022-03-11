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
    if (this.sold_products[this.selected_caisse].includes(product)) {
      this.sold_products[this.selected_caisse].find((sold_element: any) => sold_element.id == product.id).quantite++;
    } else {
      this.sold_products[this.selected_caisse].push(product);
      this.show_suggestions = false;
    }
    this.show_suggestions = false;
    this.shared.set_vente(this.selected_caisse, this.sold_products[this.selected_caisse]);
  }

  suggestions_show(form: NgForm): void {
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
        if (element.nom.startsWith(form.value.input_search) || element.nom.toLowerCase().startsWith(form.value.input_search) || element.nom.toUpperCase().startsWith(form.value.input_search)) {
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

  submit_search(form: NgForm): void {
    let searched_product = this.all_products.find((element: any) => element.id == this.suggestion_selected_id);
    this.add_to_sold_products(searched_product);
    form.reset();
  }

  select_suggestion(id: number): void {
    this.selected_suggestions = {};
    this.suggestion_selected_id = id;
    this.selected_suggestions[id] = true;
  }

  delete_product(id: any, form: NgForm): void {
    this.sold_products[this.selected_caisse] = this.sold_products[this.selected_caisse].filter((element: any) => element.id !== id);
    form.reset();
  }

  change_quantite(id: number, event: any) {
    this.sold_products[this.selected_caisse].find((product: any) => (product.id = id)).quantite = event.target.value;
    this.shared.set_vente(this.selected_caisse, this.sold_products[this.selected_caisse]);
  }
}
