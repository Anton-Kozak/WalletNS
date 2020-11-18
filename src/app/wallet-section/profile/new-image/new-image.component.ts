import { Component, OnInit } from '@angular/core';
import * as camera from "nativescript-camera";
import { PhotoService } from '../../../_services/photo.service';
import { Image } from "tns-core-modules/ui/image";
import { ImageSource } from "tns-core-modules/image-source";
import { ModalDialogParams } from '@nativescript/angular';
import * as imagepicker from "nativescript-imagepicker";
var fs = require("file-system");

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
    let context = imagepicker.create({
      mode: "single" // use "multiple" for multiple selection
    });

    context
      .authorize()
      .then(() => {
        return context.present();
      })
      .then((selection) => {
        selection.forEach((selected) => {
          var image = new Image();
          image.src = selected;
          ImageSource.fromAsset(selected).then((source) => {
            const base64image = source.toBase64String("jpg", 60);
            const uploadData = new FormData();
            uploadData.append('Name', 'test');
            uploadData.append('File', base64image);
            console.log(uploadData);
            this.photoService.addPhoto(uploadData).subscribe(response => {
              this.modalParams.closeCallback();
            });
          });
        });
        //list.items = selection;
      }).catch(function (e) {
        // process error
      });

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
  }

  onBack() {
    this.modalParams.closeCallback();
  }


}
