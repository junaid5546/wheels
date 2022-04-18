import { Component,ElementRef,Input, OnInit,ViewChild } from '@angular/core';
import { ActionSheetController, IonContent, IonItem, IonList, IonReorderGroup } from '@ionic/angular';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { CameraServiceService } from '../Services/camera-service.service';
import { PermissionsService } from '../Services/permissions.service';
import { ModalControllerService } from '../Services/modal-controller.service';
import { AnimationController,Animation } from '@ionic/angular';
import { DeviceInfoService } from '../Services/device-info.service';
@Component({
  selector: 'app-take-car-images',
  templateUrl: './take-car-images.page.html',
  styleUrls: ['./take-car-images.page.scss'],
})
export class TakeCarImagesPage implements OnInit {
  anim:Animation;
  bottomUp:Animation;

  @ViewChild('bottomButton', {static:false}) bottomButton:ElementRef;
  @ViewChild('item', {static:false}) item:ElementRef;
  
  @ViewChild(IonItem, {read:ElementRef}) items: ElementRef;
  @ViewChild(IonReorderGroup) reorderGroup: IonReorderGroup;
  items_array:any[] = ['1','2','3','4','5','6','7','8','9',1,2,3,4,5,6,6,7,7,7,7,7,7,7,7,7,7,7];
  @ViewChild(IonContent, {static:true}) content:IonContent;
  chip_color = 'primary';
  arrange_icon = "hand-right-outline";
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
 modalStartingPoint;

drop(event: CdkDragDrop<string[]>) {

  moveItemInArray(this.carImages, event.previousIndex, event.currentIndex);

}

  constructor(
    private cam:CameraServiceService, private permission:PermissionsService,
    private modalService:ModalControllerService,
    private amimationCtrl:AnimationController,
    public  actionSheetController: ActionSheetController,
    private deviceInfo:DeviceInfoService) {
     
     }

     ngOnInit(): void {
      this.presentModal();
       let IsModelInitialized =  this.modalService.startIndexing();
       if(IsModelInitialized.status){
         this.modalService.updatecurrentObject();
       } else {
         return null;
       }
       //console.log("Model Initialization: ", IsModelInitialized);
         //this.checkModalCurrentState();
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
       this.checkImagesLength();
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
  

  presentModal(){
    console.log("Starting Point: ", this.modalStartingPoint);
    this.modalService.presentModal(this.modalStartingPoint);
  }

  checkModalCurrentState(){
   this.modalStartingPoint =  this.modalService.getCurrentState();
  
  }

  ngAfterViewInit() {
    console.log("Claaed ngAfterViewInit");
    console.log(this.item);
    this.anim = this.amimationCtrl.create('swipe');
    
    this.anim.addElement(this.item.nativeElement)
    .duration(300)
    .easing('ease-out')
    .iterations(1)
    .fromTo('transform','translateX(300px)','translateX(0px)')
    .fromTo('opacity',0.1,1);
    this.anim.play();
    this.toggleNext(false);
  }

  toggleNext(next){
   let translateYfrom;
   let translateYto; 
    if(next){
      translateYfrom = `translateY(${this.deviceInfo.getDeviceHeight()+'px'})`;
      translateYto = 'translateY(0px)';
    } else{
      translateYfrom = `translateY(${this.deviceInfo.getDeviceHeight()+'px'})`;
      translateYto = 'translateY(100px)';
    }
    this.bottomUp = this.amimationCtrl.create('bottom_up');
    this.bottomUp.addElement(this.bottomButton.nativeElement)
    .duration(500)
    .easing('ease-out')
    .iterations(1)
    .fromTo('transform',translateYfrom,translateYto)
    .fromTo('opacity',0.1,1);
    this.bottomUp.play();
  }


  checkImagesLength(){
    if(this.carImages.length > 0){
      this.toggleNext(true);
    } else if(this.carImages.length == 0) {
      this.toggleNext(false);
    }
  }

  popImages(){
    this.carImages.pop();
    this.checkImagesLength();
  }
     
}