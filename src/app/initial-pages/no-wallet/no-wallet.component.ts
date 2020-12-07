import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ModalDialogService } from '@nativescript/angular/modal-dialog';
import { CreateWalletComponent } from '../create-wallet/create-wallet.component';
import { CheckInvitesComponent } from '../check-invites/check-invites.component';
import { CreateRequestComponent } from '../create-request/create-request.component';
import { DataService } from '../../_services/data.service';
import { AuthService } from '../../_services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'ns-no-wallet',
  templateUrl: './no-wallet.component.html',
  styleUrls: ['./no-wallet.component.scss']
})
export class NoWalletComponent implements OnInit {

  constructor(private modalDialog: ModalDialogService,
    private vcRef: ViewContainerRef,
    private dataService: DataService,
    private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onWalletCreateDialog() {
    this.router.navigate(['initial/create-wallet']);
    // this.modalDialog
    //   .showModal(CreateWalletComponent, {
    //     fullscreen: true,
    //     viewContainerRef: this.dataService.getRootVCRef()
    //       ? this.dataService.getRootVCRef()
    //       : this.vcRef,
    //   }).then(res => {
    //     console.log('complete wallet creation - need to logout, res= ', res);
    //     if (res) {
    //       this.router.navigate(['initial/registration']);
    //     }
    //   })
  }

  onInvitesCheckDialog() {
    this.modalDialog
      .showModal(CheckInvitesComponent, {
        fullscreen: true,
        viewContainerRef: this.dataService.getRootVCRef()
          ? this.dataService.getRootVCRef()
          : this.vcRef,
      })
  }

  onRequestCreateDialog() {
    this.modalDialog
      .showModal(CreateRequestComponent, {
        fullscreen: true,
        viewContainerRef: this.dataService.getRootVCRef()
          ? this.dataService.getRootVCRef()
          : this.vcRef,
      })
  }

  logout() {
    this.authService.logout();
  }

}
