import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { Products } from '../../models/products/products';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};
@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private httpClient: HttpClient) {}

  getAllProducts() {
    return this.httpClient.get<any>(`${environment.baseUrl}products/activated`);
  }

  getLatestProducts() {
    return this.httpClient.get<any>(`${environment.baseUrl}latest-products/`);
  }

  addProduct(product: Products, token: string) {
    token = 'token ' + token;
    return this.httpClient.post(`${environment.baseUrl}products`, product, {
      headers: new HttpHeaders().set('Authorization', token),
      observe: 'response',
    });
  }

  updateProduct(id: number, data: any, token: string) {
    token = 'token ' + token;
    return this.httpClient.put<any>(`${environment.baseUrl}products/${id}`, data, {
      headers: new HttpHeaders().set('Authorization', token),
      observe: 'response',
    });
  }

  getCurrentData(id: any) {
    return this.httpClient.get(`${environment.baseUrl}products/${id}`);
  }

  deleteProduct(id: number, token: string) {
    token = 'token ' + token;
    return this.httpClient.delete(`${environment.baseUrl}products/${id}`, {
      headers: new HttpHeaders().set('Authorization', token),
      observe: 'response',
    });
  }
}
