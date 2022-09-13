import { ChangeDetectionStrategy, ChangeDetectorRef, Component,ElementRef,Input, OnInit,ViewChild } from '@angular/core';
import { ActionSheetController, IonContent, IonItem, IonList, IonReorderGroup } from '@ionic/angular';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { CameraServiceService } from '../../Services/camera-service.service';
import { PermissionsService } from '../../Services/permissions.service';
import { ModalControllerService } from '../../Services/modal-controller.service';
import { AnimationController,Animation } from '@ionic/angular';
import { DeviceInfoService } from '../../Services/device-info.service';
import { CamGalService } from '../../Services/cam-gal.service';
import { CarInfoModalComponent } from '../../Models/car-info-modal/car-info-modal.component';
import { DomSanitizer } from '@angular/platform-browser';
import { WebView } from '@awesome-cordova-plugins/ionic-webview/ngx';
import { Platform } from '@ionic/angular';
import { PostService } from 'dm-api';
import { UserDataService } from '../../Services/user-data.service';
import { CarFiltersService } from '../../Services/car-filters.service';

@Component({
  selector: 'app-take-car-images',
  templateUrl: './take-car-images.page.html',
  styleUrls: ['./take-car-images.page.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class TakeCarImagesPage implements OnInit {
  
 // THIS NAME IS DYNAMIC
  nextButtonText:string = "Next";
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
 icons:any = { has_left_icon:true, left_icon:'../../assets/icon/settings/back.svg', has_right_icon:true, right_icon:'../../assets/icon/Language.svg'};

 // MAIN HEADING/SUBHEADING.
 @Input() heading = {has_main_heading:true, main_heading_name:'Images', has_sub_heading:false, sub_heading_name:''};
// DOES POST HAS INITIATED.
 savedPost = null;
 carImages:any[] = [];
 // INITIALLY STARTING POINT IS 0 OR OBJECT.
 modalStartingPoint = 0;

drop(event: CdkDragDrop<string[]>) {

  moveItemInArray(this.carImages, event.previousIndex, event.currentIndex);

}

  constructor(
    public webView:WebView,
    public senitizer:DomSanitizer,
    private camGal:CamGalService,
    private cam:CameraServiceService, private permission:PermissionsService,
    private modalService:ModalControllerService,
    private amimationCtrl:AnimationController,
    public  actionSheetController: ActionSheetController,
    private changeDetector:ChangeDetectorRef,
    public platform: Platform,
    private post:PostService,
    private filter:CarFiltersService,
    private userData:UserDataService,
    private deviceInfo:DeviceInfoService) {
     
     }

     ngOnInit(): void {
       let IsModelInitialized =  this.modalService.startIndexing();
       if(IsModelInitialized.status){
         this.modalService.updatecurrentObject();
       } else {
         return null;
       }
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
  

  // PRESENTING MODEL AFTER CREATING POST.
  presentModal(){
    console.log("Starting Point: ", this.modalStartingPoint);
    this.modalService.presentModal(CarInfoModalComponent,this.modalStartingPoint);
  }

  checkModalCurrentState(){
   this.modalStartingPoint =  this.modalService.getCurrentItemIndex();
  }

  ngAfterViewInit() {
    console.log("Claaed ngAfterViewInit");
    console.log(this.item);
    this.anim = this.amimationCtrl.create('swipe');
    
    this.anim.addElement(this.item.nativeElement)
    .duration(100)
    .easing('ease-out')
    .iterations(1)
    .fromTo('transform','translateX(300px)','translateX(0px)')
    .fromTo('opacity',0.1,1);
    this.anim.play();
    this.toggleNext(false);
  }

  // NEXT BUTTON ENABLE OR DISABLE
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
    .duration(100)
    .easing('ease-out')
    .iterations(1)
    .fromTo('transform',translateYfrom,translateYto)
    .fromTo('opacity',0.1,1);
    this.bottomUp.play();
  }


  // CHECKS THE IMAGE LENGTH AND ENABLE OR DISABLE THE NEXT BUTTON
  checkImagesLength(){
    if(this.carImages.length > 0){
      this.toggleNext(true);
      this.changeDetector.markForCheck();
    } else if(this.carImages.length == 0) {
      this.toggleNext(false);
    }
  }

  // CHECK THE LIMIT OF IMAGES EITHER IS IT LESS THAN 20 OR NOT.
  canTakeImages (){
    // IF IMAGES ARE LESS THAN 20 RETURN TRUE OTHERWISE FALSE.
    if(this.carImages.length < 20){
      return true;
    } else {
      return false;
    }
  }

  // DELETE THE IMAGE USING INDEX.
  popImages(index){
    // IF HAVE IMAGES IN ARRAY.
    if (this.carImages.length > 0) {
      this.carImages.splice(index, 1);
      if( this.savedPost != null )  {
        this.savedPost.postImages = this.carImages;
        localStorage.setItem('_post', JSON.stringify(this.savedPost));
      }
     // 2nd parameter means remove one item only.
      
      

    } else {
      // IF NO IMAGES IN ARRAY OR WE DELETED ALL OF THEM THEN HIDE NEXT BUTTON AS WELL.
      this.toggleNext(false);
      this.changeDetector.markForCheck();
      return;
    }
  }


  // TAKES IMAGE FORM CAMERA
  captureImage(){
    this.camGal.captureImage();
  }

  // PICK IMAGES FROM GALLERY
 async takeImageFromGallery() {
 // IF THE LIMIT IS LESS THAN 20 
   if(this.canTakeImages()){
  let images = await this.camGal.getLibraryImages();
  this.carImages =  this.carImages.concat(images);
    // DETECT CHANGE AND SHOW THE NEXT BUTTON
   this.changeDetector.markForCheck();
   this.toggleNext(true);
   if(this.platform.is('hybrid')){
    let postCreate:any = await this.createPost();
    this.camGal.uploadImages(this.carImages,'post-images',postCreate.result);
      } else {
        let file = await this.camGal.readAsFile(this.carImages);
          let postCreate:any = await this.createPost();
          if(postCreate.code === 200){
            this.savePostLocal(postCreate.result,file);
            this.generatePostId(postCreate,file);
         }
      }
    } else {
      console.log('limit reached');
      return;
    }
  

}

// UPLOADING IMAGES TO GENERATED POST.
/**
 * @author Muhammad Junaid Gul
 * @param post created post that received from server
 * @param file image as file object
 */
async generatePostId(post,file){
  this.modalService._post.hasPostCreated = true;
  this.modalService.modelData.postId = post.result;
  this.camGal.uploadMultipleImages(file,'post-images',post.result);
}


/**
 * @author Muhammad Junaid Gul
 * CREATE NEW POST IN DB AND RETURNS ITS ID
 * @returns CREATED POST
 */

async createPost(){
  return new Promise((res,rej)=>{
    this.post.createPost(this.userData.fetchUserId())
    .then((post:any)=>{
      res(post as any);
    })
    .catch(error=>{
      rej(error);
    })
  })
 
}

//SAVING POST TO LOCAL STORAGE 
/**
 * @author Muhammad Junaid Gul
 * @param post_id created post id
 * @param images images as file object
 */
  savePostLocal(post_id,images) {
  this.modalService._post.hasPostCreated = true;
  this.modalService._post.postImages = images;
  this.modalService._post.postId = post_id;
}

}