import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { HomeComponent } from './home/home.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { DepositComponent } from './deposit/deposit.component';
import { WithdrawComponent } from './withdraw/withdraw.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TransferComponent } from './transfer/transfer.component';



@NgModule({
  declarations: [
    MainLayoutComponent,
    HomeComponent,
    TransactionsComponent,
    DepositComponent,
    WithdrawComponent,
    TransferComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class DashboardModule { }
