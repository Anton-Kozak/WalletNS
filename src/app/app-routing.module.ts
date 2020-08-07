import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular";
import { RegistrationLoginComponent } from "./initial-pages/registration-login/registration-login.component";
import { AuthGuard } from './_guards/auth.guard';
import { WalletSectionComponent } from "./wallet-section/wallet-section.component";
import { WalletExpensesComponent } from './wallet-section/wallet-expenses/wallet-expenses.component';
import { HomeComponent } from './wallet-section/home/home.component';
import { NoWalletComponent } from "./initial-pages/no-wallet/no-wallet.component";
import { WalletStatisticsComponent } from "./wallet-section/wallet-statistics/wallet-statistics.component";
import { UserStatisticsComponent } from "./wallet-section/user-statistics/user-statistics.component";
import { CategoryStatisticsComponent } from "./wallet-section/category-statistics/category-statistics.component";
import { WalletAdminComponent } from "./admin/wallet-admin/wallet-admin.component";
const routes: Routes = [
    { path: '', component: RegistrationLoginComponent, canActivate: [AuthGuard] },
    { path: 'no-wallet', component: NoWalletComponent },
    {
        path: 'wallet', component: WalletSectionComponent, children: [
            { path: 'home', component: HomeComponent },
            { path: 'walletExpenses', component: WalletExpensesComponent },
            { path: 'walletStatistics', component: WalletStatisticsComponent },
            { path: 'userStatistics/:id', component: UserStatisticsComponent },
            { path: 'categoryStatistics/:id', component: CategoryStatisticsComponent },
            { path: 'walletAdmin', component: WalletAdminComponent },
        ]
    }
]

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
