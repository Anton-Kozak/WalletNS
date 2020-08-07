import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { RequestService } from '../../_services/request.service';
import { Request } from '../../_models/request';
import * as Toast from 'nativescript-toast';
@Component({
  selector: 'ns-check-request',
  templateUrl: './check-request.component.html',
  styleUrls: ['./check-request.component.scss']
})
export class CheckRequestComponent implements OnInit {

  constructor(private reqService: RequestService, private authService: AuthService) { }

  @Output() onUserAdd = new EventEmitter();

  columns: string[] = ['from', 'date', 'actions'];
  requests: Request[] = [];
  ngOnInit(): void {
    this.reqService.updateHeaders();
    this.reqService.getRequests(this.authService.getToken().nameid).subscribe((req: Request[]) => {
      this.requests = req;
      if (this.requests.length == 0) {
        let toast = Toast.makeText("You have no new requests");
        toast.show();
      }
    });
  }
  //TODO: обновлять таблицу при добавлении пользователя
  acceptRequest(email: string, rowIndex: number) {
    this.reqService.acceptRequest(email, this.authService.getToken().nameid).subscribe((response) => {
      console.log(response);
      this.requests.splice(rowIndex, 1)
      this.requests = this.requests;
      let toast = Toast.makeText(response);
      toast.show();
      this.onUserAdd.emit();
    }, error => {
      console.log(error);
      let toast = Toast.makeText(error.error);
      toast.show();
    });
  }

  declineRequest(email: string, rowIndex: number) {
    this.reqService.declineRequest(email).subscribe((response) => {
      console.log(response);
      this.requests.splice(rowIndex, 1);
      this.requests = this.requests;
      let toast = Toast.makeText(response);
      toast.show();
    }, error => {
      console.log(error);
      let toast = Toast.makeText(error.error);
      toast.show();
    });
  }


}
