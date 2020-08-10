import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "@nativescript/angular";
import { AppRoutingModule } from "./app-routing.module";
import { NativeScriptHttpClientModule } from "@nativescript/angular/http-client";
import { NativeScriptRouterModule } from "@nativescript/angular/router";
import { NativeScriptFormsModule } from "@nativescript/angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular";
import { StartComponent } from './start/start.component';
import { RegistrationLoginComponent } from './initial-pages/registration-login/registration-login.component';
import { NativeScriptUIChartModule } from "nativescript-ui-chart/angular";
import { SharedModule } from './shared/shared.module';
import { NgShadowModule } from "nativescript-ngx-shadow";

import { AppComponent } from "./app.component";
import { CreateWalletComponent } from './initial-pages/create-wallet/create-wallet.component';
import { CheckInvitesComponent } from './initial-pages/check-invites/check-invites.component';
import { CreateRequestComponent } from './initial-pages/create-request/create-request.component';
import { WalletSectionComponent } from './wallet-section/wallet-section.component';
import { HomeComponent } from './wallet-section/home/home.component';
import { WalletExpensesComponent } from './wallet-section/wallet-expenses/wallet-expenses.component';
import { NoWalletComponent } from './initial-pages/no-wallet/no-wallet.component';
import { CreateExpenseComponent } from './expenses/create-expense/create-expense.component';
import { WalletStatisticsComponent } from './wallet-section/wallet-statistics/wallet-statistics.component';
import { UserStatisticsComponent } from './wallet-section/user-statistics/user-statistics.component';
import { CategoryStatisticsComponent } from './wallet-section/category-statistics/category-statistics.component';
import { WalletAdminComponent } from './admin/wallet-admin/wallet-admin.component';

import { HasRoleDirective } from './_directives/hasRole.directive';
import { CheckRequestComponent } from './admin/check-request/check-request.component';
import { CreateInviteComponent } from './admin/create-invite/create-invite.component';

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        NativeScriptFormsModule,
        ReactiveFormsModule,
        NativeScriptHttpClientModule,
        NativeScriptRouterModule,
        NativeScriptUISideDrawerModule,
        NativeScriptUIChartModule,
        SharedModule,
        NgShadowModule
    ],
    declarations: [
        AppComponent,
        StartComponent,
        RegistrationLoginComponent,
        CreateWalletComponent,
        CheckInvitesComponent,
        CreateRequestComponent,
        WalletSectionComponent,
        HomeComponent,
        WalletExpensesComponent,
        NoWalletComponent,
        CreateExpenseComponent,
        WalletStatisticsComponent,
        UserStatisticsComponent,
        CategoryStatisticsComponent,
        WalletAdminComponent,
        HasRoleDirective,
        CheckRequestComponent,
        CreateInviteComponent
    ],
    providers: [],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
