import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get('https://www.mocky.io/v2/5eda4003330000740079ea60');
  }
}
