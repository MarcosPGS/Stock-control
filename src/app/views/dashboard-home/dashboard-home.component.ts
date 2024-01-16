import { Component, OnDestroy, OnInit } from '@angular/core';
import { Chart, ChartData, ChartOptions } from 'chart.js';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { IGetAllProductsResponse } from 'src/app/core/models/products';
import { ProductService } from 'src/app/core/services/product.service';
import { ProductsDataTransferService } from 'src/app/core/services/products-data-transfer.service';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.scss']
})
export class DashboardHomeComponent implements OnInit, OnDestroy{
  private readonly destroy$: Subject<void>  = new Subject();
  products: IGetAllProductsResponse[] = [];
  public productsChartDatas!: ChartData;
  public productsChartOptions!: ChartOptions;

  constructor(
    private productService: ProductService,
    private messageService: MessageService,
    private productsDataTransferService: ProductsDataTransferService){

  }

  ngOnInit(): void {
    this.getProductsDatas();

  }

  getProductsDatas(): void {
    this.productService.getAllProducts()
    .pipe(takeUntil(this. destroy$))
    .subscribe({
      next: (response) => {
        if (response.length > 0) {
          this.products = response;
          this.productsDataTransferService.setProductsData(this.products as IGetAllProductsResponse[]);
          this.setProductsChartConfig();

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

  setProductsChartConfig(): void {
    if (this.products.length > 0) {

      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');
      const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
      const surfaceBorder = documentStyle.getPropertyValue('--surface-border');


      this.productsChartDatas = {
        labels: this.products.map((element) => element?.name),
        datasets: [
            {
                label: 'Quantidade',
                backgroundColor: documentStyle.getPropertyValue('--indigo-400'),
                borderColor: documentStyle.getPropertyValue('--indigo-400'),
                hoverBackgroundColor: documentStyle.getPropertyValue('--indigo-500'),
                data: this.products.map((element) => element?.amount),
            }
        ]
    };

    this.productsChartOptions =
    {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
        plugins: {
            legend: {
                labels: {
                    color: textColor
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    color: textColorSecondary,
                },
                grid: {
                    color: surfaceBorder,
                }
            },
            x: {
                ticks: {
                    color: textColorSecondary,
                    font: {
                      weight: 500
                    }
                },
                grid: {
                    color: surfaceBorder,
                }
            }
        }
    };
    }
}


  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
