import { Component,Input, OnInit,ViewChild } from '@angular/core';
import { ActionSheetController, IonReorderGroup } from '@ionic/angular';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { CameraServiceService } from '../Services/camera-service.service';
import { PermissionsService } from '../Services/permissions.service';
import { ItemReorderEventDetail } from '@ionic/core';
@Component({
  selector: 'app-take-car-images',
  templateUrl: './take-car-images.page.html',
  styleUrls: ['./take-car-images.page.scss'],
})
export class TakeCarImagesPage implements OnInit {
  chip_color = 'primary';
  arrange_icon = "hand-right-outline";
  @ViewChild(IonReorderGroup) reorderGroup: IonReorderGroup;
  reOrder:boolean = false;
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
        this.carImages = this.carImages.concat(res)
        console.log("Selected Images: ", this.carImages);
      });
     }

     reorderItems(ev) {
      const itemMove = this.carImages.splice(ev.detail.from, 1)[0];
      this.carImages.splice(ev.detail.to, 0, itemMove);
      ev.detail.complete();
      console.log("R:",ev);
  }


  toggleReorderGroup() {
    this.reorderGroup.disabled = !this.reorderGroup.disabled;
  }


  reorder() {
    if(this.carImages.length != 0) {
    this.reOrder = !this.reOrder;
    if(this.reOrder) {
      console.log("if");
      let grid = document.getElementsByTagName('ion-grid')[0];
      grid.style.display = 'none';
      this.chip_color = 'secondary';
      this.arrange_icon = 'checkmark-outline';
    } else {
      console.log("else");
      let grid = document.getElementsByTagName('ion-grid')[0];
      grid.style.display = 'block';
      this.chip_color = 'primary';
      this.arrange_icon = 'hand-right-outline';
    }
  } else {
    console.log("No cars");
    this.chip_color = 'primary'
  }

  }


  makeItThatIndex(from,to) {
    const itemMove = this.carImages.splice(from, 1)[0];
      this.carImages.splice(to, 0, itemMove);
  }
     
}