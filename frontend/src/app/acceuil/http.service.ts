import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  APIUrl = 'http://localhost:8000/';
  constructor(private http: HttpClient) {}

  get_produts = () => this.http.get<[]>(this.APIUrl + 'data/products/');
}
