import { Component, OnInit } from '@angular/core';
import { ModalDialogParams } from '@nativescript/angular/modal-dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RequestService } from '../../_services/request.service';
import * as Toast from 'nativescript-toast';
@Component({
  selector: 'ns-create-request',
  templateUrl: './create-request.component.html',
  styleUrls: ['./create-request.component.scss']
})
export class CreateRequestComponent implements OnInit {
  emailForm: FormGroup;
  constructor(private modalParams: ModalDialogParams,
    private reqService: RequestService) { }

  ngOnInit(): void {
    this.emailForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.minLength(4)])
    })
  }

  confirm() {
    if (this.emailForm.valid) {
      this.reqService.createRequestForAccess(this.emailForm.value['email']).subscribe((response: any) => {
        console.log(response);
        this.modalParams.closeCallback();
      }, error => {
        let toast = Toast.makeText(error.error);
        toast.show();
      });
    }
    else {
      let toast = Toast.makeText('Email is too short');
      toast.show();
    }



  }
  back() {
    this.modalParams.closeCallback();
  }

}
