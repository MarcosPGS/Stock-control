import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewsRoutingModule } from './views-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedsModule } from '../shareds/shareds.module';
import { SignInComponent } from './login/sign-in/sign-in.component';
import { CreateLoginComponent } from './login/create-login/create-login.component';
import { HttpClientModule } from '@angular/common/http';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { ProductComponent } from './products/product/product.component';
import { ProductTableComponent } from './products/product-table/product-table.component';
import { ConfirmationService } from 'primeng/api';
import { ProductFormComponent } from './products/product-form/product-form.component';
import { DialogService } from 'primeng/dynamicdialog';


@NgModule({
  declarations: [
    SignInComponent,
    CreateLoginComponent,
    DashboardHomeComponent,
    ProductComponent,
    ProductTableComponent,
    ProductFormComponent
  ],
  imports: [
    CommonModule,
    ViewsRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    SharedsModule,
  ],
  providers: [ ConfirmationService, DialogService ]
})
export class ViewsModule { }
