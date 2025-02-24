import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/Product.model';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://localhost:7038';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl+'/ObtenerProductos');
  }


  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl+'/CrearProductos', product);
  }


}
