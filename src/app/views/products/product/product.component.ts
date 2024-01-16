import { ProductsDataTransferService } from 'src/app/core/services/products-data-transfer.service';
import { ProductService } from 'src/app/core/services/product.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { IDeleteProductAction, IEventAction, IGetAllProductsResponse } from 'src/app/core/models/products';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ProductFormComponent } from '../product-form/product-form.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void>  = new Subject(); // EVITANDO VAZAMENTO DE MEMORIA
  products: IGetAllProductsResponse[] = [];
  private ref!: DynamicDialogRef;
  constructor(
    private productService: ProductService,
    private productsDataTransferService: ProductsDataTransferService,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private dialogService: DialogService) {

  }
  ngOnInit(): void {
    this.getServiceProductsData();
  }


  getServiceProductsData(): void {
    const productsLoaded = this.productsDataTransferService.getProductsData();

    if(productsLoaded.length > 0){
      this.products = productsLoaded;
    } else this.getProductsDatas();
  }

  getProductsDatas(): void {
    this.productService.getAllProducts()
    .pipe(takeUntil(this. destroy$))
    .subscribe({
      next: (response) => {
        if (response.length > 0) {
          this.products = response;
        }
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: `${err?.error?.error}`,
         life: 2000,
        });
        this.router.navigate(['/dashboard']);
      }
    });
  }
  handleProductAction(event: IEventAction): void {
    if (event) {
      this.ref = this.dialogService.open(ProductFormComponent, {
        header: event?.action,
        width: '70%',
        contentStyle: {overflow: 'auto'},
        baseZIndex: 10000,
        maximizable: true,
        data: {
          event: event,
          products: this.products
        }
      });

      this.ref.onClose
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => { this.getProductsDatas();}
      })
    }

  }
  handleDeleteProduct(event: IDeleteProductAction): void {
    if (event) {
      this.confirmationService.confirm({
        message: `Confirma a exclusão do produto: ${event?.productName}?`,
        header: 'Confirmação de exclusão',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Sim',
        rejectLabel: 'Não',
        accept: () => this.deleteProduct(event?.product_id)
      });

    }
  }
  deleteProduct(product_id: string) {
    if (product_id) {
      this.productService.deleteProduct(product_id)
      .pipe(takeUntil(this. destroy$))
      .subscribe({
        next: (response) =>{
          if (response) {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: `Produto removido com sucesso!`,
              life: 2000,
            });
            this.getProductsDatas();
          }
        },error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: `${err?.error?.error}`,
           life: 2000,
          });
        },
      })

    }
  }
  // EVITANDO VAZAMENTO DE MEMORIA
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
