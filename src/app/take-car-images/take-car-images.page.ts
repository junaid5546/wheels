import { Component,Input, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { CameraServiceService } from '../Services/camera-service.service';
import { PermissionsService } from '../Services/permissions.service';
@Component({
  selector: 'app-take-car-images',
  templateUrl: './take-car-images.page.html',
  styleUrls: ['./take-car-images.page.scss'],
})
export class TakeCarImagesPage implements OnInit {
 // ROUTE NAME HERE.
 @Input() forwardTo:string = null;
 // ROUTE IS FORWARD OR BACK.
 @Input() goBack:string = null;
 // LEFT AND RIGHT ICON.
 icons:any = { has_left_icon:true, left_icon:'../../assets/icon/settings/back.svg', has_right_icon:true, right_icon:'../../assets/icon/notification.svg'};
 // MAIN HEADING/SUBHEADING.
 @Input() heading = {has_main_heading:true, main_heading_name:'Images', has_sub_heading:false, sub_heading_name:''};

 
 carImages:any[] = [];

drop(event: CdkDragDrop<string[]>) {
  moveItemInArray(this.carImages, event.previousIndex, event.currentIndex);
}



  constructor(
    private cam:CameraServiceService, private permission:PermissionsService,
    public  actionSheetController: ActionSheetController) {
     }

     ngOnInit(): void {
         
     }

      selectImages(){
       this.permission.checkCameraPermission()
       .then((res:any)=>{
         console.log("Permission: ", res);
       })
     }

     pickImages() {
      this.cam.pickImages()
      .then((res:any)=>{
        this.carImages = res;
        console.log("Selected Images: ", this.carImages);
      });
     }
}