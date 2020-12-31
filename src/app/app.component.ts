import { Component, OnInit, ViewChild, ChangeDetectorRef, ViewContainerRef, AfterViewInit, ElementRef } from '@angular/core';
import { RadSideDrawer, } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { isAndroid } from 'tns-core-modules/ui/page';
import { AuthService } from './_services/auth.service';
import { WalletService } from './_services/wallet.service';
import { CategoryData } from './_models/categoryData';
import { exit } from 'nativescript-exit';
import { RadSideDrawerComponent } from "nativescript-ui-sidedrawer/angular/side-drawer-directives";
import { DataService } from './_services/data.service';
import { AndroidApplication, AndroidActivityBackPressedEventData } from 'tns-core-modules/application';
import { GridLayout, StackLayout } from 'tns-core-modules';
import { Router } from '@angular/router';

@Component({
    selector: "ns-app",
    templateUrl: "./app.component.html"
})
export class AppComponent implements OnInit, AfterViewInit {
    categoryTitles: CategoryData[] = [];
    id: string;
    showCategory = false;
    isAdmin = false;
    isAdminDefined = false;
    userName: string = '';
    showWalletItems = false;

    @ViewChild(RadSideDrawerComponent) drawerComponent: RadSideDrawerComponent;
    drawer: RadSideDrawer;
    @ViewChild('stack') stack: ElementRef;

    constructor(private authService: AuthService,
        private walletService: WalletService,
        private dataService: DataService,
        private changeDetectionRef: ChangeDetectorRef,
        private vcRef: ViewContainerRef, private router: Router) {
        // Use the component constructor to inject services.
        this.authService.isAdmin.subscribe(isAdmin => {
            this.isAdmin = isAdmin;
            this.isAdminDefined = true;
            console.log('is admin', isAdmin);
        });

        this.router.routeReuseStrategy.shouldReuseRoute = function () {
            return false;
        };
    }

    ngAfterViewInit(): void {
        this.drawer = this.drawerComponent.sideDrawer;
        this.changeDetectionRef.detectChanges();
        let st: StackLayout = this.stack.nativeElement;
        let gr: GridLayout = <GridLayout>st.getChildAt(0);
        gr.className = 'nt-drawer__list-item active';
    }




    ngOnInit(): void {
        this.authService.roleMatch(['Admin']);
        console.log('app main');
        this.authService.id.subscribe(id => {
            this.id = id;
        });

        this.dataService.changeItemSubject.subscribe((data: [string, string]) => {
            if (data[0] !== '' && data[1] !== '') {
                this.manualSwitch(data[0], data[1]);
            }
        })

        this.walletService.currentCategories.subscribe(categories => {
            console.log('categories length in app component subject upon login ', categories.length);
            this.categoryTitles = categories;
            this.getIcons();

        });
        this.authService.isLoggedIn.subscribe((value: boolean) => {
            if (value) {
                this.walletService.updateHeaders();
                console.log('WE login');
                this.walletService.getWalletsCategories();
                this.userName = this.authService.getToken()['unique_name'];
            }
            else {
                console.log('We logout');
            }
            this.showWalletItems = value;
            console.log('value of showwalletites', this.showWalletItems)
        });
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
    }

    onItemTap(path: string, addPath?: string) {
        let currentPath = this.router.url;
        if (addPath === undefined)
            this.router.navigateByUrl(path);
        else
            this.router.navigateByUrl(addPath);
        console.log('current route:', currentPath.replace('/wallet/', ''));
        let currentActive;
        let nextActive;
        if (path.includes('categoryStatistics')) {
            console.log('path to which we move - ', path);
            nextActive = addPath.replace('/wallet/', '');
        }
        else {
            nextActive = path.replace('/wallet/', '');
        }
        if (currentPath.includes('categoryStatistics')) {
            console.log('we were on cat stat and go to cat stat');
            currentActive = currentPath.replace('/wallet/', '');
        } else {
            currentActive = currentPath.replace('/wallet/', '').replace(/(\/.*)/, '');
        }


        console.log('current active that will change:', currentActive, '; path that will be active: ', nextActive);
        let st: StackLayout = this.stack.nativeElement;
        //сделать прев не активным
        (<GridLayout>st.getViewById(currentActive)).className = 'nt-drawer__list-item';
        console.log('prev item removed');
        (<GridLayout>st.getViewById(nextActive)).className = 'nt-drawer__list-item active';
        console.log('next item set');
        this.dataService.toggleDrawer();
    }

    getIcons() {
        console.log('get icons');
        for (let i = 0; i < this.categoryTitles.length; i++) {
            console.log(this.categoryTitles[i].title);
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

    manualSwitch(from: string, to: string) {
        let st: StackLayout = this.stack.nativeElement;
        console.log('from', from, 'to', to);
        //сделать прев не активным
        (<GridLayout>st.getViewById(from)).className = 'nt-drawer__list-item';
        (<GridLayout>st.getViewById(to)).className = 'nt-drawer__list-item active';
    }
}
