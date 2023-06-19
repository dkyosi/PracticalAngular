import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MainLayoutComponent } from "./main-layout/main-layout.component";
import { HomeComponent } from "./home/home.component";
import { DepositComponent } from "./deposit/deposit.component";
import { WithdrawComponent } from "./withdraw/withdraw.component";
import { TransactionsComponent } from "./transactions/transactions.component";
import { TransferComponent } from "./transfer/transfer.component";

const routes: Routes = [{
    path: '', component: MainLayoutComponent,
    children: [
        { path: '', redirectTo: 'home', pathMatch: 'full' },
        { path: 'home', component: HomeComponent },
        { path: 'deposit', component: DepositComponent },
        { path: 'withdraw', component: WithdrawComponent },
        { path: 'transfer', component: TransferComponent },
        { path: 'transactions', component: TransactionsComponent },
    ]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class DashboardRoutingModule { }