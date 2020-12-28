import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { WalletService } from '../../_services/wallet.service';
import { ProfileData } from '../../_models/profile-data';
import { Photo } from '../../_models/photo';
import { UserForProfileEdit } from '../../_models/user-for-profile-edit';
import { PhotoService } from '../../_services/photo.service';
import * as moment from 'moment';
import { DataService } from '../../_services/data.service';
import { ModalDialogService } from '@nativescript/angular/modal-dialog';
import { NewImageComponent } from './new-image/new-image.component';

@Component({
  selector: 'ns-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  imagePath = 'res://defaultavatar';
  photo: Photo = null;
  editProfileForm: FormGroup;
  profileData: ProfileData = null;
  userForEdit: UserForProfileEdit;
  isLoading: boolean;
  walletCurrency: string = 'USD';

  constructor(private photoService: PhotoService,
    private walletService: WalletService,
    private dataService: DataService,
    private modalDialog: ModalDialogService,
    private vcRef: ViewContainerRef) { }
  ngOnInit(): void {
    // this.walletService.getCurrentWallet().subscribe(wallet=>{
    //   this.walletCurrency = wallet['currency'];
    // })

    this.isLoading = true;
    this.walletService.getProfileData().subscribe((profileData: ProfileData) => {
      this.profileData = profileData;

      this.userForEdit = profileData.editUser;

      //todo: сделать валидацию как и везде
      this.editProfileForm = new FormGroup({
        'company': new FormControl(this.profileData.editUser.company, [Validators.minLength(2), Validators.maxLength(32), Validators.pattern("[A-Za-z0-9 \.]+")]),
        'username': new FormControl(this.profileData.editUser.userName, [Validators.required, Validators.maxLength(16), Validators.pattern("[A-Za-z0-9]+")]),
        'email': new FormControl(this.profileData.editUser.email, [Validators.required, Validators.maxLength(32), Validators.email]),
        'firstName': new FormControl(this.profileData.editUser.firstName, [Validators.minLength(2), Validators.maxLength(16), Validators.pattern("[A-Za-z]+")]),
        'lastName': new FormControl(this.profileData.editUser.lastName, [Validators.minLength(2), Validators.maxLength(16), Validators.pattern("[A-Za-z]+")]),
        'address': new FormControl(this.profileData.editUser.address, [Validators.minLength(2), Validators.maxLength(32), Validators.pattern("[A-Za-z0-9 \.]+")]),
        'phoneNumber': new FormControl(this.profileData.editUser.phoneNumber, [Validators.minLength(4), Validators.maxLength(16), Validators.pattern("[0-9]+")]),
        'city': new FormControl(this.profileData.editUser.city, [Validators.minLength(2), Validators.maxLength(32), Validators.pattern("[A-Za-z0-9]+")]),
        'country': new FormControl(this.profileData.editUser.country, [Validators.minLength(2), Validators.maxLength(32), Validators.pattern("[A-Za-z0-9 ]+")]),
      });
      this.isLoading = false;
    })

    this.getPhoto();

  }


  onImageChange() {
    this.modalDialog
      .showModal(NewImageComponent, {
        fullscreen: true,
        viewContainerRef: this.dataService.getRootVCRef()
          ? this.dataService.getRootVCRef()
          : this.vcRef,
      }).then(res => {
        console.log('photo updated');
        //this.getPhoto();
      })
    // const dialogRef = this.dialog.open(ImageModalComponent);
    // dialogRef.afterClosed().subscribe(result => {
    //   this.getPhoto();
    // });
  }

  getPhoto() {
    this.photoService.getPhoto().subscribe((data: Photo) => {
      this.photo = data;
    })
  }

  editProfile() {
    if (this.editProfileForm.valid) {
      if (this.editProfileForm.value['address'] !== this.profileData.editUser.address
        || this.editProfileForm.value['company'] !== this.profileData.editUser.company
        || this.editProfileForm.value['firstName'] !== this.profileData.editUser.firstName
        || this.editProfileForm.value['firstName'] !== this.profileData.editUser.firstName
        || this.editProfileForm.value['lastName'] !== this.profileData.editUser.lastName
        || this.editProfileForm.value['username'] !== this.profileData.editUser.userName
        || this.editProfileForm.value['email'] !== this.profileData.editUser.email
        || this.editProfileForm.value['city'] !== this.profileData.editUser.city
        || this.editProfileForm.value['country'] !== this.profileData.editUser.country
        || this.editProfileForm.value['phoneNumber'] !== this.profileData.editUser.phoneNumber) {
        this.userForEdit = {
          address: this.editProfileForm.value['address'],
          company: this.editProfileForm.value['company'],
          firstName: this.editProfileForm.value['firstName'],
          lastName: this.editProfileForm.value['lastName'],
          userName: this.editProfileForm.value['username'],
          email: this.editProfileForm.value['email'],
          city: this.editProfileForm.value['city'],
          country: this.editProfileForm.value['country'],
          phoneNumber: this.editProfileForm.value['phoneNumber'],
        }
        console.log('user for edit', this.userForEdit);
        this.walletService.updateUserProfile(this.userForEdit).subscribe((response: string) => {
          this.profileData.editUser.userName = this.editProfileForm.value['username'];
          this.profileData.editUser.firstName = this.editProfileForm.value['firstName'];
          this.profileData.editUser.lastName = this.editProfileForm.value['lastName'];
          console.log('successfully saved');
        }, error => {
          console.log(error);
        });
      } else {
        console.log('error');
      }
    }
  }

  getFormat(date) {
    return moment(date).format('lll');
  }


}