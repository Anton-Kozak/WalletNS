import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular";
import { RegistrationLoginComponent } from "./initial-pages/registration-login/registration-login.component";
import { WalletExpensesComponent } from './wallet-section/wallet-expenses/wallet-expenses.component';
import { HomeComponent } from './wallet-section/home/home.component';
import { NoWalletComponent } from "./initial-pages/no-wallet/no-wallet.component";
import { WalletStatisticsComponent } from "./wallet-section/wallet-statistics/wallet-statistics.component";
import { UserStatisticsComponent } from "./wallet-section/user-statistics/user-statistics.component";
import { CategoryStatisticsComponent } from "./wallet-section/category-statistics/category-statistics.component";
import { WalletAdminComponent } from "./admin/wallet-admin/wallet-admin.component";
import { PreviousExpensesComponent } from "./wallet-section/previous-expenses/previous-expenses.component";
import { ProfileComponent } from "./wallet-section/profile/profile.component";
import { TokenCheckGuard } from './_guards/token-check.guard';
import { CreateWalletComponent } from "./initial-pages/create-wallet/create-wallet.component";
const routes: Routes = [
    { path: '', redirectTo: 'wallet/home', pathMatch: 'full' },
    {
        path: 'wallet', canActivateChild: [TokenCheckGuard], children: [
            { path: 'home', component: HomeComponent },
            { path: 'walletExpenses', component: WalletExpensesComponent },
            { path: 'previousExpenses', component: PreviousExpensesComponent },
            { path: 'walletStatistics', component: WalletStatisticsComponent },
            { path: 'userStatistics/:id', component: UserStatisticsComponent },
            { path: 'userStatistics/:id/:name', component: UserStatisticsComponent },
            { path: 'categoryStatistics/:id/:title', component: CategoryStatisticsComponent },
            { path: 'profile', component: ProfileComponent },
            { path: 'walletAdmin', component: WalletAdminComponent },
        ]
    },
    {
        path: 'initial', children: [
            { path: 'registration', component: RegistrationLoginComponent },
            { path: 'no-wallet', component: NoWalletComponent },
            { path: 'create-wallet', component: CreateWalletComponent }
        ]
    }



]


@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
