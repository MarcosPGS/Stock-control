import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './login/sign-in/sign-in.component';
import { CreateLoginComponent } from './login/create-login/create-login.component';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { AuthGuardService } from '../core/guards/auth-guard.service';
import { ProductComponent } from './products/product/product.component';
import { ProductFormComponent } from './products/product-form/product-form.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardHomeComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'signin',
    component: SignInComponent
  },
  {
    path: 'create-login',
    component: CreateLoginComponent
  },
  {
    path: 'products',
    component: ProductComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'products-form',
    component: ProductFormComponent,
    canActivate: [AuthGuardService]
  }



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewsRoutingModule { }
