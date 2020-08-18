import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../../_services/auth.service';
import { NotificationService } from '../../../_services/notification.service';
import { Notification } from '../../../_models/notification';
import * as Toast from 'nativescript-toast';
import * as app from "tns-core-modules/application";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { RouterExtensions } from '@nativescript/angular/router';
import { DataService } from '../../../_services/data.service';


@Component({
  selector: 'ns-action-bar',
  templateUrl: './action-bar.component.html',
  styleUrls: ['./action-bar.component.css']
})
export class ActionBarComponent implements OnInit {

  notificationCount: number = 0;
  notifications: Notification[] = [];


  @Input() showBackButton = true;


  sideDrawer: any;
  constructor(
    private authService: AuthService,
    private noteService: NotificationService,
    private router: RouterExtensions,
    private dataService: DataService) { }


  ngOnInit(): void {
    this.sideDrawer = <RadSideDrawer>app.getRootView();
    this.noteService.getNotifications().subscribe((notifications: Notification[]) => {
      if (notifications != null) {
        this.notifications = notifications;
        this.notificationCount = notifications.length;
      }
    })

  }

  showSideDrawer() {
    console.log(this.sideDrawer);
  }

  showNotifications() {
    if (this.notificationCount > 0) {
      this.notifications.forEach((val) => {
        let toast = Toast.makeText(val.message);
        toast.show();
      });
      this.noteService.deleteNotifications().subscribe();
      this.notificationCount = 0;
      this.notifications = null;
    }
    else {
      let toast = Toast.makeText('You have no notifications!');
      toast.show();
    }
  }
  logout() {
    this.authService.logout();
  }

  get canGoBack() {
    return this.router.canGoBack() && this.showBackButton;
  }

  onToggleMenu(){
    this.dataService.toggleDrawer()
  }

  back() {
    this.router.backToPreviousPage();
  }
}
