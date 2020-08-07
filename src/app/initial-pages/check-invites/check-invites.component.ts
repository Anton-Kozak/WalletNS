import { Component, OnInit } from '@angular/core';
import { ModalDialogParams } from '@nativescript/angular/modal-dialog';
import { InviteService } from '../../_services/invite.service';
import { Invite } from '../../_models/invite';
import * as Toast from 'nativescript-toast';
@Component({
  selector: 'ns-check-invites',
  templateUrl: './check-invites.component.html',
  styleUrls: ['./check-invites.component.scss']
})
export class CheckInvitesComponent implements OnInit {


  constructor(private invService: InviteService,
    private modalParams: ModalDialogParams) { }
  invites: Invite[];

  ngOnInit(): void {
    this.invService.updateHeaders();
    this.invService.checkInvites().subscribe((inv: Invite[]) => {
      this.invites = inv;
      console.log(this.invites);
    })
  }

  acceptInvite(walletId: number) {
    this.invService.accept(walletId).subscribe(response => {
      let toast = Toast.makeText(response);
      toast.show();
      toast = Toast.makeText("Please, log in to see your wallet");
      toast.show();
    }, error => {
      let toast = Toast.makeText(error.error);
      toast.show();
    });
  }

  declineInvite(walletId: number) {
    this.invService.decline(walletId).subscribe(response => {
      let toast = Toast.makeText(response);
      toast.show();
    }, error => {
      let toast = Toast.makeText(error.error);
      toast.show();
    })
  }

  back() {
    this.modalParams.closeCallback();
  }
}
