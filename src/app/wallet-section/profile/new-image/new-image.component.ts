import { Component, OnInit } from '@angular/core';
import * as camera from "nativescript-camera";
import { PhotoService } from '../../../_services/photo.service';
import { Image } from "tns-core-modules/ui/image";
import { ImageSource } from "tns-core-modules/image-source";
import { ModalDialogParams } from '@nativescript/angular';

const options = {
  width: 300,
  height: 300,
  keepAspectRatio: false,
  saveToGallery: true
};

@Component({
  selector: 'ns-new-image',
  templateUrl: './new-image.component.html',
  styleUrls: ['./new-image.component.css']
})
export class NewImageComponent implements OnInit {
  constructor(private photoService: PhotoService, private modalParams: ModalDialogParams) { }

  ngOnInit(): void {
  }

  onSelectExistingImage() {

  }




  onTakeImage() {
    camera.requestPermissions().then(
      () => {
        // permission request accepted or already granted 
        console.log('premission granted');
        camera.takePicture()
          .then((imageAsset) => {
            console.log("Result is an image asset instance");
            var image = new Image();
            image.src = imageAsset;
            ImageSource.fromAsset(imageAsset).then((source) => {
              const base64image = source.toBase64String("jpg", 60);
              const uploadData = new FormData();
                uploadData.append('Name', 'test');
                uploadData.append('File', base64image);
                console.log(uploadData);
                this.photoService.addPhoto(uploadData).subscribe(response => {
                  this.modalParams.closeCallback();
                });
              }
              );

            }).catch((err) => {
              //todo: сделать запрос если нет разрешения
              console.log("Error -> " + err.message);
            });
          },
            () => {
              // permission request rejected
              console.log('permission denied');
            }
          );
    camera.takePicture()
      .then((imageAsset) => {
        console.log("Result is an image asset instance");
        var image = new Image();
        image.src = imageAsset;
      }).catch((err) => {
        //todo: сделать запрос если нет разрешения
        console.log("Error -> " + err.message);
      });
  }

  onBack() {
    this.modalParams.closeCallback();
  }


}
