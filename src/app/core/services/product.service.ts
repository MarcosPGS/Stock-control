import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environments';
import { CookieService } from 'ngx-cookie-service';
import { Observable, map } from 'rxjs';
import { ICreateProductRequest, ICreateProductResponse, IDeleteProductResponse, IEditProductRequest, IGetAllProductsResponse } from '../models/products';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private API_URL = environment.API_URL;
  private JWT_TOKEN = this.cookieService.get('USER_INFO');
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.JWT_TOKEN}`,
    })
  };

  constructor(private http: HttpClient, private cookieService: CookieService) { }


  getAllProducts(): Observable<IGetAllProductsResponse[]>{
    return this.http.get<IGetAllProductsResponse[]>(`${this.API_URL}/products`, this.httpOptions)
    .pipe(map((product)=> product.filter((data) => data?.amount > 0)));
  }
  deleteProduct(product_id: string): Observable<IDeleteProductResponse> {
    return this.http.delete<IDeleteProductResponse>(`${this.API_URL}/product/delete`, {...this.httpOptions, params: {product_id: product_id} });
  }
  createProduct(product: ICreateProductRequest): Observable<ICreateProductResponse> {
    return this.http.post<ICreateProductResponse>(`${this.API_URL}/product`,product, this.httpOptions );
  }

  editProduct(product: IEditProductRequest): Observable<void> {
    return this.http.put<void>(`${this.API_URL}/product/edit`,product, this.httpOptions );
  }
}
