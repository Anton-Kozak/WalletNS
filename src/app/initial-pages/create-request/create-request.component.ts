import { Component, OnInit } from '@angular/core';
import { ModalDialogParams } from '@nativescript/angular/modal-dialog';
@Component({
  selector: 'ns-create-request',
  templateUrl: './create-request.component.html',
  styleUrls: ['./create-request.component.scss']
})
export class CreateRequestComponent implements OnInit {

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
