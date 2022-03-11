import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css'],
})
export class ClientsComponent implements OnInit {
  all_clients = [
    {
      id: 1,
      nom: 'Kamel Mustapha',
      produits: 25,
      total: 3500,
      remise: 500,
      num_tel: '0672447580',
    },
    {
      id: 2,
      nom: 'Kamel Mustapha',
      produits: 25,
      total: 3500,
      remise: 500,
      num_tel: '0672447580',
    },
    {
      id: 3,
      nom: 'Kamel Mustapha',
      produits: 25,
      total: 3500,
      remise: 500,
      num_tel: '0672447580',
    },
  ];

  selected_client: any = {};
  is_client: boolean = false;
  client_search: any;
  constructor() {}

  ngOnInit(): void {}

  select_client(id: number) {
    this.selected_client = {};
    this.selected_client[id] = true;
  }

  show_client() {
    if (this.client_search.length >= 1) {
      this.is_client = true;
    } else {
      this.is_client = false;
      this.selected_client = {};
    }
  }
}
