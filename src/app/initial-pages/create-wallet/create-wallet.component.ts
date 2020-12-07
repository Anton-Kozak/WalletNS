import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Wallet } from '../../_models/wallet';
import { WalletService } from '../../_services/wallet.service';
import { AuthService } from '../../_services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'ns-create-wallet',
  templateUrl: './create-wallet.component.html',
  styleUrls: ['./create-wallet.component.scss']
})
export class CreateWalletComponent implements OnInit {
  walletForm: FormGroup;
  wallet: Wallet;
  finalCategories: number[] = [];
  isActive: { id: number, status: boolean }[] = [];
  constructor(private walletService: WalletService,
    private authService: AuthService,
    private router: Router) { }




  ngOnInit(): void {
    this.walletService.updateHeaders();
    for (let i = 1; i <= 33; i++) {
      this.isActive.push({ id: i, status: false });
    }
    //console.log(this.isActive);

    this.walletForm = new FormGroup({
      //TODO: сделать кастомный валидатор
      'title': new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]),
      'limit': new FormControl(0, [Validators.required, Validators.min(10)])
    })
  }

  toggleCategory(categoryId: number) {

    if (this.finalCategories.find(n => n === categoryId) === undefined) {
      if (this.finalCategories.length < 10) {
        this.finalCategories.push(categoryId);
        this.isActive.find(n => n.id === categoryId).status = true;
      }
    }
    else {
      this.finalCategories.splice(this.finalCategories.findIndex(n => n === categoryId), 1);
      this.isActive.find(n => n.id === categoryId).status = false;
    }
  }

  findCategory(id: number) {
    return true;
  }

  logout() {
    this.authService.logout();
  }


  createWallet() {
    console.log('ng submit');

    this.wallet = ({
      title: this.walletForm.value['title'],
      monthlyLimit: this.walletForm.value['limit'],
      walletCategories: null,
    });
    if (this.finalCategories.length >= 5) {
      this.walletService.createNewWallet(this.wallet).subscribe(() => {
        this.walletService.addCategoriesToWallet(this.finalCategories).subscribe(() => {
          console.log("You have successfully created a wallet");
          console.log('Section chosen:', this.finalCategories);
          this.router.navigate(['initial/registration']);
          //this.modalParams.closeCallback(true);
        }, error => {
          console.log(error.statusText);
          //this.alertify.error(error.statusText);
        });
      }, error => {
        console.log(error.statusText);
        //this.alertify.error(error.statusText);
      });
    }
    else {
      //this.alertify.error("You need to choose 5 or more categories!");
    }
  }


  back() {
    this.router.navigate(['initial/no-wallet']);

  }

}
