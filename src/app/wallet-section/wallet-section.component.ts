import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular/router';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { DrawerTransitionBase, RadSideDrawer, SlideInOnTopTransition } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { Page } from 'tns-core-modules/ui/page';
import { AuthService } from '../_services/auth.service';
import { WalletService } from '../_services/wallet.service';
import { CategoryData } from '../_models/categoryData';
@Component({
  selector: 'ns-wallet-section',
  templateUrl: './wallet-section.component.html',
  styleUrls: ['./wallet-section.component.scss']
})
export class WalletSectionComponent implements OnInit {
  private _activatedUrl: string;
  private _sideDrawerTransition: DrawerTransitionBase;
  categoryTitles: CategoryData[] = [];
  id: string;
  showCategory = false;
  isAdmin = false;
  isAdminDefined = false;
  constructor(private router: Router,
    private routerExtensions: RouterExtensions,
    private page: Page,
    private authService: AuthService,
    private walletService: WalletService) {
    // Use the component constructor to inject services.
    if (this.authService.roleMatch(['Admin'])) {
      this.isAdmin = true;
    }
    else {
      this.isAdmin = false;
    }
    this.isAdminDefined = true;
  }



  ngOnInit(): void {
    this._activatedUrl = "/wallet/home";
    this._sideDrawerTransition = new SlideInOnTopTransition();
    this.page.actionBarHidden = true;

    this.id = this.authService.getToken().nameid;
    if (this.walletService.currentCategories.length === 0) {
      this.walletService.getWalletsCategories().subscribe((data: CategoryData[]) => {
        this.walletService.currentCategories = data;
        this.categoryTitles = this.walletService.currentCategories;
        //this.getIcons();
      });
    }
    else {
      this.categoryTitles = this.walletService.currentCategories;
      //this.getIcons();
    }

    this.router.events
      .pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => this._activatedUrl = event.urlAfterRedirects);
  }

  get sideDrawerTransition(): DrawerTransitionBase {
    return this._sideDrawerTransition;
  }

  isComponentSelected(url: string): boolean {
    return this._activatedUrl === url;
  }

  onNavItemTap(navItemRoute: string): void {
    this.routerExtensions.navigate([navItemRoute], {
      transition: {
        name: "fade"
      }
    });

    const sideDrawer = <RadSideDrawer>app.getRootView();
    sideDrawer.closeDrawer();
  }
}
