import { Component, OnInit } from '@angular/core';
import { ModalDialogParams } from '@nativescript/angular/modal-dialog';
@Component({
  selector: 'ns-check-invites',
  templateUrl: './check-invites.component.html',
  styleUrls: ['./check-invites.component.scss']
})
export class CheckInvitesComponent implements OnInit {

  constructor(private modalParams: ModalDialogParams) { }

  ngOnInit(): void {
  }

  confirm() {
    //создание кошелька
    this.modalParams.closeCallback();
  }
  back() {
    this.modalParams.closeCallback();
  }
}
