import { Injectable } from '@angular/core';
import { BehaviorSubject, map, take } from 'rxjs';
import { IGetAllProductsResponse } from '../models/products';

@Injectable({
  providedIn: 'root',
})
export class ProductsDataTransferService {
  public productsDataEmitter$ = new BehaviorSubject<
    IGetAllProductsResponse[] | null
  >(null);
  public productsDatas: IGetAllProductsResponse[] = [];

  constructor(){}

  setProductsData(products: IGetAllProductsResponse[]): void {
    if (products) {
      this.productsDataEmitter$.next(products);
      this.getProductsData();
    }
  }
  getProductsData() {
    this.productsDataEmitter$
    .pipe(
      take(1),
      map((data)=> data?.filter((product) => product?.amount > 0))
    )
    .subscribe({
      next: (response) =>{
        if (response) {
          this.productsDatas = response;
        }
      }
    });
    return this.productsDatas;
  }
}
