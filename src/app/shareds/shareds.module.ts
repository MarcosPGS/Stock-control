import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';

// PRIME NG
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { SidebarModule } from 'primeng/sidebar';
import { ToolbarModule } from 'primeng/toolbar';
import { ChartModule } from 'primeng/chart';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { DialogModule } from 'primeng/dialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TooltipModule } from 'primeng/tooltip';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ToolbarNavigationComponent } from './components/toolbar-navigation/toolbar-navigation.component';

@NgModule({
  declarations: [
    ToolbarNavigationComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    RouterModule,

    // PRIME NG
    InputTextModule,
    ButtonModule,
    CardModule,
    ToastModule,
    RippleModule,
    SidebarModule,
    ToolbarModule,
    ChartModule,
    ConfirmDialogModule,
    ConfirmPopupModule,
    ConfirmPopupModule,
    DialogModule,
    DynamicDialogModule,
    OverlayPanelModule,
    TooltipModule,
    TableModule,
    ConfirmDialogModule,
    DropdownModule
  ],
  exports: [
    ToolbarNavigationComponent,

    // PRIME NG
    InputTextModule,
    ButtonModule,
    CardModule,
    ToastModule,
    RippleModule,
    SidebarModule,
    ToolbarModule,
    ChartModule,
    ConfirmDialogModule,
    ConfirmPopupModule,
    ConfirmPopupModule,
    DialogModule,
    DynamicDialogModule,
    OverlayPanelModule,
    TooltipModule,
    TableModule,
    ConfirmDialogModule,
    DropdownModule
  ],
  providers: [CurrencyPipe],
})
export class SharedsModule {}
