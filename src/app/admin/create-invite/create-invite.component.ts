import { Component, OnInit } from '@angular/core';
import * as Toast from 'nativescript-toast';
import { InviteService } from '../../_services/invite.service';
import { ModalDialogParams } from '@nativescript/angular/modal-dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'ns-create-invite',
  templateUrl: './create-invite.component.html',
  styleUrls: ['./create-invite.component.scss']
})
export class CreateInviteComponent implements OnInit {
  emailForm: FormGroup;
  constructor(
    private invService: InviteService,
    private modalParams: ModalDialogParams
  ) { }

  ngOnInit(): void {
    this.emailForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.minLength(4)])
    })
  }

  onSubmit() {
    if (this.emailForm.valid) {
      this.invService.createInvite(this.emailForm.value['email']).subscribe((response: any) => {
        let toast = Toast.makeText(response);
        toast.show();
        console.log(response);
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

  goBack() {
    this.modalParams.closeCallback();
  }


}
