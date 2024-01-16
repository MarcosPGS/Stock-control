import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { CategoryService } from 'src/app/core/services/category.service';
import { IGetAllCategoriesResponse } from 'src/app/core/models/category';
import { ProductService } from 'src/app/core/services/product.service';
import { ICreateProductRequest, IEditProductRequest, IEventAction, IGetAllProductsResponse } from 'src/app/core/models/products';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ProductsDataTransferService } from 'src/app/core/services/products-data-transfer.service';
import { ProductEvent } from 'src/app/core/enums/product';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void>  = new Subject(); // EVITANDO VAZAMENTO DE MEMORIA
  categoriesDatas: IGetAllCategoriesResponse[] = [];
  isAddProduct: boolean = true;
  productSelectedData!: IGetAllProductsResponse;
  products:IGetAllProductsResponse[] = [];
  productAction!: {
    event: IEventAction,
    products: IGetAllProductsResponse[]
  };
  formAddProduct = this.formBuilder.group({
    name: ['', Validators.required],
    price: ['', Validators.required],
    description: ['', Validators.required],
    category_id: ['', Validators.required],
    amount: [0, Validators.required],
  });

  formEditProduct = this.formBuilder.group({
    name: ['', Validators.required],
    price: ['', Validators.required],
    description: ['', Validators.required],
    category_id: ['', Validators.required],
    amount: [0, Validators.required],
  });

  renderDropdown = false;
  addProductEvent = ProductEvent.ADD_PRODUCT_EVENT;
  editProductEvent = ProductEvent.EDIT_PRODUCT_EVENT;
  saleProductEvent = ProductEvent.SALE_PRODUCT_EVENT;

  constructor(
    private categoryService: CategoryService,
    private messageService: MessageService,
    private router: Router,
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private ref: DynamicDialogConfig,
    private productsDataTransferService: ProductsDataTransferService){

  }
  ngOnInit(): void {
    this.productAction = this.ref.data;


   if (this.productAction?.event?.action === this.saleProductEvent) {
    this.getProductsDatas()
   }

    this.getAllCategories();
    this.renderDropdown = true;

  }

  getAllCategories(): void {
    this,this.categoryService.getAllCategories()
    .pipe(takeUntil(this. destroy$))
    .subscribe({
      next: (response) => {
        if (response.length > 0) {
          this.categoriesDatas = response;
          if (this.productAction?.event?.action === this.editProductEvent) {
            this.getProductSelectedData(this.productAction?.event?.id as string)
           }
        }
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: `${err?.error?.error}`,
         life: 2000,
        });
      }
    });
  }

  handleSubmitAddProduct(): void {
    if (this.formAddProduct?.valid) {
      const request: ICreateProductRequest = {
        name: this.formAddProduct.get('name')?.value as string,
        price: this.formAddProduct.get('price')?.value as string,
        description: this.formAddProduct.get('description')?.value as string,
        category_id: this.formAddProduct.get('category_id')?.value as string,
        amount: Number(this.formAddProduct.get('amount')?.value),
      }

      this.productService.createProduct(request)
      .pipe(takeUntil(this. destroy$))
      .subscribe({
        next: (response) => {
          if (response) {
           this.messageService.add({
             severity: 'success',
             summary: 'Success',
             detail: `Produto criado com sucesso!`,
            life: 2500,
           });
          }
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: `${err?.error?.error}`,
           life: 2000,
          });
        }
      });
      this.formAddProduct.reset();

    }

  }

  handleSubmitEditProduct(): void {
    if (this.formEditProduct?.valid && this.productAction.event.id) {
      const request: IEditProductRequest = {
        name: this.formEditProduct.get('name')?.value as string,
        price: this.formEditProduct.get('price')?.value as string,
        description: this.formEditProduct.get('description')?.value as string,
        product_id: this.productAction.event.id,
        amount: Number(this.formEditProduct.get('amount')?.value),
        category_id: this.formEditProduct.get('category_id')?.value as string,
      }

      this.productService.editProduct(request)
      .pipe(takeUntil(this. destroy$))
      .subscribe({
        next: (response) => {
           this.messageService.add({
             severity: 'success',
             summary: 'Success',
             detail: `Produto editado com sucesso!`,
            life: 2500,
           });
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: `${err?.error?.error}`,
           life: 2000,
          });
        }
      });
      this.formEditProduct.reset();

    }

  }

  getProductSelectedData(productId: string): void {
    const allProduct= this.productAction?.products;
    if (allProduct?.length > 0) {
      const productFiltered = allProduct.filter(
        (element) => element?.id === productId
      )
      if (productFiltered) {
        this.productSelectedData = productFiltered[0];
        this.formEditProduct.setValue({
          name: this.productSelectedData?.name,
          price:this.productSelectedData?.price,
          description: this.productSelectedData?.description,
          category_id: this.productSelectedData?.category?.id,
          amount: this.productSelectedData?.amount,
        })
      }
    }
  }

  getProductsDatas(): void {
    this.productService.getAllProducts()
    .pipe(takeUntil(this. destroy$))
    .subscribe({
      next: (response) => {
        if (response.length > 0) {
          this.products = response;
          this.products && this.productsDataTransferService.setProductsData(this.products);
        }
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: `${err?.error?.error}`,
         life: 2000,
        });
      }
    });
  }

  // EVITANDO VAZAMENTO DE MEMORIA
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
