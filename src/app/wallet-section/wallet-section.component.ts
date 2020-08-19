import { Component, OnInit, ViewChild, ChangeDetectorRef, ViewContainerRef, AfterViewInit } from '@angular/core';
import { RadSideDrawer, } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { Page, isAndroid } from 'tns-core-modules/ui/page';
import { AuthService } from '../_services/auth.service';
import { WalletService } from '../_services/wallet.service';
import { CategoryData } from '../_models/categoryData';
import { exit } from 'nativescript-exit';

import { RadSideDrawerComponent } from "nativescript-ui-sidedrawer/angular/side-drawer-directives";
import { DataService } from '../_services/data.service';
import { AndroidApplication, AndroidActivityBackPressedEventData } from 'tns-core-modules/application';

@Component({
  selector: 'ns-wallet-section',
  templateUrl: './wallet-section.component.html',
  styleUrls: ['./wallet-section.component.scss']
})
export class WalletSectionComponent implements OnInit, AfterViewInit {


  categoryTitles: CategoryData[] = [];
  id: string;
  showCategory = false;
  isAdmin = false;
  isAdminDefined = false;
  userName: string = '';

  @ViewChild(RadSideDrawerComponent) drawerComponent: RadSideDrawerComponent;
  drawer: RadSideDrawer;

  constructor(private authService: AuthService,
    private walletService: WalletService,
    private dataService: DataService,
    private changeDetectionRef: ChangeDetectorRef,
    private page: Page,
    private vcRef: ViewContainerRef) {
    // Use the component constructor to inject services.
    if (this.authService.roleMatch(['Admin'])) {
      this.isAdmin = true;
    }
    else {
      this.isAdmin = false;
    }
    this.isAdminDefined = true;
  }

  ngAfterViewInit(): void {
    this.drawer = this.drawerComponent.sideDrawer;
    this.changeDetectionRef.detectChanges();
  }




  ngOnInit(): void {
    this.page.actionBarHidden = true;
    if (isAndroid) {
      app.android.on(AndroidApplication.activityBackPressedEvent, (data: AndroidActivityBackPressedEventData) => {
        data.cancel = true;
        console.log('Close App');
        exit();
      });
    }

    this.dataService.drawerState.subscribe(() => {
      if (this.drawer)
        this.drawer.toggleDrawerState();
    })
    this.dataService.setRootVCRef(this.vcRef);

    this.userName = this.authService.getToken()['unique_name'];

    this.id = this.authService.getToken().nameid;
    if (this.walletService.currentCategories.length === 0) {
      this.walletService.getWalletsCategories().subscribe((data: CategoryData[]) => {
        this.walletService.currentCategories = data;
        this.categoryTitles = this.walletService.currentCategories;
        this.getIcons();
      });
    }
    else {
      this.categoryTitles = this.walletService.currentCategories;
      this.getIcons();
    }
  }



  // isComponentSelected(url: string): boolean {
  //   console.log('Activated Url' + this._activatedUrl);
  //   return this._activatedUrl === url;
  // }

  onItemTap() {
    this.dataService.toggleDrawer();
  }

  getIcons() {
    for (let i = 0; i < this.categoryTitles.length; i++) {
      switch (this.categoryTitles[i].title) {
        case 'Food':
          this.categoryTitles[i].icon = String.fromCharCode(0xf2e7);
          break;
        case 'Sweets':
          this.categoryTitles[i].icon = String.fromCharCode(0xf786);
          break;
        case 'Fruits':
          this.categoryTitles[i].icon = String.fromCharCode(0xf5d1);
          break;
        case 'Vegetables':
          this.categoryTitles[i].icon = String.fromCharCode(0xf787);
          break;
        case 'Meat':
          this.categoryTitles[i].icon = String.fromCharCode(0xf6d7);
          break;
        case 'Alcohol':
          this.categoryTitles[i].icon = String.fromCharCode(0xf57b);
          break;
        case 'Fast food':
          this.categoryTitles[i].icon = String.fromCharCode(0xf805);
          break;
        case 'Housekeeping':
          this.categoryTitles[i].icon = String.fromCharCode(0xf6f1);
          break;
        case 'Electricity':
          this.categoryTitles[i].icon = String.fromCharCode(0xf1e6);
          break;
        case 'Gas':
          this.categoryTitles[i].icon = String.fromCharCode(0xf52f);
          break;
        case 'Water':
          this.categoryTitles[i].icon = String.fromCharCode(0xf2cc);
          break;
        case 'Entertainment':
          this.categoryTitles[i].icon = String.fromCharCode(0xf11b);
          break;
        case 'Internet Shopping':
          this.categoryTitles[i].icon = String.fromCharCode(0xf07a);
          break;
        case 'Restaurants':
          this.categoryTitles[i].icon = String.fromCharCode(0xf2e7);
          break;
        case 'Cinema':
          this.categoryTitles[i].icon = String.fromCharCode(0xf008);
          break;
        case 'Theatre':
          this.categoryTitles[i].icon = String.fromCharCode(0xf630);
          break;
        case 'Smoking':
          this.categoryTitles[i].icon = String.fromCharCode(0xf48d);
          break;
        case 'Medicine':
          this.categoryTitles[i].icon = String.fromCharCode(0xf7f2);
          break;
        case 'Medicaments':
          this.categoryTitles[i].icon = String.fromCharCode(0xf484);
          break;
        case 'Treatment':
          this.categoryTitles[i].icon = String.fromCharCode(0xf0f1);
          break;
        case 'Beauty':
        case 'Beauty accessories':
        case 'Beauty products':
        case 'Beauty procedures':
          this.categoryTitles[i].icon = String.fromCharCode(0xf1fb);
          break;
        case 'Sport':
        case 'Sport events':
        case 'Sport gambling':
        case 'Sport inventory':
        case 'Sport activities':
          this.categoryTitles[i].icon = String.fromCharCode(0xf1e3);
          break;
        case 'Transportation':
          this.categoryTitles[i].icon = String.fromCharCode(0xf1b9);
          break;
        case 'Air transportation':
          this.categoryTitles[i].icon = String.fromCharCode(0xf072);
          break;
        case 'Land transportation':
          this.categoryTitles[i].icon = String.fromCharCode(0xf1b9);
          break;
        case 'Other':
          this.categoryTitles[i].icon = String.fromCharCode(0xf042);
          break;
        default:
          this.categoryTitles[i].icon = String.fromCharCode(0xf042);
      }
    }
  }

}
