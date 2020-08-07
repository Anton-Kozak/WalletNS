import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../../_services/auth.service';
import { NotificationService } from '../../../_services/notification.service';
import { Notification } from '../../../_models/notification';
import * as Toast from 'nativescript-toast';
@Component({
  selector: 'ns-action-bar',
  templateUrl: './action-bar.component.html',
  styleUrls: ['./action-bar.component.css']
})
export class ActionBarComponent implements OnInit {

  notificationCount: number = 0;
  notifications: Notification[] = [];

  @Input() showNotificationBar = true;
  @Input() showLogout = true;

  constructor(private authService: AuthService,
    private noteService: NotificationService) { }
  ngOnInit(): void {
    this.noteService.getNotifications().subscribe((notifications: Notification[]) => {
      if (notifications != null) {
        console.log("Notifications: " + notifications);
        this.notifications = notifications;
        this.notificationCount = notifications.length;
      }
    })

  }

  showNotifications() {
    this.notifications.forEach((val) => {
      let toast = Toast.makeText(val.message);
      toast.show();
    });
    this.noteService.deleteNotifications().subscribe();
    this.notificationCount = 0;
    this.notifications = null;
  }
  logout() {
    this.authService.logout();
  }
}
