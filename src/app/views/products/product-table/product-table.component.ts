import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductEvent } from 'src/app/core/enums/product';
import { IDeleteProductAction, IEventAction, IGetAllProductsResponse } from 'src/app/core/models/products';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss']
})
export class ProductTableComponent {
  @Input() products: IGetAllProductsResponse[] = [];
  @Output() productEvent = new EventEmitter<IEventAction>();
  @Output() deleteProductEvent = new EventEmitter<IDeleteProductAction>();

  productSelected!: IGetAllProductsResponse;
  addProductEvent = ProductEvent.ADD_PRODUCT_EVENT;
  editProductEvent = ProductEvent.EDIT_PRODUCT_EVENT;

  handleProductEvent(action: string, id?: string): void {
    if (action && action !== '') {
      const productEventData = id && id !== '' ? {action, id} : { action };
      this.productEvent.emit(productEventData);
    }
  }
  handleDeleteProduct(product_id: string, productName: string): void {
    if (product_id !== '' && productName !== '') {
        this.deleteProductEvent.emit({product_id, productName});
    }
  }

}
